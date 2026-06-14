import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ElevenLabs voice options — set ELEVENLABS_VOICE_ID in Vercel to override:
//   Bella   — EXAVITQu4vr4xnSDxMaL  (warm, friendly female — default bot voice)
//   Rachel  — 21m00Tcm4TlvDq8ikWAM  (young female, American)
//   Adam    — pNInz6obpgDQGcFmaJgB  (deep male)
//   Arnold  — VR6AewLTigWG4xSOukaG  (crisp, authoritative male)
const DEFAULT_VOICE = "EXAVITQu4vr4xnSDxMaL"; // Bella — warm, friendly female

export async function GET(req: NextRequest) {
  const text    = req.nextUrl.searchParams.get("text") ?? "Let's get started.";
  const apiKey  = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_VOICE;

  if (!apiKey) {
    // Client will fall back to Web Speech API
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
        // eleven_multilingual_v2 supports style + use_speaker_boost
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
      // CDN-cached 24 h — same phrase = same audio, no repeat API calls
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
