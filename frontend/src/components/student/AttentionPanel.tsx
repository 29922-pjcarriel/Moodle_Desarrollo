// frontend/src/components/student/AttentionPanel.tsx

interface AttentionPanelProps {
  data: any;
}

export function AttentionPanel({ data }: AttentionPanelProps) {
  if (!data) return null;

  return (
    <div
      className="bg-white rounded-2xl border border-[#797979] p-5 mt-5"
      style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.1)" }}
    >
      <h3 className="text-[#006d6f] text-lg font-bold mb-4">
        Indicadores de Atención (Tiempo Real)
      </h3>

      <div className="grid grid-cols-2 gap-3 text-sm text-[#333] font-medium">

        <p><b>Rostro:</b> {data.face_detected ? "✔️ Detectado" : "❌ No detectado"}</p>
        <p><b>Atención:</b> {data.attention_level ?? "—"}</p>

        <p><b>Score:</b> {data.attention_score?.toFixed(3) ?? "—"}</p>
        <p><b>Concentración:</b> {data.is_concentrated ? "✔️ Sí" : "❌ No"}</p>

        <p><b>EAR:</b> {data.ear?.toFixed(3) ?? "—"}</p>
        <p><b>PERCLOS:</b> {data.perclos?.toFixed(3) ?? "—"}</p>

        <p><b>Parpadeos/min:</b> {data.blinks_per_minute ?? "—"}</p>
        <p><b>MAR:</b> {data.mar?.toFixed(3) ?? "—"}</p>

        <p><b>Yaw:</b> {data.head_yaw?.toFixed(2) ?? "—"}</p>
        <p><b>Pitch:</b> {data.head_pitch?.toFixed(2) ?? "—"}</p>

        <p><b>Mirada:</b> {data.gaze_focus ?? "—"}</p>
        <p><b>Disp. Mirada:</b> {data.gaze_dispersion?.toFixed(3) ?? "—"}</p>

      </div>
    </div>
  );
}
