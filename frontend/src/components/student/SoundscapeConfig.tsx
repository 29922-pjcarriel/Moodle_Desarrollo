import { useState } from "react";
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
  Sparkles
} from "lucide-react";
import { Footer } from "../Footer";

interface SoundscapeConfigProps {
  courseTitle: string;
  examType: string;
  onBack: () => void;
  onStartExam: () => void;
}

interface SoundscapeOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export function SoundscapeConfig({ courseTitle, examType, onBack, onStartExam }: SoundscapeConfigProps) {
  const [selectedSound, setSelectedSound] = useState<string>("white-noise");
  const [volume, setVolume] = useState(50);
  const [intensity, setIntensity] = useState(50);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const soundscapeOptions: SoundscapeOption[] = [
    {
      id: "white-noise",
      name: "Ruido Blanco",
      description: "Ideal para bloquear distracciones",
      icon: <Wind className="w-8 h-8" />
    },
    {
      id: "brown-noise",
      name: "Ruido Café",
      description: "Favorece la concentración profunda",
      icon: <Coffee className="w-8 h-8" />
    },
    {
      id: "green-noise",
      name: "Ruido Verde",
      description: "Evoca entornos naturales calmados",
      icon: <Trees className="w-8 h-8" />
    },
    {
      id: "nature-sounds",
      name: "Sonidos Naturales",
      description: "Lluvia, bosque, viento suave",
      icon: <CloudRain className="w-8 h-8" />
    },
    {
      id: "custom",
      name: "Paisaje Personalizado",
      description: "Carga tu propio sonido",
      icon: <Upload className="w-8 h-8" />
    }
  ];

  const handlePreview = () => {
    setIsPreviewPlaying(!isPreviewPlaying);
    // Simular reproducción durante 3 segundos
    if (!isPreviewPlaying) {
      setTimeout(() => setIsPreviewPlaying(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <div className="w-full h-1 bg-[#006d6f]"></div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Volver</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#00bfbf] flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-[#006d6f]" style={{ fontWeight: 700 }}>
              Configuración del Entorno Sonoro
            </h1>
          </div>
          <p className="text-[#666666] max-w-4xl">
            Selecciona el tipo de sonido que deseas utilizar durante tu prueba. Los paisajes sonoros pueden ayudarte a mantener la calma, mejorar tu concentración y reducir la carga cognitiva.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[#006d6f]">
            <span style={{ fontWeight: 600 }}>{courseTitle}</span>
            <span className="text-[#999999]">•</span>
            <span className="text-[#666666]">{examType}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left & Center */}
          <div className="lg:col-span-2 space-y-8">
            {/* Soundscape Options */}
            <div>
              <h3 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
                Selecciona tu Paisaje Sonoro
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {soundscapeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedSound(option.id)}
                    className={`rounded-2xl border-2 bg-white p-6 text-left transition-all hover:shadow-lg ${
                      selectedSound === option.id
                        ? "border-[#00bfbf] shadow-md"
                        : "border-[#cccccc]"
                    }`}
                    style={{ 
                      boxShadow: selectedSound === option.id 
                        ? '0 4px 12px rgba(0, 191, 191, 0.25)' 
                        : '3px 3px 8px rgba(0, 0, 0, 0.08)' 
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className={`rounded-full p-3 ${
                          selectedSound === option.id 
                            ? "bg-[#00bfbf] text-white" 
                            : "bg-[#ececec] text-[#006d6f]"
                        }`}
                      >
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h4 
                          className={`mb-2 ${
                            selectedSound === option.id 
                              ? "text-[#006d6f]" 
                              : "text-[#333333]"
                          }`}
                          style={{ fontWeight: 600 }}
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
            </div>

            {/* Control Settings */}
            <div 
              className="rounded-2xl border border-[#cccccc] bg-white p-8"
              style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.08)' }}
            >
              <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
                Ajustes de Audio
              </h3>

              {/* Volume Control */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[#333333]" style={{ fontWeight: 500 }}>
                    Control de Volumen
                  </label>
                  <span className="text-[#006d6f]" style={{ fontWeight: 600 }}>
                    {volume}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <VolumeX className="w-5 h-5 text-[#999999]" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-2 bg-[#ececec] rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #00bfbf 0%, #00bfbf ${volume}%, #ececec ${volume}%, #ececec 100%)`
                    }}
                  />
                  <Volume2 className="w-5 h-5 text-[#006d6f]" />
                </div>
              </div>

              {/* Intensity Control */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[#333333]" style={{ fontWeight: 500 }}>
                    Intensidad / Profundidad
                  </label>
                  <span className="text-[#006d6f]" style={{ fontWeight: 600 }}>
                    {intensity}%
                  </span>
                </div>
                <p className="text-[#666666] text-sm mb-3">
                  Ajusta la intensidad del paisaje sonoro según tu comodidad.
                </p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-[#ececec] rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #006d6f 0%, #006d6f ${intensity}%, #ececec ${intensity}%, #ececec 100%)`
                  }}
                />
              </div>

              {/* Preview Button */}
              <button
                onClick={handlePreview}
                className={`flex items-center justify-center gap-2 w-full rounded-xl border border-[#797979] px-6 py-3 transition-all ${
                  isPreviewPlaying 
                    ? "bg-[#00bfbf] text-white" 
                    : "bg-[#ececec] text-[#333333] hover:bg-[#d8d8d8]"
                }`}
                style={{ boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.1)' }}
              >
                <Play className="w-5 h-5" />
                <span style={{ fontWeight: 500 }}>
                  {isPreviewPlaying ? "Reproduciendo..." : "Previsualizar Sonido"}
                </span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBack}
                className="flex-1 rounded-2xl border-2 border-[#797979] bg-white px-8 py-4 text-[#333333] hover:bg-[#f5f5f5] transition-colors"
                style={{ 
                  fontWeight: 600,
                  boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.08)'
                }}
              >
                Volver
              </button>
              <button
                onClick={onStartExam}
                className="flex-1 rounded-2xl border border-[#006d6f] bg-[#006d6f] px-8 py-4 text-white hover:bg-[#005555] transition-colors"
                style={{ 
                  fontWeight: 600,
                  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.15)'
                }}
              >
                Iniciar Examen
              </button>
            </div>
          </div>

          {/* Right Column - Recommendation */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-2xl border border-[#cccccc] bg-gradient-to-br from-[#e8f5f5] to-white p-6 sticky top-8"
              style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.08)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00bfbf] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[#006d6f]" style={{ fontWeight: 600 }}>
                  Recomendación
                </h3>
              </div>

              <p className="text-[#333333] mb-4 leading-relaxed">
                Los sonidos constantes y suaves ayudan a estabilizar el enfoque y reducir la ansiedad. Elige el entorno que te haga sentir más tranquilo.
              </p>

              <div 
                className="rounded-xl bg-white p-4 mb-4"
                style={{ boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.06)' }}
              >
                <h4 className="text-[#006d6f] mb-2 text-sm" style={{ fontWeight: 600 }}>
                  Basado en investigación
                </h4>
                <p className="text-[#666666] text-sm leading-relaxed">
                  Los paisajes sonoros reducen la carga cognitiva y mejoran el rendimiento académico en entornos de evaluación.
                </p>
              </div>

              <div className="flex items-start gap-2 text-[#00bfbf] text-sm">
                <Sparkles className="w-4 h-4 mt-1 flex-shrink-0" />
                <p className="italic">
                  Puedes cambiar el sonido en cualquier momento durante el examen.
                </p>
              </div>

              {/* Visual Audio Indicator */}
              <div className="mt-6 pt-6 border-t border-[#cccccc]">
                <p className="text-[#666666] text-sm mb-3 text-center">
                  Modo silencioso disponible
                </p>
                <div className="flex justify-center items-end gap-1 h-16">
                  {[30, 50, 40, 60, 45, 55, 35].map((height, index) => (
                    <div
                      key={index}
                      className="w-2 bg-gradient-to-t from-[#006d6f] to-[#00bfbf] rounded-full transition-all"
                      style={{ 
                        height: `${height}%`,
                        animation: isPreviewPlaying ? `pulse ${0.5 + index * 0.1}s ease-in-out infinite` : 'none'
                      }}
                    />
                  ))}
                </div>
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
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #006d6f;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #006d6f;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
