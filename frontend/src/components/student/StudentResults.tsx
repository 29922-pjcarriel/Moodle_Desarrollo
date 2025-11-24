import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface Result {
  id: number;
  course: string;
  activity: string;
  grade: number | null;
  status: "Aprobado" | "Pendiente" | "No presentado";
  date: string;
}

const results: Result[] = [
  {
    id: 1,
    course: "Sistemas Operativos",
    activity: "Primer Parcial",
    grade: 85,
    status: "Aprobado",
    date: "15/11/2025"
  },
  {
    id: 2,
    course: "Sistemas Operativos",
    activity: "Segundo Parcial",
    grade: null,
    status: "Pendiente",
    date: "-"
  },
  {
    id: 3,
    course: "Estadística Aplicada",
    activity: "Primer Parcial",
    grade: 92,
    status: "Aprobado",
    date: "10/11/2025"
  },
  {
    id: 4,
    course: "Estadística Aplicada",
    activity: "Taller Práctico",
    grade: 78,
    status: "Aprobado",
    date: "18/11/2025"
  },
  {
    id: 5,
    course: "Redes y Comunicaciones",
    activity: "Primer Parcial",
    grade: null,
    status: "No presentado",
    date: "12/11/2025"
  },
  {
    id: 6,
    course: "Redes y Comunicaciones",
    activity: "Segundo Parcial",
    grade: null,
    status: "Pendiente",
    date: "-"
  },
  {
    id: 7,
    course: "Bases de Datos",
    activity: "Primer Parcial",
    grade: 88,
    status: "Aprobado",
    date: "08/11/2025"
  },
  {
    id: 8,
    course: "Bases de Datos",
    activity: "Proyecto Final",
    grade: null,
    status: "Pendiente",
    date: "-"
  }
];

export function StudentResults() {
  const getStatusIcon = (status: Result["status"]) => {
    switch (status) {
      case "Aprobado":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "Pendiente":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "No presentado":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: Result["status"]) => {
    switch (status) {
      case "Aprobado":
        return "text-green-600";
      case "Pendiente":
        return "text-yellow-600";
      case "No presentado":
        return "text-red-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-[#006d6f] mb-2" style={{ fontWeight: 700 }}>
          Mis Resultados
        </h2>
        <p className="text-[#666666]">
          Aquí puedes revisar todas tus calificaciones.
        </p>
      </div>

      <div 
        className="rounded-2xl border border-[#cccccc] bg-white overflow-hidden"
        style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.08)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#00595a] text-white">
                <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                  Curso
                </th>
                <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                  Actividad Evaluada
                </th>
                <th className="px-6 py-4 text-center" style={{ fontWeight: 600 }}>
                  Calificación
                </th>
                <th className="px-6 py-4 text-center" style={{ fontWeight: 600 }}>
                  Estado
                </th>
                <th className="px-6 py-4 text-center" style={{ fontWeight: 600 }}>
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr 
                  key={result.id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'
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
                            ? 'bg-green-100 text-green-700' 
                            : result.grade >= 70 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                        style={{ fontWeight: 600 }}
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
                      <span className={getStatusColor(result.status)} style={{ fontWeight: 500 }}>
                        {result.status}
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

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div 
          className="rounded-xl border border-[#cccccc] bg-white p-6"
          style={{ boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.08)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="text-[#006d6f]" style={{ fontWeight: 600 }}>
              Aprobados
            </h3>
          </div>
          <p className="text-3xl text-[#006d6f]" style={{ fontWeight: 700 }}>
            {results.filter(r => r.status === "Aprobado").length}
          </p>
        </div>

        <div 
          className="rounded-xl border border-[#cccccc] bg-white p-6"
          style={{ boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.08)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-yellow-600" />
            <h3 className="text-[#006d6f]" style={{ fontWeight: 600 }}>
              Pendientes
            </h3>
          </div>
          <p className="text-3xl text-[#006d6f]" style={{ fontWeight: 700 }}>
            {results.filter(r => r.status === "Pendiente").length}
          </p>
        </div>

        <div 
          className="rounded-xl border border-[#cccccc] bg-white p-6"
          style={{ boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.08)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-[#006d6f]" style={{ fontWeight: 600 }}>
              No Presentados
            </h3>
          </div>
          <p className="text-3xl text-[#006d6f]" style={{ fontWeight: 700 }}>
            {results.filter(r => r.status === "No presentado").length}
          </p>
        </div>
      </div>
    </div>
  );
}
