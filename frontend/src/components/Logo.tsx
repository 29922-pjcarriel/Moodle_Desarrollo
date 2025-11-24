import { Brain, Activity } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className={`${sizes[size]} rounded-full bg-[#006d6f] flex items-center justify-center`}>
          <Brain className="text-white w-2/3 h-2/3" />
        </div>
        <div className="absolute -bottom-1 -right-1">
          <Activity className="text-[#00bfbf] w-4 h-4" strokeWidth={3} />
        </div>
      </div>
      {showText && (
        <span className={`${textSizes[size]} tracking-tight text-[#006d6f]`} style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
          NeuroStudy
        </span>
      )}
    </div>
  );
}
