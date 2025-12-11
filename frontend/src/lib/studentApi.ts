import { supabase } from "./supabaseClient";

/* ============================================================
   0) Obtener estudiante REAL desde tabla "usuarios"
============================================================ */
export async function getStudentByUsername(username: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    console.error("❌ Error obteniendo estudiante:", error);
    return null;
  }

  return data;
}

/* ============================================================
   1) Obtener cursos del estudiante (JOIN matriculas → cursos)
============================================================ */
export async function getStudentCourses(studentId: string) {
  const { data, error } = await supabase
    .from("matriculas")
    .select(`
      curso_id,
      cursos:cursos!matriculas_curso_id_fkey (
        id_curso,
        titulo,
        codigo,
        descripcion,
        imagen_url
      )
    `)
    .eq("usuario_id", studentId);

  if (error) {
    console.error("❌ Error cargando cursos del estudiante:", error);
    return [];
  }

  return data.map((m) => m.cursos);
}

/* ============================================================
   2) Obtener actividades del curso
============================================================ */
export async function getCourseActivities(courseId: string) {
  const { data, error } = await supabase
    .from("actividades")
    .select(`
      id_actividad,
      titulo,
      descripcion,
      tipo,
      sonido_habilitado,
      duracion_minutos,
      fecha_apertura,
      fecha_cierre,
      creado_en
    `)
    .eq("curso_id", courseId)
    .order("creado_en", { ascending: true });

  if (error) {
    console.error("❌ Error cargando actividades:", error);
    return [];
  }

  return data;
}

/* ============================================================
   3) Obtener configuración sonora REAL
============================================================ */
export async function getActivitySoundConfig(activityId: number) {
  const { data, error } = await supabase
    .from("actividad_sonido_config")
    .select("*")
    .eq("actividad_id", activityId)
    .maybeSingle();

  if (error) {
    console.error("❌ Error obteniendo configuración sonora:", error);
    return null;
  }

  return data;
}

/* ============================================================
   4) Obtener preguntas + opciones (JOIN)
============================================================ */
export async function getActivityQuestions(activityId: number) {
  const { data, error } = await supabase
    .from("preguntas")
    .select(`
      id_pregunta,
      enunciado,
      tipo,
      puntaje,
      opciones_respuesta (
        id_opcion,
        texto,
        es_correcta
      )
    `)
    .eq("actividad_id", activityId)
    .order("id_pregunta");

  if (error) {
    console.error("❌ Error obteniendo preguntas:", error);
    return [];
  }

  return data;
}

/* ============================================================
   5) Obtener un paisaje sonoro específico
============================================================ */
export async function getSoundById(soundId: number) {
  const { data, error } = await supabase
    .from("paisajes_sonoros")
    .select("*")
    .eq("id_sonido", soundId)
    .maybeSingle();

  if (error) {
    console.error("❌ Error cargando sonido:", error);
    return null;
  }

  return data;
}

/* ============================================================
   6) Crear intento de examen
============================================================ */
export async function createExamAttempt(activityId: number, userId: string) {
  const { data, error } = await supabase
    .from("intentos_actividad")
    .insert({
      actividad_id: activityId,
      usuario_id: userId,
      estado: "en_progreso",
    })
    .select()
    .single();

  if (error) {
    console.error("❌ Error creando intento:", error);
    return null;
  }

  return data; // contiene id_intento
}

/* ============================================================
   7) Enviar intento, calificar y guardar respuestas en BD
============================================================ */
export async function submitExamAttempt(
  attemptId: number,
  activityId: number,
  userId: string,
  answers: { [preguntaId: string]: number }
) {
  // 1. Obtener info de la actividad + curso
  const { data: actividad, error: err1 } = await supabase
    .from("actividades")
    .select(`
      id_actividad,
      titulo,
      curso_id,
      cursos (
        id_curso,
        titulo
      )
    `)
    .eq("id_actividad", activityId)
    .single();

  if (err1 || !actividad) {
    console.error("❌ Error obteniendo actividad", err1);
    return null;
  }

  const cursoId = actividad.curso_id;
  const cursoTitulo = actividad.cursos?.titulo ?? "Curso desconocido";
  const actividadTitulo = actividad.titulo;

  // 2. Obtener opciones correctas
  const { data: opciones } = await supabase
    .from("opciones_respuesta")
    .select("pregunta_id, id_opcion, es_correcta");

  let score = 0;
  const respuestasInsertar = [];

  for (const preguntaId of Object.keys(answers)) {
    const opcionSeleccionada = answers[preguntaId];

    const correcta = opciones.find(
      (o) => o.pregunta_id === Number(preguntaId) && o.es_correcta
    );

    const esCorrecta =
      correcta && correcta.id_opcion === opcionSeleccionada;

    if (esCorrecta) score++;

    respuestasInsertar.push({
      intento_id: attemptId,
      pregunta_id: Number(preguntaId),
      opcion_id: opcionSeleccionada,
    });
  }

  await supabase.from("respuestas_intento").insert(respuestasInsertar);

  const totalPreguntas = Object.keys(answers).length;
  const porcentaje = Math.round((score / totalPreguntas) * 100);

  await supabase
    .from("intentos_actividad")
    .update({
      fecha_envio: new Date(),
      calificacion_total: score,
      estado: "finalizado",
    })
    .eq("id_intento", attemptId);

  // 🔥 3. Insertar correctamente en resultados_estudiante
  await supabase.from("resultados_estudiante").insert({
    usuario_id: userId,
    curso_id: cursoId,
    actividad_id: activityId,
    intento_id: attemptId,

    curso_titulo: cursoTitulo,
    actividad_titulo: actividadTitulo,

    calificacion: score,
    estado: "finalizado",
    fecha: new Date().toISOString(),
  });

  return {
    score,
    total: totalPreguntas,
    porcentaje,
  };
}


/* ============================================================
   8) Obtener resultados del estudiante
============================================================ */
export async function getStudentResults_new(studentId: string) {
  const { data, error } = await supabase
    .from("resultados_estudiante")
    .select("*")
    .eq("usuario_id", studentId)
    .order("fecha", { ascending: false });

  if (error) {
    console.error("❌ Error cargando resultados:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id_resultado,
    course: row.curso_titulo,
    activity: row.actividad_titulo,
    grade: row.calificacion,
    status: row.estado,
    date: row.fecha
      ? new Date(row.fecha).toLocaleDateString("es-ES")
      : "-",
  }));
}






