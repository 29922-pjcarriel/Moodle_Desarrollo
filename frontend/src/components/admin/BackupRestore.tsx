import { AdminLayout } from "./AdminLayout";
import { Database, Download, Upload, Trash2, Clock, HardDrive } from "lucide-react";

interface BackupRestoreProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Backup {
  id: number;
  filename: string;
  date: string;
  size: string;
  status: "completed" | "inprogress" | "failed";
}

const backups: Backup[] = [
  { id: 1, filename: "backup_neurostudy_22112025.sql", date: "22/11/2025 03:00", size: "2.4 GB", status: "completed" },
  { id: 2, filename: "backup_neurostudy_21112025.sql", date: "21/11/2025 03:00", size: "2.3 GB", status: "completed" },
  { id: 3, filename: "backup_neurostudy_20112025.sql", date: "20/11/2025 03:00", size: "2.2 GB", status: "completed" },
  { id: 4, filename: "backup_neurostudy_19112025.sql", date: "19/11/2025 03:00", size: "2.1 GB", status: "completed" },
];

export function BackupRestore({ adminName, currentView, onNavigate, onLogout }: BackupRestoreProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      completed: { bg: "#d4edda", text: "#155724", label: "Completado" },
      inprogress: { bg: "#d1ecf1", text: "#004085", label: "En Progreso" },
      failed: { bg: "#f8d7da", text: "#721c24", label: "Fallido" }
    };
    const style = styles[status as keyof typeof styles];
    return (
      <span className="px-3 py-1 rounded-full" style={{ backgroundColor: style.bg, color: style.text, fontWeight: 500 }}>
        {style.label}
      </span>
    );
  };

  return (
    <AdminLayout 
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8">
        <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>Backup y Restauración</h2>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>Gestiona los respaldos del sistema</p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className="bg-white rounded-2xl border border-[#797979] p-6 cursor-pointer hover:shadow-lg transition-shadow"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          onClick={() => alert("Creando respaldo del sistema...")}
        >
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#006d6f20" }}>
              <Database className="w-8 h-8 text-[#006d6f]" />
            </div>
            <div>
              <h3 className="text-[#333333] mb-2" style={{ fontWeight: 600 }}>Crear Backup</h3>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>Generar respaldo manual</p>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl border border-[#797979] p-6 cursor-pointer hover:shadow-lg transition-shadow"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          onClick={() => alert("Función de restauración")}
        >
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#00bfbf20" }}>
              <Upload className="w-8 h-8 text-[#00bfbf]" />
            </div>
            <div>
              <h3 className="text-[#333333] mb-2" style={{ fontWeight: 600 }}>Restaurar</h3>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>Restaurar desde backup</p>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl border border-[#797979] p-6 cursor-pointer hover:shadow-lg transition-shadow"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#006d6f20" }}>
              <Clock className="w-8 h-8 text-[#006d6f]" />
            </div>
            <div>
              <h3 className="text-[#333333] mb-2" style={{ fontWeight: 600 }}>Programar</h3>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>Backups automáticos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Backups List */}
      <div className="bg-white rounded-2xl border border-[#797979] overflow-hidden" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
        <div className="bg-[#006d6f] text-white px-6 py-4">
          <h3 style={{ fontWeight: 600 }}>Respaldos Disponibles</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#ececec]">
              <tr>
                <th className="px-6 py-4 text-left text-[#333333]" style={{ fontWeight: 600 }}>Archivo</th>
                <th className="px-6 py-4 text-left text-[#333333]" style={{ fontWeight: 600 }}>Fecha y Hora</th>
                <th className="px-6 py-4 text-left text-[#333333]" style={{ fontWeight: 600 }}>Tamaño</th>
                <th className="px-6 py-4 text-left text-[#333333]" style={{ fontWeight: 600 }}>Estado</th>
                <th className="px-6 py-4 text-left text-[#333333]" style={{ fontWeight: 600 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((backup, index) => (
                <tr key={backup.id} className={index % 2 === 0 ? "bg-white" : "bg-[#ececec]"}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <HardDrive className="w-5 h-5 text-[#006d6f]" />
                      <span className="text-[#333333]" style={{ fontWeight: 500 }}>{backup.filename}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#797979]" style={{ fontWeight: 500 }}>{backup.date}</td>
                  <td className="px-6 py-4 text-[#797979]" style={{ fontWeight: 500 }}>{backup.size}</td>
                  <td className="px-6 py-4">{getStatusBadge(backup.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert(`Descargando: ${backup.filename}`)}
                        className="text-[#006d6f] hover:text-[#00bfbf] p-2 rounded-lg hover:bg-[#ececec] transition-colors"
                        title="Descargar"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirm(`¿Restaurar desde ${backup.filename}?`)}
                        className="text-[#00bfbf] hover:text-[#006d6f] p-2 rounded-lg hover:bg-[#ececec] transition-colors"
                        title="Restaurar"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirm(`¿Eliminar ${backup.filename}?`)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-8 bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>Información del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-[#797979] mb-1" style={{ fontWeight: 500 }}>Espacio Utilizado</p>
            <p className="text-[#333333]" style={{ fontWeight: 700 }}>32.5 GB / 100 GB</p>
          </div>
          <div>
            <p className="text-[#797979] mb-1" style={{ fontWeight: 500 }}>Último Backup</p>
            <p className="text-[#333333]" style={{ fontWeight: 700 }}>22/11/2025 03:00</p>
          </div>
          <div>
            <p className="text-[#797979] mb-1" style={{ fontWeight: 500 }}>Próximo Programado</p>
            <p className="text-[#333333]" style={{ fontWeight: 700 }}>23/11/2025 03:00</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}