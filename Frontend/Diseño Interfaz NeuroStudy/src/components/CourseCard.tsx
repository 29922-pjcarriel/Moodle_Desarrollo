import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

interface CourseCardProps {
  title: string;
  code: string;
  imageUrl: string;
  onEnter: () => void;
}

export function CourseCard({ title, code, imageUrl, onEnter }: CourseCardProps) {
  return (
    <div 
      className="rounded-2xl border border-[#797979] overflow-hidden hover:scale-105 transition-transform duration-300"
      style={{ 
        background: 'linear-gradient(135deg, #b6dfe8 0%, #eafafb 100%)',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Course Image */}
      <div className="h-48 overflow-hidden bg-white">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Info */}
      <div className="p-6 bg-white">
        <h4 className="text-[#333333] mb-2" style={{ fontWeight: 600 }}>
          {title}
        </h4>
        <p className="text-sm text-[#797979] mb-4">
          Código: <span style={{ fontWeight: 500 }}>{code}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={onEnter}
            className="flex-1 rounded-full px-6 py-2.5 border-2 border-[#797979] bg-white hover:bg-[#006d6f] hover:text-white hover:border-[#006d6f] transition-all duration-300 flex items-center justify-center gap-2"
            style={{ fontWeight: 500 }}
          >
            Entrar curso
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}