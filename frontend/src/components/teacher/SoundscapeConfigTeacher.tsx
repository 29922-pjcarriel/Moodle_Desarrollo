import { Switch } from "../ui/switch";

interface Props {
  value: boolean;
  onChange: (val: boolean) => void;
}

export function SoundscapeConfigTeacher({ value, onChange }: Props) {
  return (
    <div
      className="bg-white rounded-2xl border border-[#797979] p-6"
      style={{ boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#333333] mb-1" style={{ fontWeight: 600 }}>
            Entorno Sonoro
          </h3>
          <p className="text-[#797979] text-sm">
            Activa esta opción si deseas que el estudiante tenga sonido en el examen.
          </p>
        </div>

        <Switch checked={value} onCheckedChange={onChange} />
      </div>
    </div>
  );
}
