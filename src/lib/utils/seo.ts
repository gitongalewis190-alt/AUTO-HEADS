import type { Metadata } from "next";
import { APP_NAME, APP_TAGLINE, APP_URL } from "./constants";

export function generateMetadata(options: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, image, noIndex } = options;
  const fullTitle = title ? `${title} | ${APP_NAME}` : `${APP_NAME} — ${APP_TAGLINE}`;
  const desc = description ?? APP_TAGLINE;
  const ogImage = image ?? `${APP_URL}/og-image.png`;

  return {
    title: fullTitle,
    description: desc,
    openGraph: {
      title: fullTitle,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      siteName: APP_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
