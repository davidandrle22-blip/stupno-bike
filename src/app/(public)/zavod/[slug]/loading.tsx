export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-primary animate-spin" />
        <span className="text-white/30 text-xs uppercase tracking-widest">Načítání</span>
      </div>
    </div>
  );
}
