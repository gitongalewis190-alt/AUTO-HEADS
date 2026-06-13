// Landing page — steering wheel animation + CTA buttons
// Animation sequence defined in Section 7 of the architecture spec.

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* TODO: <SteeringWheel /> — Three.js canvas */}
      {/* TODO: <GlassBurst /> — Canvas 2D crack + shard animation */}
      {/* TODO: <LogoReveal /> — Framer Motion logo entrance */}
      {/* TODO: <CTAButtons /> — staggered CTA fade-in */}

      {/* Placeholder visible during scaffold phase */}
      <div className="text-center space-y-6 z-10">
        <h1 className="text-display font-heading font-bold text-gradient">
          AUTO HEADS
        </h1>
        <p className="text-body-lg text-text-muted">Where automotive passion meets commerce</p>
        <div className="flex gap-4 justify-center">
          <a href="/register" className="px-8 py-3 bg-accent text-white font-heading font-semibold rounded-full hover:opacity-90 transition">
            Create Account
          </a>
          <a href="/login" className="px-8 py-3 glass text-white font-heading font-semibold rounded-full hover:opacity-90 transition">
            Login
          </a>
          <a href="/feed" className="px-8 py-3 text-text-muted font-heading font-semibold hover:text-white transition">
            View as Guest
          </a>
        </div>
      </div>
    </main>
  );
}
