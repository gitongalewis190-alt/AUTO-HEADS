"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <h1 className="text-h1 font-heading font-bold text-error">Something went wrong</h1>
      <p className="text-text-muted">{error.message}</p>
      <button onClick={reset} className="px-6 py-2 bg-accent text-white rounded-full">
        Try again
      </button>
    </div>
  );
}
