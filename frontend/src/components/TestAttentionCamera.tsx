import { useEffect, useRef, useState } from "react";
import { sendFrame } from "../lib/attentionApi";

export function TestAttentionCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function initCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
    initCamera();
  }, []);

  async function captureFrame() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL("image/jpeg").split(",")[1];

    const response = await sendFrame({
      frameNumber: 1,
      base64,
    });

    console.log("Respuesta:", response);
    setResult(response);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Prueba de API / Atención</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "300px", border: "2px solid white" }}
      />

      <button onClick={captureFrame} style={{ marginTop: 20, padding: 10 }}>
        Capturar y Enviar
      </button>

      {result && (
        <pre style={{ marginTop: 20, background: "#222", padding: 10 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
