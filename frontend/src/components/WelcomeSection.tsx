interface WelcomeSectionProps {
  username: string;
}

export function WelcomeSection({ username }: WelcomeSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-[#333333]" style={{ fontWeight: 600 }}>
        Bienvenido {username}
      </h1>
      <p className="text-[#333333] opacity-80 mt-2">
        Selecciona un curso para comenzar tu aprendizaje
      </p>
    </div>
  );
}
