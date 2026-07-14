"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#050505] px-6 text-center">
      <h1 className="font-display text-lg tracking-wide text-white mb-2">Something went wrong</h1>
      <p className="font-body text-sm text-white/50 max-w-md mb-8 leading-relaxed">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "Please try again. If the problem continues, refresh the page."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="font-body text-[11px] tracking-[0.2em] uppercase px-6 py-3 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1] transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
