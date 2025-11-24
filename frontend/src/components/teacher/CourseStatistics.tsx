import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CourseStatisticsProps {
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const attendanceData = [
  { name: "Semana 1", asistencia: 95 },
  { name: "Semana 2", asistencia: 88 },
  { name: "Semana 3", asistencia: 92 },
  { name: "Semana 4", asistencia: 85 },
  { name: "Semana 5", asistencia: 90 },
  { name: "Semana 6", asistencia: 87 },
];

const performanceData = [
  { actividad: "Quiz 1", promedio: 8.5 },
  { actividad: "Tarea 1", promedio: 7.8 },
  { actividad: "Quiz 2", promedio: 8.9 },
  { actividad: "Proyecto", promedio: 9.2 },
  { actividad: "Examen", promedio: 7.5 },
];

const parcialData = [
  { name: "Primer Parcial", promedio: 8.2 },
  { name: "Segundo Parcial", promedio: 8.5 },
];

const distributionData = [
  { name: "Excelente (9-10)", value: 35, color: "#006d6f" },
  { name: "Bueno (7-8.9)", value: 45, color: "#00bfbf" },
  { name: "Regular (5-6.9)", value: 15, color: "#f4d7dd" },
  { name: "Insuficiente (<5)", value: 5, color: "#ff6b6b" },
];

export function CourseStatistics({ teacherName, currentView, onNavigate, onLogout }: CourseStatisticsProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <TeacherNavbar 
        teacherName={teacherName} 
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>
            Estadísticas del Curso
          </h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            Analiza el rendimiento y progreso de tus estudiantes
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>
              Promedio General
            </p>
            <p className="text-[#006d6f] mb-1" style={{ fontWeight: 700 }}>
              8.35
            </p>
            <p className="text-[#00bfbf]" style={{ fontWeight: 500 }}>
              +0.5 vs anterior
            </p>
          </div>

          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>
              Asistencia Promedio
            </p>
            <p className="text-[#006d6f] mb-1" style={{ fontWeight: 700 }}>
              89.5%
            </p>
            <p className="text-[#00bfbf]" style={{ fontWeight: 500 }}>
              Muy buena
            </p>
          </div>

          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>
              Tasa de Aprobación
            </p>
            <p className="text-[#006d6f] mb-1" style={{ fontWeight: 700 }}>
              95%
            </p>
            <p className="text-[#00bfbf]" style={{ fontWeight: 500 }}>
              Excelente
            </p>
          </div>

          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>
              Estudiantes Activos
            </p>
            <p className="text-[#006d6f] mb-1" style={{ fontWeight: 700 }}>
              32/35
            </p>
            <p className="text-[#00bfbf]" style={{ fontWeight: 500 }}>
              91.4%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
              Asistencia Semanal
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
                <XAxis dataKey="name" stroke="#797979" />
                <YAxis stroke="#797979" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="asistencia" 
                  stroke="#006d6f" 
                  strokeWidth={3}
                  name="Asistencia %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Chart */}
          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
              Rendimiento por Actividad
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
                <XAxis dataKey="actividad" stroke="#797979" />
                <YAxis stroke="#797979" domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="promedio" fill="#00bfbf" name="Promedio" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Parcial Averages */}
          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
              Promedio por Parcial
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={parcialData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
                <XAxis type="number" domain={[0, 10]} stroke="#797979" />
                <YAxis dataKey="name" type="category" stroke="#797979" />
                <Tooltip />
                <Legend />
                <Bar dataKey="promedio" fill="#006d6f" name="Promedio" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Grade Distribution */}
          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
              Distribución de Calificaciones
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {distributionData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}