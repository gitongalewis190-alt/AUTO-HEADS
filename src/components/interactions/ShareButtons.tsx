"use client";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  return (
    <div className="flex gap-3">
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`} target="_blank" rel="noreferrer" className="text-secondary text-caption hover:underline">Twitter</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noreferrer" className="text-secondary text-caption hover:underline">Facebook</a>
      <a href={`https://wa.me/?text=${text}%20${encoded}`} target="_blank" rel="noreferrer" className="text-secondary text-caption hover:underline">WhatsApp</a>
    </div>
  );
}
