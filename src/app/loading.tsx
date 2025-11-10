export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#021512] text-accent-200">
      <div className="flex flex-col items-center gap-3">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-accent-200/40 border-t-brand-aqua" aria-hidden />
        <p className="text-sm font-medium text-accent-200/80">Učitavanje sadržaja…</p>
      </div>
    </div>
  );
}
