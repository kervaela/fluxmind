export function FluxOrb({ size = 80 }: { size?: number }) {
  return (
    <div
      className="relative rounded-full bg-gradient-to-br from-violet-glow to-mint-glow animate-pulseSlow shadow-lg shadow-violet-deep/40"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div
        className="absolute inset-2 rounded-full border border-white/20"
        style={{ boxShadow: "inset 0 0 24px rgba(255,255,255,0.15)" }}
      />
    </div>
  );
}
