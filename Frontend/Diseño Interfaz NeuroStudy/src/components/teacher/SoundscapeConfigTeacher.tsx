import { useState } from "react";
import { Music, Play, Pause, Volume2, Waves, Info } from "lucide-react";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";

interface SoundscapeOption {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  audioFile: string;
}

export function SoundscapeConfigTeacher() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedSoundscape, setSelectedSoundscape] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [intensity, setIntensity] = useState(60);
  const [antiAnxietyMode, setAntiAnxietyMode] = useState(true);
  const [allowStudentCustomization, setAllowStudentCustomization] = useState(true);

  const soundscapes: SoundscapeOption[] = [
    {
      id: "1",
      name: "Ruido Blanco",
      category: "Ruido Técnico",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300",
      audioFile: "white-noise.mp3"
    },
    {
      id: "2",
      name: "Lluvia Suave",
      category: "Naturaleza",
      imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300",
      audioFile: "rain.mp3"
    },
    {
      id: "3",
      name: "Bosque Tranquilo",
      category: "Naturaleza",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
      audioFile: "forest.mp3"
    },
    {
      id: "4",
      name: "Olas del Mar",
      category: "Naturaleza",
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300",
      audioFile: "ocean.mp3"
    },
    {
      id: "5",
      name: "Café Ambiente",
      category: "Ambiente",
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
      audioFile: "cafe.mp3"
    },
    {
      id: "6",
      name: "Ruido Rosa",
      category: "Ruido Técnico",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300",
      audioFile: "pink-noise.mp3"
    }
  ];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-[#797979] p-6"
      style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[#333333] mb-2" style={{ fontWeight: 600 }}>
            Configuración de Entorno Sonoro
          </h3>
          <p className="text-[#797979]" style={{ fontWeight: 500 }}>
            Mejora la concentración y reduce la ansiedad durante el examen
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#333333]" style={{ fontWeight: 500 }}>
            Activar entorno sonoro
          </span>
          <Switch 
            checked={soundEnabled}
            onCheckedChange={setSoundEnabled}
          />
        </div>
      </div>

      {!soundEnabled ? (
        <div className="text-center py-8 bg-[#ececec] rounded-xl">
          <Music className="w-16 h-16 mx-auto mb-4 text-[#797979]" />
          <p className="text-[#797979]" style={{ fontWeight: 500 }}>
            El entorno sonoro está desactivado para este examen
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Soundscape Selection */}
          <div>
            <h4 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
              Selecciona el entorno sonoro para este examen
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {soundscapes.map((soundscape) => (
                <button
                  key={soundscape.id}
                  onClick={() => setSelectedSoundscape(soundscape.id)}
                  className={`rounded-xl border-2 overflow-hidden transition-all ${
                    selectedSoundscape === soundscape.id
                      ? "border-[#006d6f] shadow-lg"
                      : "border-[#797979] hover:border-[#00bfbf]"
                  }`}
                  style={{
                    boxShadow: selectedSoundscape === soundscape.id ? '0 4px 12px rgba(0, 109, 111, 0.3)' : 'none'
                  }}
                >
                  <div className="relative">
                    <img
                      src={soundscape.imageUrl}
                      alt={soundscape.name}
                      className="w-full h-24 object-cover"
                    />
                    {selectedSoundscape === soundscape.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#006d6f] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-left">
                    <p
                      className={`${selectedSoundscape === soundscape.id ? "text-[#006d6f]" : "text-[#333333]"}`}
                      style={{ fontWeight: 600 }}
                    >
                      {soundscape.name}
                    </p>
                    <p className="text-[#797979]">
                      {soundscape.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedSoundscape && (
            <>
              {/* Preview Player */}
              <div
                className="bg-gradient-to-br from-[#006d6f]/5 to-[#00bfbf]/5 rounded-xl p-5 border border-[#006d6f]/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlay}
                      className="w-12 h-12 rounded-full bg-[#006d6f] text-white flex items-center justify-center hover:bg-[#00595a] transition-colors"
                      style={{ boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.15)' }}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </button>
                    <div>
                      <p className="text-[#333333]" style={{ fontWeight: 600 }}>
                        Vista Previa
                      </p>
                      <p className="text-[#797979]">
                        {soundscapes.find(s => s.id === selectedSoundscape)?.name}
                      </p>
                    </div>
                  </div>
                  
                  {isPlaying && (
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-[#006d6f] rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#ececec] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#006d6f] to-[#00bfbf] transition-all duration-300"
                    style={{ width: isPlaying ? '45%' : '0%' }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[#797979]">1:24</span>
                  <span className="text-[#797979]">3:00</span>
                </div>
              </div>

              {/* Parameters */}
              <div className="space-y-5">
                <h4 className="text-[#333333]" style={{ fontWeight: 600 }}>
                  Parámetros ajustables del sonido
                </h4>

                {/* Volume */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-[#006d6f]" />
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

                {/* Intensity */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Waves className="w-5 h-5 text-[#006d6f]" />
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

                {/* Toggles */}
                <div className="space-y-4 pt-4 border-t border-[#797979]/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🧘‍♂️</span>
                      <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                        Modo anti-ansiedad
                      </span>
                    </div>
                    <Switch 
                      checked={antiAnxietyMode}
                      onCheckedChange={setAntiAnxietyMode}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                      Permitir que el estudiante modifique parámetros
                    </span>
                    <Switch 
                      checked={allowStudentCustomization}
                      onCheckedChange={setAllowStudentCustomization}
                    />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="flex gap-3 bg-[#00bfbf]/10 border border-[#00bfbf]/30 rounded-xl p-4">
                <Info className="w-5 h-5 text-[#006d6f] flex-shrink-0 mt-0.5" />
                <p className="text-[#333333]" style={{ fontWeight: 500 }}>
                  {allowStudentCustomization 
                    ? "Estos parámetros se aplicarán al inicio del examen. El estudiante podrá ajustarlos durante la prueba."
                    : "El entorno sonoro será reproducido solo cuando el estudiante esté rindiendo este examen. Los parámetros configurados no podrán ser modificados por el estudiante."}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
