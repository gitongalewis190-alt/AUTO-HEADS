"use client";

import { useEffect, useRef } from "react";

// Three.js steering wheel animation — draws itself via SVG path, then morphs to infinity symbol.
// Frames 1–60 per the animation spec in Section 7.
export function SteeringWheel({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // TODO: Initialize Three.js scene, load steering wheel geometry,
    // animate SVG path draw, morph to infinity symbol, call onComplete().
    void canvasRef;
    void onComplete;
  }, [onComplete]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
