import { AdminLayout } from "./AdminLayout";
import { Download, FileText } from "lucide-react";

interface GlobalReportsProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function GlobalReports({ adminName, currentView, onNavigate, onLogout }: GlobalReportsProps) {
  const reportTypes = [
    { id: "grades", name: "Calificaciones Globales", description: "Reporte completo de calificaciones por curso" },
    { id: "activity", name: "Actividad de Usuarios", description: "Estadísticas de accesos y participación" },
    { id: "participation", name: "Participación", description: "Análisis de participación en actividades" },
    { id: "performance", name: "Rendimiento por Curso", description: "Métricas de rendimiento académico" },
  ];

  return (
    <AdminLayout 
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8">
        <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>Reportes Globales</h2>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>Genera reportes y exporta datos del sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#797979] p-6 mb-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>Tipos de Reportes</h3>
            
            <div className="space-y-4">
              {reportTypes.map(report => (
                <div key={report.id} className="p-5 border-2 border-[#ececec] rounded-xl hover:border-[#006d6f] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-[#333333] mb-1" style={{ fontWeight: 600 }}>{report.name}</h4>
                      <p className="text-[#797979]" style={{ fontWeight: 500 }}>{report.description}</p>
                    </div>
                    <button
                      onClick={() => alert(`Generando reporte: ${report.name}`)}
                      className="rounded-xl bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors ml-4"
                      style={{ fontWeight: 500 }}
                    >
                      Generar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>Acciones Rápidas</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => alert("Exportando a Excel...")}
                className="w-full flex items-center gap-3 rounded-xl border border-[#797979] bg-[#00bfbf] text-white px-5 py-3 hover:bg-[#00a5a5] transition-colors"
                style={{ fontWeight: 500 }}
              >
                <Download className="w-5 h-5" />
                Exportar Excel
              </button>
              <button
                onClick={() => alert("Descargando CSV...")}
                className="w-full flex items-center gap-3 rounded-xl border border-[#797979] bg-white text-[#006d6f] px-5 py-3 hover:bg-[#ececec] transition-colors"
                style={{ fontWeight: 500 }}
              >
                <FileText className="w-5 h-5" />
                Descargar CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
