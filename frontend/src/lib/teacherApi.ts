// frontend/src/lib/teacherApi.ts
import { supabase } from "./supabaseClient";

/* ============================================================
   1) Obtener usuario por username (profesor)
============================================================ */
export async function getCurrentTeacher(username: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    console.error("❌ Error cargando profesor:", error);
    return null;
  }
  return data;
}

/* ============================================================
   2) Cursos asignados al profesor
============================================================ */
export async function getTeacherCourses(teacherId: string) {
  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .eq("docente_id", teacherId)
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("❌ Error obteniendo cursos del profesor:", error);
    return [];
  }

  return data;
}

/* ============================================================
   3) Actividades del curso
============================================================ */
export async function getCourseActivities(courseId: string) {
  const { data, error } = await supabase
    .from("actividades")
    .select("*")
    .eq("curso_id", courseId)
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("❌ Error cargando actividades:", error);
    return [];
  }

  return data;
}

/* ============================================================
   4) Dashboard
============================================================ */
export async function getTeacherStats(teacherId: string) {
  const courses = await getTeacherCourses(teacherId);

  return {
    activeCourses: courses.length,
    enrolledStudents: courses.length * 30,
    pendingActivities: 8,
    nextEvaluations: 3,
    generalAverage: "8.1",
  };
}

/* ============================================================
   5) Obtener parciales del curso
============================================================ */
export async function getCourseParciales(courseId: string) {
  const { data, error } = await supabase
    .from("parciales")
    .select("*")
    .eq("curso_id", courseId)
    .order("numero", { ascending: true });

  if (error) {
    console.error("❌ Error cargando parciales:", error);
    return [];
  }
  return data;
}

/* ============================================================
   6) Crear actividad
============================================================ */
export async function createActivity(payload: any) {
  const { data, error } = await supabase
    .from("actividades")
    .insert([payload])
    .select();

  if (error) {
    console.error("❌ ERROR al crear actividad:", error);
    return null;
  }

  return data?.[0];
}

/* ============================================================
   7) Eliminar actividad
============================================================ */
export async function deleteActivity(activityId: number) {
  console.log("🗑 Eliminando actividad con borrado manual en cascada…");

  try {
    // 1️⃣ Borrar configuración sonora
    await supabase
      .from("actividad_sonido_config")
      .delete()
      .eq("actividad_id", activityId);

    // 2️⃣ Obtener todas las preguntas relacionadas
    const { data: preguntas } = await supabase
      .from("preguntas")
      .select("id_pregunta")
      .eq("actividad_id", activityId);

    if (preguntas && preguntas.length > 0) {
      const preguntasIds = preguntas.map((p) => p.id_pregunta);

      // 3️⃣ Borrar opciones de respuesta
      await supabase
        .from("opciones_respuesta")
        .delete()
        .in("pregunta_id", preguntasIds);

      // 4️⃣ Borrar preguntas
      await supabase
        .from("preguntas")
        .delete()
        .eq("actividad_id", activityId);
    }

    // 5️⃣ Borrar intentos de actividad
    await supabase
      .from("intentos_actividad")
      .delete()
      .eq("actividad_id", activityId);

    // 6️⃣ Borrar resultados de estudiantes
    await supabase
      .from("resultados_estudiante")
      .delete()
      .eq("actividad_id", activityId);

    // 7️⃣ Borrar la actividad
    const { error: delError } = await supabase
      .from("actividades")
      .delete()
      .eq("id_actividad", activityId);

    if (delError) {
      console.error("❌ Error al eliminar actividad:", delError);
      return false;
    }

    console.log("✅ Actividad eliminada correctamente.");
    return true;

  } catch (err) {
    console.error("❌ Error general en eliminación:", err);
    return false;
  }
}


/* ============================================================
   8) Actualizar actividad
============================================================ */
export async function updateActivity(activityId: number, changes: any) {
  const { error } = await supabase
    .from("actividades")
    .update(changes)
    .eq("id_actividad", activityId);

  if (error) {
    console.error("❌ ERROR al actualizar actividad:", error);
    return false;
  }
  return true;
}

/* ============================================================
   9) Subir archivo TXT a STORAGE
============================================================ */
export async function uploadQuestionsFile(courseId: string, activityId: number, file: File) {
  const filePath = `${courseId}/quiz_${activityId}.txt`;

  const { error } = await supabase.storage
    .from("bancos_preguntas")
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error("❌ Error subiendo archivo TXT:", error);
    return null;
  }

  return filePath;
}

/* ============================================================
   10) Guardar URL pública en actividad
============================================================ */
export async function attachBankToActivity(activityId: number, filePath: string) {
  const publicUrl = supabase.storage
    .from("bancos_preguntas")
    .getPublicUrl(filePath).data.publicUrl;

  const { error } = await supabase
    .from("actividades")
    .update({ banco_preguntas_url: publicUrl })
    .eq("id_actividad", activityId);

  if (error) {
    console.error("❌ Error guardando URL:", error);
    return false;
  }

  return true;
}

/* ============================================================
   11) Leer archivo TXT localmente (FileReader)
============================================================ */
export async function readFileText(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(null);

    reader.readAsText(file);
  });
}

/* ============================================================
   12) Parsear preguntas del TXT
============================================================ */
export function parseQuestions(txt: string) {
  const lines = txt.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  const questions = [];
  let currentQuestion = null;
  let options = [];

  for (const line of lines) {
    // Detectar un ANSWER:
    if (/^ANSWER:/i.test(line)) {
      if (currentQuestion) {
        const correctLetter = line.replace("ANSWER:", "").trim().toUpperCase();

        // Marcar opción correcta
        options = options.map((opt) => ({
          ...opt,
          es_correcta: opt.letra === correctLetter,
        }));

        // Agregar la pregunta lista
        questions.push({
          enunciado: currentQuestion,
          opciones: options,
        });

        currentQuestion = null;
        options = [];
      }
    } 

    // Detectar opción A), B), C), D)
    else if (/^[A-D]\)/.test(line)) {
      const letra = line[0];
      const texto = line.substring(2).trim();

      options.push({
        letra,
        texto,
        es_correcta: false,
      });
    } 

    // Es un enunciado nuevo
    else {
      currentQuestion = line;
    }
  }

  return questions;
}


/* ============================================================
   13) Crear preguntas en BD
============================================================ */
type ParsedOption = {
  letra?: string;
  texto: string;
  es_correcta: boolean;
};

type ParsedQuestion = {
  enunciado: string;
  opciones: ParsedOption[];
};

export async function createQuestions(activityId: number, parsedQuestions: ParsedQuestion[]) {
  for (const q of parsedQuestions) {

    // Crear pregunta
    const { data: pregunta, error: errP } = await supabase
      .from("preguntas")
      .insert({
        actividad_id: activityId,
        enunciado: q.enunciado,
        tipo: "opcion_multiple",
        puntaje: 1,
      })
      .select()
      .single();

    if (errP) {
      console.error("❌ Error guardando pregunta:", errP);
      continue;
    }

    // Crear opciones
    const rows = q.opciones.map((op) => ({
      pregunta_id: pregunta.id_pregunta,
      texto: op.texto,
      es_correcta: op.es_correcta,
    }));

    const { error: errOpt } = await supabase
      .from("opciones_respuesta")
      .insert(rows);

    if (errOpt) {
      console.error("❌ Error guardando opciones:", errOpt);
    }
  }

  return true;
}


/* ============================================================
   14) Obtener preguntas
============================================================ */
export async function getQuestions(activityId: number) {
  const { data, error } = await supabase
    .from("preguntas")
    .select("id_pregunta, enunciado, tipo, puntaje")
    .eq("actividad_id", activityId)
    .order("id_pregunta");

  if (error) {
    console.error("❌ Error cargando preguntas:", error);
    return [];
  }

  return data;
}

/* ============================================================
   15) Crear configuración sonora para una actividad
============================================================ */
export async function createActivitySoundConfig(payload: any) {
  const { data, error } = await supabase
    .from("actividad_sonido_config")
    .insert([payload])
    .select()
    .maybeSingle();

  if (error) {
    console.error("❌ Error creando configuración sonora:", error);
    return null;
  }

  return data;
}

/* ============================================================
   16) Obtener configuración sonora de una actividad
============================================================ */
export async function getActivitySoundConfig(activityId: number) {
  const { data, error } = await supabase
    .from("actividad_sonido_config")
    .select("*")
    .eq("actividad_id", activityId)
    .maybeSingle();

  if (error) {
    console.error("❌ Error obteniendo config sonora:", error);
    return null;
  }

  return data;
}

/* ============================================================
   17) Actualizar configuración sonora
============================================================ */
export async function updateActivitySoundConfig(activityId: number, changes: any) {
  const { error } = await supabase
    .from("actividad_sonido_config")
    .update(changes)
    .eq("actividad_id", activityId);

  if (error) {
    console.error("❌ Error actualizando config sonora:", error);
    return false;
  }

  return true;
}

/* ============================================================
   18) Eliminar config sonora (si la actividad se elimina)
============================================================ */
export async function deleteActivitySoundConfig(activityId: number) {
  const { error } = await supabase
    .from("actividad_sonido_config")
    .delete()
    .eq("actividad_id", activityId);

  if (error) {
    console.error("❌ Error eliminando config sonora:", error);
    return false;
  }

  return true;
}
