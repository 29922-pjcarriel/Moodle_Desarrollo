import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Music,
  Users,
  Activity,
  TrendingUp,
  Volume2,
} from "lucide-react";

import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { supabase } from "../../lib/supabaseClient";


interface Soundscape {
  id_sonido: number;
  nombre: string;
  categoria: string | null;
  descripcion: string | null;
  imagen_url: string | null;
  archivo_audio: string | null;
  habilitado: boolean;
  habilitado_docentes: boolean;
  habilitado_estudiantes: boolean;
  permite_personalizacion_volumen: boolean;
  permite_personalizacion_intensidad: boolean;
  modo_anti_ansiedad: boolean;
}

export function SoundscapeManagement() {
  const [soundscapes, setSoundscapes] = useState<Soundscape[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal manual (sin Dialog)
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    imagen_url: "",
    archivo_audio: "",
    habilitado: true,
    habilitado_docentes: true,
    habilitado_estudiantes: true,
    permite_personalizacion_volumen: true,
    permite_personalizacion_intensidad: true,
    modo_anti_ansiedad: true,
  });

  // Ajustes globales (solo UI por ahora)
  const [globalSettings, setGlobalSettings] = useState({
    maxVolume: 80,
    maxIntensity: 75,
    maxPlaybackTime: 180,
    allowCustomSoundscapes: true,
    autoFrequencyFiltering: true,
    defaultAntiAnxietyMode: true,
  });

  // ======================================================
  // Cargar paisajes sonoros desde Supabase
  // ======================================================
  const loadSoundscapes = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("paisajes_sonoros")
      .select("*")
      .order("id_sonido", { ascending: true });

    if (error) {
      console.error("Error cargando paisajes sonoros:", error);
    } else if (data) {
      setSoundscapes(data as Soundscape[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadSoundscapes();
  }, []);

  // ======================================================
  // Abrir modal (nuevo / editar)
  // ======================================================
  const openModal = (item?: Soundscape) => {
    if (item) {
      setEditingId(item.id_sonido);
      setFormData({
        nombre: item.nombre ?? "",
        categoria: item.categoria ?? "",
        descripcion: item.descripcion ?? "",
        imagen_url: item.imagen_url ?? "",
        archivo_audio: item.archivo_audio ?? "",
        habilitado: item.habilitado,
        habilitado_docentes: item.habilitado_docentes,
        habilitado_estudiantes: item.habilitado_estudiantes,
        permite_personalizacion_volumen: item.permite_personalizacion_volumen,
        permite_personalizacion_intensidad: item.permite_personalizacion_intensidad,
        modo_anti_ansiedad: item.modo_anti_ansiedad,
      });
    } else {
      setEditingId(null);
      setFormData({
        nombre: "",
        categoria: "",
        descripcion: "",
        imagen_url: "",
        archivo_audio: "",
        habilitado: true,
        habilitado_docentes: true,
        habilitado_estudiantes: true,
        permite_personalizacion_volumen: true,
        permite_personalizacion_intensidad: true,
        modo_anti_ansiedad: true,
      });
    }
    setShowModal(true);
  };

  // ======================================================
  // Guardar (INSERT / UPDATE)
  // ======================================================
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nombre: formData.nombre,
      categoria: formData.categoria || null,
      descripcion: formData.descripcion || null,
      imagen_url: formData.imagen_url || null,
      archivo_audio: formData.archivo_audio || null,
      habilitado: formData.habilitado,
      habilitado_docentes: formData.habilitado_docentes,
      habilitado_estudiantes: formData.habilitado_estudiantes,
      permite_personalizacion_volumen: formData.permite_personalizacion_volumen,
      permite_personalizacion_intensidad: formData.permite_personalizacion_intensidad,
      modo_anti_ansiedad: formData.modo_anti_ansiedad,
    };

    let error;

    if (editingId) {
      const { error: updError } = await supabase
        .from("paisajes_sonoros")
        .update(payload)
        .eq("id_sonido", editingId);

      error = updError;
    } else {
      const { error: insError } = await supabase
        .from("paisajes_sonoros")
        .insert(payload);

      error = insError;
    }

    if (error) {
      alert("Error guardando soundscape: " + error.message);
      return;
    }

    setShowModal(false);
    await loadSoundscapes();
  };

  // ======================================================
  // Eliminar
  // ======================================================
  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este soundscape?")) return;

    const { error } = await supabase
      .from("paisajes_sonoros")
      .delete()
      .eq("id_sonido", id);

    if (error) {
      alert("Error eliminando soundscape");
    } else {
      loadSoundscapes();
    }
  };

  // ======================================================
  // Render
  // ======================================================
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[#333333] mb-2 font-bold">
            Gestión de Entornos Sonoros (Soundscapes)
          </h2>
          <p className="text-[#006d6f] font-medium">
            Configura, carga y administra los ambientes auditivos disponibles en la plataforma NeuroStudy.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
          style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }}
        >
          <Plus className="w-5 h-5" />
          Agregar Soundscape
        </button>
      </div>

      {/* TARJETAS ESTADÍSTICAS (decorativas) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#797979] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#006d6f]/10 flex items-center justify-center">
              <Music className="w-5 h-5 text-[#006d6f]" />
            </div>
            <div>
              <p className="text-[#797979] font-medium">Soundscape más usado</p>
              <p className="text-[#333333] font-semibold">
                {soundscapes[0]?.nombre ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#797979] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#00bfbf]/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00bfbf]" />
            </div>
            <div>
              <p className="text-[#797979] font-medium">Exámenes con sonido</p>
              <p className="text-[#333333] font-semibold">142 activos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#797979] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#006d6f]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#006d6f]" />
            </div>
            <div>
              <p className="text-[#797979] font-medium">Estudiantes usando sonido</p>
              <p className="text-[#333333] font-semibold">1,248 usuarios</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#797979] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#00bfbf]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00bfbf]" />
            </div>
            <div>
              <p className="text-[#797979] font-medium">Reducción de estrés</p>
              <p className="text-[#333333] font-semibold">-18% promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRID DE SOUNDESCAPES */}
      <div className="bg-white rounded-2xl border border-[#797979] p-6 shadow-sm">
        <h3 className="text-[#333333] mb-4 font-semibold">
          Catálogo de Soundscapes
        </h3>

        {loading ? (
          <p>Cargando soundscapes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soundscapes.map((s) => (
              <div
                key={s.id_sonido}
                className="border border-[#797979] rounded-xl p-4 hover:border-[#006d6f] transition-colors"
              >
                {s.imagen_url ? (
                  <img
                    src={s.imagen_url}
                    alt={s.nombre}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-32 bg-neutral-200 rounded-lg mb-3 flex items-center justify-center text-[#797979]">
                    Sin imagen
                  </div>
                )}

                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-[#333333] font-semibold">
                      {s.nombre}
                    </h4>
                    <p className="text-[#00bfbf] font-medium">
                      {s.categoria ?? "Sin categoría"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      s.habilitado
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {s.habilitado ? "Habilitado" : "Deshabilitado"}
                  </span>
                </div>

                <p className="text-[#797979] mb-4">
                  {s.descripcion ?? "Sin descripción"}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(s)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#797979] bg-[#006d6f] text-white px-4 py-2 hover:bg-[#00595a] transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(s.id_sonido)}
                    className="flex items-center justify-center rounded-lg border border-[#797979] bg-white text-red-600 px-4 py-2 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AJUSTES GLOBALES (solo UI) */}
      <div className="bg-white rounded-2xl border border-[#797979] p-6 shadow-sm">
        <h3 className="text-[#333333] mb-6 font-semibold">
          Ajustes Globales de Sonido
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[#333333] mb-3 font-medium">
              Volumen máximo permitido: {globalSettings.maxVolume}%
            </label>
            <Slider
              value={[globalSettings.maxVolume]}
              onValueChange={(value) =>
                setGlobalSettings({ ...globalSettings, maxVolume: value[0] })
              }
              max={100}
              step={1}
            />
          </div>

          <div>
            <label className="block text-[#333333] mb-3 font-medium">
              Intensidad máxima permitida: {globalSettings.maxIntensity}%
            </label>
            <Slider
              value={[globalSettings.maxIntensity]}
              onValueChange={(value) =>
                setGlobalSettings({ ...globalSettings, maxIntensity: value[0] })
              }
              max={100}
              step={1}
            />
          </div>

          <div>
            <label className="block text-[#333333] mb-3 font-medium">
              Tiempo máximo de reproducción: {globalSettings.maxPlaybackTime} min
            </label>
            <Slider
              value={[globalSettings.maxPlaybackTime]}
              onValueChange={(value) =>
                setGlobalSettings({
                  ...globalSettings,
                  maxPlaybackTime: value[0],
                })
              }
              max={240}
              step={15}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#333333] font-medium">
                Permitir soundscapes personalizados
              </span>
              <Switch
                checked={globalSettings.allowCustomSoundscapes}
                onCheckedChange={(checked) =>
                  setGlobalSettings({
                    ...globalSettings,
                    allowCustomSoundscapes: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#333333] font-medium">
                Filtrado automático de frecuencias
              </span>
              <Switch
                checked={globalSettings.autoFrequencyFiltering}
                onCheckedChange={(checked) =>
                  setGlobalSettings({
                    ...globalSettings,
                    autoFrequencyFiltering: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#333333] font-medium">
                Modo anti-ansiedad por defecto
              </span>
              <Switch
                checked={globalSettings.defaultAntiAnxietyMode}
                onCheckedChange={(checked) =>
                  setGlobalSettings({
                    ...globalSettings,
                    defaultAntiAnxietyMode: checked,
                  })
                }
              />
            </div>
          </div>
        </div>

        <button
          className="mt-6 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
          style={{ fontWeight: 600, boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }}
        >
          <Volume2 className="w-5 h-5 inline mr-2" />
          Guardar Configuración Global
        </button>
      </div>

      {/* MODAL MANUAL CENTRADO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-[#797979] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#333333] font-bold">
                {editingId ? "Editar Soundscape" : "Nuevo Soundscape"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#797979] hover:text-[#333333]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Nombre */}
              <div>
                <label className="block text-[#333333] mb-2 font-medium">
                  Nombre del Sonido
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3"
                  required
                />
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-[#333333] mb-2 font-medium">
                  Categoría
                </label>
                <select
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Ruido Técnico">Ruido Técnico</option>
                  <option value="Naturaleza">Naturaleza</option>
                  <option value="Ambiente">Ambiente</option>
                  <option value="Personalizado">Personalizado</option>
                </select>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-[#333333] mb-2 font-medium">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 min-h-[80px]"
                />
              </div>

              {/* URL Imagen */}
              <div>
                <label className="block text-[#333333] mb-2 font-medium">
                  URL de Imagen
                </label>
                <input
                  type="text"
                  value={formData.imagen_url}
                  onChange={(e) =>
                    setFormData({ ...formData, imagen_url: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3"
                  placeholder="https://..."
                />
              </div>

              {/* URL Audio */}
              <div>
                <label className="block text-[#333333] mb-2 font-medium">
                  URL del Archivo de Audio
                </label>
                <input
                  type="text"
                  value={formData.archivo_audio}
                  onChange={(e) =>
                    setFormData({ ...formData, archivo_audio: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3"
                  placeholder="https://..."
                />
              </div>

              {/* Switches */}
              <div className="border-t border-[#797979]/30 pt-4 space-y-4">
                <h4 className="text-[#333333] font-semibold">
                  Configuraciones Avanzadas
                </h4>

                {[
                  ["habilitado", "Habilitado"],
                  ["habilitado_docentes", "Disponible para docentes"],
                  ["habilitado_estudiantes", "Disponible para estudiantes"],
                  [
                    "permite_personalizacion_volumen",
                    "Permitir personalización de volumen",
                  ],
                  [
                    "permite_personalizacion_intensidad",
                    "Permitir personalización de intensidad",
                  ],
                  ["modo_anti_ansiedad", "Modo anti-ansiedad"],
                ].map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-[#333333]">{label}</span>
                    <Switch
                      checked={(formData as any)[key]}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, [key]: checked } as any)
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
                >
                  {editingId ? "Guardar Cambios" : "Crear Soundscape"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl bg-white text-[#333333] px-6 py-3 hover:bg-[#ececec] transition-colors border border-[#797979]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
