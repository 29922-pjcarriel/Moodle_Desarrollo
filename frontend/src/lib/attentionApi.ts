// frontend/src/lib/attentionApi.ts

// 👉 Nuevo backend SOLO recibe frame_number + image_base64

export async function sendFrame({
  frameNumber,
  base64
}: {
  frameNumber: number;
  base64: string;
}) {
  try {
    const res = await fetch("http://localhost:8000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        frame_number: frameNumber,
        image_base64: base64,
      }),
    });

    if (!res.ok) {
      console.error("❌ Error backend:", await res.text());
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error en fetch:", err);
    return null;
  }
}
