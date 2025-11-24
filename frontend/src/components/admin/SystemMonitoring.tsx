import { AdminLayout } from "./AdminLayout";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity, Users, AlertTriangle, Server, Clock, TrendingUp } from "lucide-react";

interface SystemMonitoringProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const activityData = [
  { date: "01/11", accesos: 450, acciones: 320 },
  { date: "05/11", accesos: 520, acciones: 390 },
  { date: "10/11", accesos: 610, acciones: 450 },
  { date: "15/11", accesos: 580, acciones: 410 },
  { date: "20/11", accesos: 720, acciones: 520 },
  { date: "25/11", accesos: 680, acciones: 490 },
];

const serverData = [
  { hora: "00:00", cpu: 45, memoria: 62, red: 30 },
  { hora: "04:00", cpu: 32, memoria: 58, red: 25 },
  { hora: "08:00", cpu: 68, memoria: 75, red: 55 },
  { hora: "12:00", cpu: 85, memoria: 82, red: 70 },
  { hora: "16:00", cpu: 78, memoria: 79, red: 65 },
  { hora: "20:00", cpu: 55, memoria: 68, red: 45 },
];

const recentActivity = [
  { user: "Ana García", action: "Inscripción al curso Sistemas Operativos", time: "Hace 5 min", type: "success" },
  { user: "Sistema", action: "Error al cargar recursos multimedia", time: "Hace 12 min", type: "error" },
  { user: "Carlos Mendoza", action: "Creación de nuevo examen", time: "Hace 25 min", type: "info" },
  { user: "María Rodríguez", action: "Cambio de rol a Profesor", time: "Hace 1 hora", type: "warning" },
  { user: "Sistema", action: "Backup automático completado", time: "Hace 2 horas", type: "success" },
];

export function SystemMonitoring({ adminName, currentView, onNavigate, onLogout }: SystemMonitoringProps) {
  const getActivityIcon = (type: string) => {
    const styles = {
      success: { color: "#155724", bg: "#d4edda" },
      error: { color: "#721c24", bg: "#f8d7da" },
      warning: { color: "#856404", bg: "#fff3cd" },
      info: { color: "#004085", bg: "#d1ecf1" }
    };
    const style = styles[type as keyof typeof styles];
    return <div className="w-3 h-3 rounded-full" style={{ backgroundColor: style.color }} />;
  };

  return (
    <AdminLayout 
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8">
        <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>Monitoreo del Sistema</h2>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>Estado en tiempo real y estadísticas del servidor</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#006d6f20" }}>
              <Users className="w-8 h-8 text-[#006d6f]" />
            </div>
            <div>
              <p className="text-[#797979] mb-1" style={{ fontWeight: 500 }}>Usuarios Activos</p>
              <p className="text-[#333333]" style={{ fontWeight: 700 }}>247</p>
              <p className="text-[#00bfbf]" style={{ fontWeight: 500 }}>En línea ahora</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#00bfbf20" }}>
              <Activity className="w-8 h-8 text-[#00bfbf]" />
            </div>
            <div>
              <p className="text-[#797979] mb-1" style={{ fontWeight: 500 }}>Actividad Hoy</p>
              <p className="text-[#333333]" style={{ fontWeight: 700 }}>1,247</p>
              <p className="text-[#00bfbf]" style={{ fontWeight: 500 }}>Acciones totales</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#ff6b6b20" }}>
              <AlertTriangle className="w-8 h-8 text-[#ff6b6b]" />
            </div>
            <div>
              <p className="text-[#797979] mb-1" style={{ fontWeight: 500 }}>Errores</p>
              <p className="text-[#333333]" style={{ fontWeight: 700 }}>3</p>
              <p className="text-[#ff6b6b]" style={{ fontWeight: 500 }}>Últimas 24h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#006d6f20" }}>
              <Server className="w-8 h-8 text-[#006d6f]" />
            </div>
            <div>
              <p className="text-[#797979] mb-1" style={{ fontWeight: 500 }}>Uso del Servidor</p>
              <p className="text-[#333333]" style={{ fontWeight: 700 }}>72%</p>
              <p className="text-[#00bfbf]" style={{ fontWeight: 500 }}>Normal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Activity Chart */}
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>Actividad del Último Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
              <XAxis dataKey="date" stroke="#797979" />
              <YAxis stroke="#797979" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="accesos" stroke="#006d6f" fill="#006d6f40" name="Accesos" />
              <Area type="monotone" dataKey="acciones" stroke="#00bfbf" fill="#00bfbf40" name="Acciones" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Server Usage */}
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>Uso del Servidor (Últimas 24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={serverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
              <XAxis dataKey="hora" stroke="#797979" />
              <YAxis stroke="#797979" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="#006d6f" strokeWidth={2} name="CPU %" />
              <Line type="monotone" dataKey="memoria" stroke="#00bfbf" strokeWidth={2} name="Memoria %" />
              <Line type="monotone" dataKey="red" stroke="#f4d7dd" strokeWidth={2} name="Red %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>Registro de Actividad Reciente</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-[#ececec] last:border-0">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-[#333333]" style={{ fontWeight: 600 }}>
                  {activity.user}
                </p>
                <p className="text-[#797979]" style={{ fontWeight: 500 }}>
                  {activity.action}
                </p>
                <p className="text-[#00bfbf] mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}