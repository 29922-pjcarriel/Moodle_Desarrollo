// frontend/src/lib/adminApi.ts
import { supabase } from "./supabaseClient";

/* ============================================================
   1) Cursos disponibles para la matrícula
============================================================ */
export async function getAdminCourses() {
  const { data, error } = await supabase
    .from("cursos")
    .select("id_curso, titulo")
    .order("titulo", { ascending: true });

  if (error) {
    console.error("❌ Error cargando cursos:", error);
    return [];
  }
  return data;
}

/* ============================================================
   2) Estudiantes activos del sistema (rol Estudiante = 3)
============================================================ */
export async function getActiveStudents() {
  const { data, error } = await supabase
    .from("usuarios")
    .select("id, first_name, last_name, email, estado, rol_id")
    .eq("rol_id", 3)
    .eq("estado", "active")
    .order("first_name", { ascending: true });

  if (error) {
    console.error("❌ Error cargando estudiantes:", error);
    return [];
  }
  return data;
}

/* ============================================================
   3) Matrículas de un curso  -> tabla correcta: matriculas
============================================================ */
export async function getCourseEnrollments(courseId: string) {
  const { data, error } = await supabase
    .from("matriculas")
    .select("usuario_id")
    .eq("curso_id", courseId);

  if (error) {
    console.error("❌ Error cargando matrículas:", error);
    return [];
  }

  return data; // devuelve [{usuario_id: ...}]
}

/* ============================================================
   4) Guardar matrículas usando TABLA REAL: matriculas
============================================================ */
export async function setCourseEnrollments(
  courseId: string,
  studentIds: string[]
) {
  // 1) Borrar matrículas previas del curso
  const { error: delError } = await supabase
    .from("matriculas")
    .delete()
    .eq("curso_id", courseId);

  if (delError) {
    console.error("❌ Error eliminando matrículas previas:", delError);
    return false;
  }

  // 2) Si no hay estudiantes seleccionados → terminar
  if (studentIds.length === 0) return true;

  // 3) Insertar nuevas matrículas
  const rows = studentIds.map((id) => ({
    usuario_id: id,
    curso_id: courseId,
  }));

  const { error: insError } = await supabase
    .from("matriculas")
    .insert(rows);

  if (insError) {
    console.error("❌ Error insertando nuevas matrículas:", insError);
    return false;
  }

  return true;
}


/* ============================================================
   DELETE COURSE — Eliminación manual en cascada
============================================================ */
export async function deleteCourseCascade(courseId: string) {
  try {
    // 1) Eliminar matrículas
    await supabase
      .from("matriculas")
      .delete()
      .eq("curso_id", courseId);

    // 2) Obtener actividades del curso
    const { data: acts } = await supabase
      .from("actividades")
      .select("id_actividad")
      .eq("curso_id", courseId);

    if (acts && acts.length > 0) {
      for (const act of acts) {
        const id = act.id_actividad;

        // 2.1) Obtener preguntas de esta actividad
        const { data: preguntas, error: errPreg } = await supabase
          .from("preguntas")
          .select("id_pregunta")
          .eq("actividad_id", id);

        if (errPreg) {
          console.error("❌ Error obteniendo preguntas:", errPreg);
        }

        // 2.2) Si hay preguntas → eliminar opciones
        if (preguntas && preguntas.length > 0) {
          const preguntaIds = preguntas.map((p) => p.id_pregunta);

          const { error: errOpt } = await supabase
            .from("opciones_respuesta")
            .delete()
            .in("pregunta_id", preguntaIds);

          if (errOpt) {
            console.error("❌ Error eliminando opciones:", errOpt);
          }
        }

        // 2.3) Eliminar preguntas
        await supabase
          .from("preguntas")
          .delete()
          .eq("actividad_id", id);


        // 2.4) Eliminar resultados
        await supabase
          .from("resultados_estudiante")
          .delete()
          .eq("actividad_id", id);

        // 2.5) Eliminar configuraciones de sonido
        await supabase
          .from("actividad_sonido_config")
          .delete()
          .eq("actividad_id", id);

        // 2.6) Eliminar actividad como tal
        await supabase
          .from("actividades")
          .delete()
          .eq("id_actividad", id);
      }
    }

    // 3) Eliminar parciales
    await supabase
      .from("parciales")
      .delete()
      .eq("curso_id", courseId);

    // 4) Eliminar el curso
    const { error } = await supabase
      .from("cursos")
      .delete()
      .eq("id_curso", courseId);

    if (error) {
      console.error("Error eliminando curso:", error);
      return false;
    }

    return true;

  } catch (err) {
    console.error("❌ ERROR en deleteCourseCascade:", err);
    return false;
  }
}
