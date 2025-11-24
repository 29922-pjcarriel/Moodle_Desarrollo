import { AdminLayout } from "./AdminLayout";
import { Mail, Palette, Globe, Lock, Database, Plug } from "lucide-react";

interface SystemSettingsProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function SystemSettings({ adminName, currentView, onNavigate, onLogout }: SystemSettingsProps) {
  const settingsSections = [
    {
      icon: Mail,
      title: "Configuración de Correo",
      description: "Servidor SMTP y plantillas de email",
      color: "#006d6f"
    },
    {
      icon: Palette,
      title: "Apariencia",
      description: "Colores, logos y personalización",
      color: "#00bfbf"
    },
    {
      icon: Globe,
      title: "Idioma y Zona Horaria",
      description: "Configuración regional",
      color: "#006d6f"
    },
    {
      icon: Lock,
      title: "Política de Contraseñas",
      description: "Seguridad y requisitos",
      color: "#ff6b6b"
    },
    {
      icon: Database,
      title: "Backup y Restauración",
      description: "Respaldos automáticos",
      color: "#00bfbf"
    },
    {
      icon: Plug,
      title: "Plugins y APIs",
      description: "Integraciones externas",
      color: "#006d6f"
    }
  ];

  return (
    <AdminLayout 
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8">
        <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>Ajustes Generales del Sistema</h2>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>Configura los parámetros globales de la plataforma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#797979] p-6 hover:shadow-lg transition-shadow cursor-pointer"
              style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
              onClick={() => alert(`Abriendo: ${section.title}`)}
            >
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${section.color}20` }}>
                  <Icon className="w-8 h-8" style={{ color: section.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#333333] mb-2" style={{ fontWeight: 600 }}>
                    {section.title}
                  </h3>
                  <p className="text-[#797979]" style={{ fontWeight: 500 }}>
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Example Settings Form */}
      <div className="mt-8 bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>Configuración General</h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>Nombre de la Plataforma</label>
            <input
              type="text"
              defaultValue="NeuroStudy"
              className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
            />
          </div>

          <div>
            <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>Correo de Contacto</label>
            <input
              type="email"
              defaultValue="contacto@neurostudy.edu"
              className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>Zona Horaria</label>
              <select className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]">
                <option>GMT-5 (Ecuador)</option>
                <option>GMT-3 (Argentina)</option>
                <option>GMT-6 (México)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>Idioma</label>
              <select className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]">
                <option>Español</option>
                <option>English</option>
                <option>Português</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button
              onClick={() => alert("Configuración guardada")}
              className="rounded-xl bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
              style={{ fontWeight: 600, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
            >
              Guardar Cambios
            </button>
            <button
              className="rounded-xl bg-white text-[#333333] px-6 py-3 hover:bg-[#ececec] transition-colors border border-[#797979]"
              style={{ fontWeight: 600 }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}