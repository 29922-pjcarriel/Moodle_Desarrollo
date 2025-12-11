import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getStudentResults_new } from "../../lib/studentApi";

interface Result {
  id: number;
  course: string;
  activity: string;
  grade: number | null;
  status: "finalizado" | "en_progreso" | "no_presentado";
  date: string;
}

export function StudentResults({ studentId }: { studentId: string }) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getStudentResults_new(studentId);
      setResults(data);
      setLoading(false);
    }
    load();
  }, [studentId]);

  /* ============================================================
     ICONOS SEGÚN ESTADO REAL
  ============================================================ */
  const getStatusIcon = (status: Result["status"]) => {
    switch (status) {
      case "finalizado":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "en_progreso":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "no_presentado":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Result["status"]) => {
    switch (status) {
      case "finalizado":
        return "Finalizado";
      case "en_progreso":
        return "En progreso";
      case "no_presentado":
        return "No presentado";
    }
  };

  const getStatusColor = (status: Result["status"]) => {
    switch (status) {
      case "finalizado":
        return "text-green-600";
      case "en_progreso":
        return "text-yellow-600";
      case "no_presentado":
        return "text-red-600";
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[#006d6f] mb-2 font-bold">
          Mis Resultados
        </h2>
        <p className="text-[#666666]">
          Aquí puedes revisar todas tus calificaciones.
        </p>
      </div>

      {/* Tabla */}
      <div 
        className="rounded-2xl border border-[#cccccc] bg-white overflow-hidden"
        style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#00595a] text-white">
                <th className="px-6 py-4 text-left">Curso</th>
                <th className="px-6 py-4 text-left">Actividad Evaluada</th>
                <th className="px-6 py-4 text-center">Calificación</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-center">Fecha</th>
              </tr>
            </thead>

            <tbody>
              {/* Mientras carga */}
              {loading && (
                <tr>
                  <td className="px-6 py-6 text-center text-[#777]" colSpan={5}>
                    Cargando resultados...
                  </td>
                </tr>
              )}

              {/* Si no hay registros */}
              {!loading && results.length === 0 && (
                <tr>
                  <td className="px-6 py-6 text-center text-[#777]" colSpan={5}>
                    No hay calificaciones registradas.
                  </td>
                </tr>
              )}

              {/* Resultados */}
              {results.map((result, index) => (
                <tr
                  key={result.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]"
                  } hover:bg-[#e8f5f5] transition-colors border-b border-[#e0e0e0]`}
                >
                  <td className="px-6 py-4 text-[#333333]">
                    {result.course}
                  </td>

                  <td className="px-6 py-4 text-[#333333]">
                    {result.activity}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {result.grade !== null ? (
                      <span
                        className={`inline-flex items-center justify-center min-w-12 px-3 py-1 rounded-full ${
                          result.grade >= 90
                            ? "bg-green-100 text-green-700"
                            : result.grade >= 70
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {result.grade}
                      </span>
                    ) : (
                      <span className="text-[#999999]">-</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {getStatusIcon(result.status)}
                      <span
                        className={getStatusColor(result.status)}
                        style={{ fontWeight: 500 }}
                      >
                        {getStatusText(result.status)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center text-[#666666]">
                    {result.date}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* TARJETAS DE RESUMEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="text-[#006d6f] font-semibold">Finalizados</h3>
          </div>
          <p className="text-3xl text-[#006d6f] font-bold">
            {results.filter((r) => r.status === "finalizado").length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-yellow-600" />
            <h3 className="text-[#006d6f] font-semibold">En progreso</h3>
          </div>
          <p className="text-3xl text-[#006d6f] font-bold">
            {results.filter((r) => r.status === "en_progreso").length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-[#006d6f] font-semibold">No presentado</h3>
          </div>
          <p className="text-3xl text-[#006d6f] font-bold">
            {results.filter((r) => r.status === "no_presentado").length}
          </p>
        </div>

      </div>
    </div>
  );
}
