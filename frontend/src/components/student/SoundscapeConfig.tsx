// frontend/src/components/student/SoundscapeConfig.tsx
import { useEffect, useRef, useState } from "react";
import {
  Headphones,
  Volume2,
  VolumeX,
  Play,
  ArrowLeft,
  Brain,
  Wind,
  Coffee,
  Trees,
  CloudRain,
  Upload,
  Sparkles,
} from "lucide-react";
import { Footer } from "../Footer";
import { supabase } from "../../lib/supabaseClient";

interface SoundscapeConfigProps {
  courseTitle: string;
  examType: string;
  onBack: () => void;
  onStartExam: () => void;
  soundscapesEnabled?: boolean;
}

interface SoundscapeOption {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  audioUrl: string | null;
}

function getIconForCategory(categoria: string | null): React.ReactNode {
  if (!categoria) return <Headphones className="w-8 h-8" />;

  const cat = categoria.toLowerCase();
  if (cat.includes("blanco") || cat.includes("white")) return <Wind className="w-8 h-8" />;
  if (cat.includes("café") || cat.includes("cafe") || cat.includes("brown")) return <Coffee className="w-8 h-8" />;
  if (cat.includes("verde") || cat.includes("green")) return <Trees className="w-8 h-8" />;
  if (cat.includes("natural") || cat.includes("lluvia") || cat.includes("rain")) return <CloudRain className="w-8 h-8" />;
  if (cat.includes("personal")) return <Upload className="w-8 h-8" />;

  return <Headphones className="w-8 h-8" />;
}

export function SoundscapeConfig({
  courseTitle,
  examType,
  onBack,
  onStartExam,
  soundscapesEnabled = true,
}: SoundscapeConfigProps) {
  const [options, setOptions] = useState<SoundscapeOption[]>([]);
  const [selectedSoundId, setSelectedSoundId] = useState<number | null>(null);
  const [volume, setVolume] = useState(50);
  const [intensity, setIntensity] = useState(50);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ============================
        1) CARGAR SONIDOS
  ============================ */
  useEffect(() => {
    async function loadSoundscapes() {
      const { data, error } = await supabase
        .from("paisajes_sonoros")
        .select(
          "id_sonido, nombre, descripcion, categoria, archivo_audio, habilitado, habilitado_estudiantes"
        )
        .eq("habilitado", true)
        .eq("habilitado_estudiantes", true);

      if (error) {
        console.error("❌ Error cargando paisajes sonoros:", error);
        return;
      }

      const opts = (data || []).map((row: any) => ({
        id: row.id_sonido,
        name: row.nombre,
        description: row.descripcion || "",
        icon: getIconForCategory(row.categoria),
        audioUrl: row.archivo_audio || null,
      }));

      setOptions(opts);
      if (opts.length > 0) setSelectedSoundId(opts[0].id);
    }

    loadSoundscapes();
  }, []);

  /* ============================
        2) CREAR / LIMPIAR AUDIO
  ============================ */
  useEffect(() => {
    const selected = options.find((o) => o.id === selectedSoundId);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    setIsPreviewPlaying(false);

    if (!selected?.audioUrl) return;

    const audio = new Audio(selected.audioUrl);

    audio.preload = "auto";
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audio.volume = volume / 100;

    audioRef.current = audio;
  }, [selectedSoundId, options]);

  /* ============================
        3) ACTUALIZAR VOLUMEN
  ============================ */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  /* ============================
        4) PREVIEW
  ============================ */
  const handlePreview = async () => {
    const audio = audioRef.current;

    if (!audio) {
      console.warn("⚠️ No hay audio para reproducir.");
      return;
    }

    if (!isPreviewPlaying) {
      try {
        await audio.play();
        setIsPreviewPlaying(true);
      } catch (err) {
        console.error("❌ Error al reproducir:", err);
      }
    } else {
      audio.pause();
      setIsPreviewPlaying(false);
    }
  };

  /* ============================
      B — SI NO HAY SONIDO
  ============================ */
  if (!soundscapesEnabled) {
    return (
      <div className="min-h-screen flex flex-col bg-[#ececec]">
        <div className="w-full h-1 bg-[#006d6f]"></div>

        <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
          </div>

          <div className="rounded-2xl border border-[#cccccc] bg-white p-8 text-center shadow-md">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#006d6f] to-[#00bfbf] flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-[#006d6f] font-bold mb-4">Preparado para empezar tu examen</h1>

            <p className="text-[#666666] mb-6 max-w-2xl mx-auto">
              Lee las instrucciones cuidadosamente y comienza cuando estés listo.
            </p>

            <div className="mb-6 flex items-center justify-center gap-2">
              <span className="font-semibold text-[#006d6f]">{courseTitle}</span>
              <span className="text-[#999999]">•</span>
              <span className="text-[#666666]">{examType}</span>
            </div>

            <button
              onClick={() => {
                localStorage.setItem("attentionActive", "true");
                onStartExam();
              }}
              className="flex-1 rounded-2xl bg-[#006d6f] text-white px-8 py-4 hover:bg-[#005555]"
            >
              Iniciar Examen
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /* ============================
      A — CONFIGURACIÓN COMPLETA
  ============================ */
  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <div className="w-full h-1 bg-[#006d6f]"></div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
        </div>

        {/* ============================================
              SELECTOR DE SONIDOS
        ============================================ */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#00bfbf] flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-[#006d6f] font-bold">Configuración del Entorno Sonoro</h1>
          </div>
          <p className="text-[#666666] max-w-4xl">
            Selecciona el tipo de sonido que deseas utilizar durante tu prueba.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-[#333333] font-semibold mb-4">
                Selecciona tu Paisaje Sonoro
              </h3>

              {options.length === 0 ? (
                <p className="text-[#666666]">
                  No hay paisajes sonoros disponibles.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedSoundId(option.id)}
                      className={`rounded-2xl border-2 bg-white p-6 text-left transition-all ${
                        selectedSoundId === option.id
                          ? "border-[#00bfbf] shadow-lg"
                          : "border-[#cccccc]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`rounded-full p-3 ${
                            selectedSoundId === option.id
                              ? "bg-[#00bfbf] text-white"
                              : "bg-[#ececec] text-[#006d6f]"
                          }`}
                        >
                          {option.icon}
                        </div>
                        <div>
                          <h4
                            className={`font-semibold mb-2 ${
                              selectedSoundId === option.id
                                ? "text-[#006d6f]"
                                : "text-[#333333]"
                            }`}
                          >
                            {option.name}
                          </h4>
                          <p className="text-[#666666] text-sm">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* VOLUME + INTENSITY */}
            <div className="rounded-2xl border border-[#cccccc] bg-white p-8 shadow-md">
              <h3 className="text-[#333333] font-semibold mb-6">Ajustes de Audio</h3>

              {/* Volume */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="text-[#333333] font-medium">Control de Volumen</label>
                  <span className="text-[#006d6f] font-semibold">{volume}%</span>
                </div>

                <div className="flex items-center gap-4">
                  <VolumeX className="text-[#999999]" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1"
                  />
                  <Volume2 className="text-[#006d6f]" />
                </div>
              </div>

              {/*Intensity */}
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <label className="text-[#333333] font-medium">
                    Intensidad / Profundidad
                  </label>
                  <span className="text-[#006d6f] font-semibold">{intensity}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* PREVIEW BUTTON */}
              <button
                onClick={handlePreview}
                disabled={!audioRef.current}
                className={`w-full rounded-xl border px-6 py-3 flex justify-center items-center gap-2 ${
                  isPreviewPlaying
                    ? "bg-[#00bfbf] text-white"
                    : "bg-[#ececec] text-[#333333] hover:bg-[#d8d8d8]"
                }`}
              >
                <Play className="w-5 h-5" />
                {isPreviewPlaying ? "Reproduciendo..." : "Previsualizar Sonido"}
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBack}
                className="flex-1 rounded-2xl border-2 border-[#797979] bg-white px-8 py-4 hover:bg-[#f5f5f5]"
              >
                Volver
              </button>

              <button
                onClick={onStartExam}
                className="flex-1 rounded-2xl bg-[#006d6f] text-white px-8 py-4 hover:bg-[#005555]"
              >
                Iniciar Examen
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#cccccc] bg-gradient-to-br from-[#e8f5f5] to-white p-6 sticky top-8 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00bfbf] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-[#006d6f]">Recomendación</h3>
              </div>

              <p className="text-[#333333] mb-4">
                Los sonidos suaves ayudan a estabilizar el enfoque.
              </p>

              <div className="rounded-xl p-4 bg-white shadow mb-4">
                <h4 className="text-[#006d6f] font-semibold mb-2 text-sm">
                  Basado en investigación
                </h4>
                <p className="text-[#666666] text-sm">
                  Está demostrado que los paisajes sonoros reducen la ansiedad.
                </p>
              </div>

              <div className="flex items-start gap-2 text-[#00bfbf] text-sm">
                <Sparkles className="w-4 h-4 mt-1" />
                <p className="italic">Puedes cambiar el sonido durante el examen.</p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#cccccc]">
                <p className="text-center text-[#666666] text-sm">
                  Modo silencioso disponible
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
