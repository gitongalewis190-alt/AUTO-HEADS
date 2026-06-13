"use client";

import { useEffect, useRef } from "react";

// Canvas 2D glass crack lines + shard particle physics.
// Frames 91–150 per the animation spec in Section 7.
export function GlassBurst({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // TODO: Draw crack lines from centre, then simulate ~100 glass shards
    // scattering outward using basic particle physics (velocity, gravity, drag).
    // Call onComplete() when all shards leave the viewport.
    void canvasRef;
    void onComplete;
  }, [onComplete]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
