import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ElevenLabs voice IDs for deep male voices:
//   Adam   — pNInz6obpgDQGcFmaJgB  (deep, well-rounded — default)
//   Arnold — VR6AewLTigWG4xSOukaG  (crisp, authoritative)
//   Brian  — nPczCjzI2devNBz1zQrb  (formal, deep)
const DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Adam

export async function GET(req: NextRequest) {
  const text     = req.nextUrl.searchParams.get("text") ?? "Let's get started.";
  const apiKey   = process.env.ELEVENLABS_API_KEY;
  const voiceId  = process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_VOICE_ID;

  // If no key is configured, return 503 so the client falls back to Web Speech API.
  if (!apiKey) {
    return new NextResponse("TTS not configured", { status: 503 });
  }

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key":   apiKey,
        "Content-Type": "application/json",
        Accept:         "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: { stability: 0.55, similarity_boost: 0.75 },
      }),
    }
  );

  if (!upstream.ok) {
    return new NextResponse("Upstream TTS error", { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type":  "audio/mpeg",
      // Cache 24 h on CDN — same phrase is always the same audio
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
