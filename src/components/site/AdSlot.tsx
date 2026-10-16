interface AdSlotProps {
  className?: string;
}

/**
 * AdSense placeholder. After approval, replace the inner markup with the real
 * unit code (ins.ad + push script) and keep the outer styling.
 */
export function AdSlot({ className = '' }: AdSlotProps) {
  return (
    <aside
      aria-hidden
      className={`card flex h-28 flex-col items-center justify-center border-dashed bg-surface/50 text-center md:h-32 ${className}`}
    >
      {/* AdSense slot — replace with unit code after approval */}
      <span className="text-xs font-semibold uppercase tracking-widest text-mist/70">Advertisement</span>
      <span className="mt-1 text-[10px] text-mist/40">AdSense slot — replace with unit code after approval</span>
    </aside>
  );
}
