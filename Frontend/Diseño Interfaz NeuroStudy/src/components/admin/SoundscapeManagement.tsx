import { useState } from "react";
import { Plus, Pencil, Trash2, Music, Upload, TrendingUp, Users, Activity, Volume2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";

interface Soundscape {
  id: string;
  name: string;
  category: string;
  description: string;
  enabled: boolean;
  imageUrl: string;
  audioFile: string;
}

export function SoundscapeManagement() {
  const [soundscapes, setSoundscapes] = useState<Soundscape[]>([
    {
      id: "1",
      name: "Ruido Blanco",
      category: "Ruido Técnico",
      description: "Sonido constante que ayuda a bloquear distracciones",
      enabled: true,
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
      audioFile: "white-noise.mp3"
    },
    {
      id: "2",
      name: "Lluvia Suave",
      category: "Naturaleza",
      description: "Sonido relajante de lluvia para concentración",
      enabled: true,
      imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400",
      audioFile: "rain.mp3"
    },
    {
      id: "3",
      name: "Bosque Tranquilo",
      category: "Naturaleza",
      description: "Ambiente natural con sonidos de aves y viento",
      enabled: true,
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
      audioFile: "forest.mp3"
    },
    {
      id: "4",
      name: "Ruido Café",
      category: "Ruido Técnico",
      description: "Sonido de ambiente de cafetería para estudio",
      enabled: false,
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      audioFile: "brown-noise.mp3"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    enabledForTeachers: true,
    enabledForStudents: true,
    allowVolumeCustomization: true,
    allowIntensityCustomization: true,
    antiAnxietyMode: true
  });

  const [globalSettings, setGlobalSettings] = useState({
    maxVolume: 80,
    maxIntensity: 75,
    allowCustomSoundscapes: true,
    autoFrequencyFiltering: true,
    defaultAntiAnxietyMode: true,
    maxPlaybackTime: 180
  });

  const handleOpenModal = (soundscape?: Soundscape) => {
    if (soundscape) {
      setEditingId(soundscape.id);
      setFormData({
        name: soundscape.name,
        category: soundscape.category,
        description: soundscape.description,
        enabledForTeachers: true,
        enabledForStudents: soundscape.enabled,
        allowVolumeCustomization: true,
        allowIntensityCustomization: true,
        antiAnxietyMode: true
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        category: "",
        description: "",
        enabledForTeachers: true,
        enabledForStudents: true,
        allowVolumeCustomization: true,
        allowIntensityCustomization: true,
        antiAnxietyMode: true
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      setSoundscapes(soundscapes.map(s => 
        s.id === editingId 
          ? { ...s, name: formData.name, category: formData.category, description: formData.description, enabled: formData.enabledForStudents }
          : s
      ));
    } else {
      const newSoundscape: Soundscape = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        description: formData.description,
        enabled: formData.enabledForStudents,
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
        audioFile: "new-sound.mp3"
      };
      setSoundscapes([...soundscapes, newSoundscape]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este soundscape?")) {
      setSoundscapes(soundscapes.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>
            Gestión de Entornos Sonoros (Soundscapes)
          </h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            Configura, carga y administra los ambientes auditivos disponibles en la plataforma NeuroStudy.
          </p>
        </div>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
              style={{ fontWeight: 600, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              <Plus className="w-5 h-5" />
              Agregar Soundscape
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle style={{ fontWeight: 600 }}>
                {editingId ? "Editar Soundscape" : "Agregar Nuevo Soundscape"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5 mt-4">
              {/* Name */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Nombre del Sonido
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  placeholder="Ej: Lluvia Tropical"
                  style={{ fontWeight: 500 }}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  style={{ fontWeight: 500 }}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Ruido Técnico">Ruido Técnico</option>
                  <option value="Naturaleza">Naturaleza</option>
                  <option value="Ambiente">Ambiente</option>
                  <option value="Personalizado">Personalizado</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Descripción Breve
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f] min-h-[80px]"
                  placeholder="Describe el soundscape..."
                  style={{ fontWeight: 500 }}
                />
              </div>

              {/* Audio Upload */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Subir Archivo de Audio
                </label>
                <div className="border-2 border-dashed border-[#797979] rounded-xl p-8 text-center hover:border-[#006d6f] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-3 text-[#797979]" />
                  <p className="text-[#333333] mb-1" style={{ fontWeight: 500 }}>
                    Arrastra un archivo de audio aquí o haz clic para seleccionar
                  </p>
                  <p className="text-[#797979]">
                    MP3, WAV (máx. 50MB)
                  </p>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="border-t border-[#797979]/30 pt-4">
                <h4 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
                  Configuraciones Avanzadas
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                      Habilitar sonido para profesores
                    </span>
                    <Switch 
                      checked={formData.enabledForTeachers}
                      onCheckedChange={(checked) => setFormData({ ...formData, enabledForTeachers: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                      Habilitar sonido para estudiantes
                    </span>
                    <Switch 
                      checked={formData.enabledForStudents}
                      onCheckedChange={(checked) => setFormData({ ...formData, enabledForStudents: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                      Permitir personalización de volumen
                    </span>
                    <Switch 
                      checked={formData.allowVolumeCustomization}
                      onCheckedChange={(checked) => setFormData({ ...formData, allowVolumeCustomization: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                      Permitir personalización de intensidad
                    </span>
                    <Switch 
                      checked={formData.allowIntensityCustomization}
                      onCheckedChange={(checked) => setFormData({ ...formData, allowIntensityCustomization: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                      Modo anti-ansiedad disponible
                    </span>
                    <Switch 
                      checked={formData.antiAnxietyMode}
                      onCheckedChange={(checked) => setFormData({ ...formData, antiAnxietyMode: checked })}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
                  style={{ fontWeight: 600, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-[#797979] bg-white text-[#333333] px-6 py-3 hover:bg-[#ececec] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="bg-white rounded-2xl border border-[#797979] p-5"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#006d6f]/10 flex items-center justify-center">
              <Music className="w-5 h-5 text-[#006d6f]" />
            </div>
            <div>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>Soundscape más usado</p>
              <p className="text-[#333333]" style={{ fontWeight: 600 }}>Lluvia Suave</p>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl border border-[#797979] p-5"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#00bfbf]/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00bfbf]" />
            </div>
            <div>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>Exámenes con sonido</p>
              <p className="text-[#333333]" style={{ fontWeight: 600 }}>142 activos</p>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl border border-[#797979] p-5"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#006d6f]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#006d6f]" />
            </div>
            <div>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>Estudiantes usando sonido</p>
              <p className="text-[#333333]" style={{ fontWeight: 600 }}>1,248 usuarios</p>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl border border-[#797979] p-5"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#00bfbf]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00bfbf]" />
            </div>
            <div>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>Reducción de estrés</p>
              <p className="text-[#333333]" style={{ fontWeight: 600 }}>-18% promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Soundscapes Grid */}
      <div
        className="bg-white rounded-2xl border border-[#797979] p-6"
        style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
          Catálogo de Soundscapes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {soundscapes.map((soundscape) => (
            <div
              key={soundscape.id}
              className="border border-[#797979] rounded-xl p-4 hover:border-[#006d6f] transition-colors"
            >
              <img
                src={soundscape.imageUrl}
                alt={soundscape.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-[#333333]" style={{ fontWeight: 600 }}>
                    {soundscape.name}
                  </h4>
                  <p className="text-[#00bfbf]" style={{ fontWeight: 500 }}>
                    {soundscape.category}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full ${
                    soundscape.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {soundscape.enabled ? "Habilitado" : "Deshabilitado"}
                </span>
              </div>

              <p className="text-[#797979] mb-4">
                {soundscape.description}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(soundscape)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#797979] bg-[#006d6f] text-white px-4 py-2 hover:bg-[#00595a] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(soundscape.id)}
                  className="flex items-center justify-center rounded-lg border border-[#797979] bg-white text-red-600 px-4 py-2 hover:bg-red-50 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Settings */}
      <div
        className="bg-white rounded-2xl border border-[#797979] p-6"
        style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
          Ajustes Globales de Sonido
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Max Volume */}
          <div>
            <label className="block text-[#333333] mb-3" style={{ fontWeight: 500 }}>
              Volumen máximo permitido: {globalSettings.maxVolume}%
            </label>
            <Slider
              value={[globalSettings.maxVolume]}
              onValueChange={(value) => setGlobalSettings({ ...globalSettings, maxVolume: value[0] })}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Max Intensity */}
          <div>
            <label className="block text-[#333333] mb-3" style={{ fontWeight: 500 }}>
              Intensidad máxima permitida: {globalSettings.maxIntensity}%
            </label>
            <Slider
              value={[globalSettings.maxIntensity]}
              onValueChange={(value) => setGlobalSettings({ ...globalSettings, maxIntensity: value[0] })}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Max Playback Time */}
          <div>
            <label className="block text-[#333333] mb-3" style={{ fontWeight: 500 }}>
              Tiempo máximo de reproducción: {globalSettings.maxPlaybackTime} min
            </label>
            <Slider
              value={[globalSettings.maxPlaybackTime]}
              onValueChange={(value) => setGlobalSettings({ ...globalSettings, maxPlaybackTime: value[0] })}
              max={240}
              step={15}
              className="w-full"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                Permitir carga de soundscapes personalizados
              </span>
              <Switch 
                checked={globalSettings.allowCustomSoundscapes}
                onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, allowCustomSoundscapes: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                Activar filtrado automático de frecuencias
              </span>
              <Switch 
                checked={globalSettings.autoFrequencyFiltering}
                onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, autoFrequencyFiltering: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                Activar modo anti-ansiedad por defecto
              </span>
              <Switch 
                checked={globalSettings.defaultAntiAnxietyMode}
                onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, defaultAntiAnxietyMode: checked })}
              />
            </div>
          </div>
        </div>

        <button
          className="mt-6 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
          style={{ fontWeight: 600, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <Volume2 className="w-5 h-5 inline mr-2" />
          Guardar Configuración Global
        </button>
      </div>
    </div>
  );
}
