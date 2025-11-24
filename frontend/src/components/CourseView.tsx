import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, MessageCircle } from "lucide-react";

interface CourseViewProps {
  courseTitle: string;
  username: string;
  onBack: () => void;
  onLogout: () => void;
  onSelectExam?: (examType: string) => void;
  onOpenMessages?: (courseTitle: string) => void;
}

export function CourseView({ courseTitle, username, onBack, onLogout, onSelectExam, onOpenMessages }: CourseViewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Removed Navbar - it's now in StudentLayout */}
      
      {/* Teal top line */}
      <div className="w-full h-1 bg-[#006d6f]"></div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Volver a cursos</span>
          </button>
          
          {onOpenMessages && (
            <button
              onClick={() => onOpenMessages(courseTitle)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#00bfbf] text-[#00bfbf] hover:bg-[#00bfbf] hover:text-white transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Mensaje al profesor</span>
            </button>
          )}
        </div>

        <h2 className="text-[#333333] mb-8" style={{ fontWeight: 600 }}>
          {courseTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Parciales */}
          <div className="lg:col-span-2 space-y-8">
            {/* Primer Parcial */}
            <div>
              <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
                Primer Parcial
              </h3>

              <div className="space-y-4">
                {/* Campo de texto */}
                <div
                  className="rounded-2xl border border-[#797979] bg-[#ececec] p-4"
                  style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
                >
                  <p className="text-[#333333]" style={{ fontFamily: 'Arial, Comic Sans MS, sans-serif' }}>
                    Material de estudio - Unidad 1 a 3
                  </p>
                </div>

                {/* Botones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    className="rounded-2xl border border-[#797979] bg-[#f4d7dd] px-6 py-4 text-[#333333] hover:bg-[#f0c5ce] transition-colors"
                    style={{ 
                      fontFamily: 'Comic Sans MS, Poppins, sans-serif',
                      fontWeight: 500,
                      boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={() => onSelectExam?.('Prueba Parcial')}
                  >
                    Prueba Parcial
                  </button>

                  <button
                    className="rounded-2xl border border-[#797979] bg-[#f4d7dd] px-6 py-4 text-[#333333] hover:bg-[#f0c5ce] transition-colors"
                    style={{ 
                      fontFamily: 'Comic Sans MS, Poppins, sans-serif',
                      fontWeight: 500,
                      boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={() => onSelectExam?.('Exámen Conjunto')}
                  >
                    Exámen Conjunto
                  </button>
                </div>
              </div>
            </div>

            {/* Segundo Parcial */}
            <div>
              <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
                Segundo Parcial
              </h3>

              <div className="space-y-4">
                {/* Campo de texto - Prueba 1 */}
                <div
                  className="rounded-2xl border border-[#797979] bg-[#ececec] p-4"
                  style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
                >
                  <p className="text-[#333333]" style={{ fontFamily: 'Arial, Comic Sans MS, sans-serif' }}>
                    Prueba 1
                  </p>
                </div>

                {/* Campo de texto - Prueba Parcial */}
                <div
                  className="rounded-2xl border border-[#797979] bg-[#ececec] p-4"
                  style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
                >
                  <p className="text-[#333333]" style={{ fontFamily: 'Arial, Comic Sans MS, sans-serif' }}>
                    Prueba Parcial
                  </p>
                </div>

                {/* Botón Exámen Conjunto */}
                <button
                  className="w-full rounded-2xl border border-[#797979] bg-[#f4d7dd] px-6 py-4 text-[#333333] hover:bg-[#f0c5ce] transition-colors"
                  style={{ 
                    fontFamily: 'Comic Sans MS, Poppins, sans-serif',
                    fontWeight: 500,
                    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={() => onSelectExam?.('Exámen Conjunto')}
                >
                  Exámen Conjunto
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Motivational Panel */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl border border-[#797979] bg-white p-6 sticky top-8"
              style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              {/* Book Image */}
              <div className="mb-6 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760434201620-b1a6ae947351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFja2VkJTIwYm9va3MlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYzNzY2NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Torre de libros"
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Motivational Text */}
              <div className="space-y-4">
                <p 
                  className="text-[#333333] text-center leading-relaxed"
                  style={{ fontFamily: 'Comic Sans MS, Arial, sans-serif' }}
                >
                  Antes de empezar tu prueba, respira profundo y confía en todo lo que has aprendido.
                </p>
                <p 
                  className="text-[#333333] text-center leading-relaxed"
                  style={{ fontFamily: 'Comic Sans MS, Arial, sans-serif' }}
                >
                  No se trata de saberlo todo, sino de dar lo mejor de ti con calma y seguridad.
                </p>
              </div>

              {/* Decorative element */}
              <div className="mt-6 pt-6 border-t border-[#ececec]">
                <p 
                  className="text-[#006d6f] text-center italic"
                  style={{ fontFamily: 'Comic Sans MS, Arial, sans-serif', fontWeight: 600 }}
                >
                  ¡Tú puedes lograrlo! 💪
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}