"use client";

export function QRCodeDisplay() {
  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white/5 border border-white/10">
      <h3 className="text-sm font-semibold text-white/75">AUTO HEADS QR Code</h3>
      <img
        src="/assets/autoheads-qr-code.png"
        alt="Scan to visit AUTO HEADS"
        className="w-40 h-40 border-4 border-white/20 rounded"
      />
      <p className="text-xs text-white/45 text-center max-w-xs">
        Scan with your phone to visit the site. Use for print materials, events, or social media.
      </p>
      <a
        href="/assets/autoheads-qr-code.png"
        download="autoheads-qr-code.png"
        className="text-xs text-orange-400 hover:text-orange-300 font-semibold"
      >
        ↓ Download Full Size (468×468px)
      </a>
    </div>
  );
}
