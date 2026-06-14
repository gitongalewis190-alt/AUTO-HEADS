import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_VOICE = "EXAVITQu4vr4xnSDxMaL"; // Bella — warm, friendly female

export async function GET(req: NextRequest) {
  const text    = req.nextUrl.searchParams.get("text") ?? "Hello.";
  const apiKey  = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_VOICE;

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
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability:         0.62,
          similarity_boost:  0.75,
          style:             0.30,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!upstream.ok) {
    return new NextResponse("Upstream TTS error", { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type":  "audio/mpeg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
