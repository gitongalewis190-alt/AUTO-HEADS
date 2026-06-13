"use client";

// Supporters strip + platform tagline
export function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 py-8 px-6">
      <p className="text-center text-text-muted text-body-sm mb-4">Our Supporters</p>
      {/* TODO: Render supporters from Firestore /supporters collection */}
      <div className="flex justify-center gap-8 flex-wrap mb-6">
        <span className="text-text-muted text-caption">[Supporters will appear here]</span>
      </div>
      <p className="text-center text-text-muted text-caption">
        AUTO HEADS — Where automotive passion meets commerce
      </p>
    </footer>
  );
}
