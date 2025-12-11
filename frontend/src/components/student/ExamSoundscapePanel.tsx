import { useState } from "react";
import { Music, Play, Pause, Volume2, VolumeX, Waves, Info } from "lucide-react";
import { Slider } from "../ui/slider";

interface ExamSoundscapePanelProps {
  soundscapeEnabled?: boolean;
  soundscapeName?: string;
  soundscapeCategory?: string;
  soundscapeImage?: string;
  allowCustomization?: boolean;
  antiAnxietyMode?: boolean;
  initialVolume?: number;
  initialIntensity?: number;
}

export function ExamSoundscapePanel({
  soundscapeEnabled = false,
  soundscapeName = "Lluvia Suave",
  soundscapeCategory = "Naturaleza",
  soundscapeImage = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400",
  allowCustomization = true,
  antiAnxietyMode = true,
  initialVolume = 70,
  initialIntensity = 60
}: ExamSoundscapePanelProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [intensity, setIntensity] = useState(initialIntensity);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!soundscapeEnabled) {
    return (
      <div
        className="bg-white rounded-2xl border border-[#797979] p-4"
        style={{ boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="flex items-center gap-3 text-[#797979]">
          <VolumeX className="w-6 h-6" />
          <div>
            <p style={{ fontWeight: 600 }}>Entorno Sonoro Inactivo</p>
            <p style={{ fontWeight: 500 }}>Este examen no utiliza entorno sonoro.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl border border-[#006d6f] p-5"
      style={{ boxShadow: '5px 5px 10px rgba(0, 109, 111, 0.15)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Music className="w-6 h-6 text-[#006d6f]" />
        <h3 className="text-[#006d6f]" style={{ fontWeight: 600 }}>
          Entorno Sonoro Activo
        </h3>
      </div>

      {/* Soundscape Info */}
      <div className="flex gap-4 mb-5">
        <img
          src={soundscapeImage}
          alt={soundscapeName}
          className="w-24 h-24 rounded-xl object-cover border border-[#797979]"
        />
        <div className="flex-1">
          <h4 className="text-[#333333] mb-1" style={{ fontWeight: 600 }}>
            {soundscapeName}
          </h4>
          <p className="text-[#00bfbf] mb-3" style={{ fontWeight: 500 }}>
            {soundscapeCategory}
          </p>
          
          {antiAnxietyMode && (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <span className="text-lg">🧘‍♂️</span>
              <span style={{ fontWeight: 600 }}>Modo Anti-Ansiedad Activado</span>
            </div>
          )}
        </div>
      </div>

      {/* Player Controls */}
      <div className="bg-gradient-to-br from-[#006d6f]/5 to-[#00bfbf]/5 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={handleTogglePlay}
            className="w-12 h-12 rounded-full bg-[#006d6f] text-white flex items-center justify-center hover:bg-[#00595a] transition-colors flex-shrink-0"
            style={{ boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.15)' }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>

          <div className="flex-1">
            <div className="w-full h-2 bg-[#ececec] rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-[#006d6f] to-[#00bfbf] transition-all duration-300"
                style={{ width: isPlaying ? '60%' : '60%' }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[#797979]">2:15</span>
              <span className="text-[#797979]">3:35</span>
            </div>
          </div>

          <button
            onClick={handleToggleMute}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isMuted ? "bg-red-100 text-red-600" : "bg-[#006d6f]/10 text-[#006d6f]"
            }`}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Wave Animation */}
        {isPlaying && !isMuted && (
          <div className="flex items-center justify-center gap-1 h-8">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-[#006d6f] rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 24 + 8}px`,
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: '0.6s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      {allowCustomization ? (
        <div className="space-y-4">
          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#006d6f]" />
                <label className="text-[#333333]" style={{ fontWeight: 500 }}>
                  Volumen
                </label>
              </div>
              <span className="text-[#006d6f]" style={{ fontWeight: 600 }}>
                {volume}%
              </span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Intensity Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-[#006d6f]" />
                <label className="text-[#333333]" style={{ fontWeight: 500 }}>
                  Intensidad
                </label>
              </div>
              <span className="text-[#006d6f]" style={{ fontWeight: 600 }}>
                {intensity}%
              </span>
            </div>
            <Slider
              value={[intensity]}
              onValueChange={(value) => setIntensity(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      ) : (
        <div className="bg-[#ececec] rounded-lg p-3 text-center">
          <p className="text-[#797979]" style={{ fontWeight: 500 }}>
            Los ajustes de sonido fueron configurados por el profesor.
          </p>
        </div>
      )}

      {/* Info Notice */}
      <div className="flex gap-2 mt-5 pt-4 border-t border-[#797979]/20">
        <Info className="w-4 h-4 text-[#006d6f] flex-shrink-0 mt-0.5" />
        <p className="text-[#797979]" style={{ fontWeight: 500 }}>
          El entorno sonoro puede ayudar a reducir el estrés y mejorar tu concentración. 
          Tus indicadores de atención son monitoreados para fines de investigación del sistema NeuroStudy.
        </p>
      </div>
    </div>
  );
}
