import { useEffect, useRef, useState } from "react";
import { sendFrame } from "../lib/attentionApi";

export function useAttentionStream(active: boolean) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [result, setResult] = useState<any>(null);

  const frameNumberRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    let stream: MediaStream | null = null;
    let interval: any = null;

    async function startCamera() {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      interval = setInterval(async () => {
        if (!videoRef.current) return;

        const video = videoRef.current;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL("image/jpeg").split(",")[1];

        frameNumberRef.current += 1;

        const response = await sendFrame({
          frameNumber: frameNumberRef.current,
          base64,
        });

        if (response) setResult(response);
      }, 1000);
    }

    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      clearInterval(interval);
    };
  }, [active]);

  return { videoRef, result };
}
