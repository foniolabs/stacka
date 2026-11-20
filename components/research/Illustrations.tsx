/* Decorative, monochrome illustrations in the spirit of a blueprint / engineering-drawing language. */

/** Hero: lines converge to a narrow waist and fan out again. */
export function HourglassArt() {
  const W = 1000, H = 520;
  const lines: string[] = [];
  const N = 26;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const xt = W * (0.12 + 0.76 * t);
    const cx = W / 2 + (xt - W / 2) * 0.035;
    lines.push(`M${xt.toFixed(1)} 0 C${xt.toFixed(1)} ${H * 0.3} ${cx.toFixed(1)} ${H * 0.34} ${cx.toFixed(1)} ${H / 2}`);
    lines.push(`M${cx.toFixed(1)} ${H / 2} C${cx.toFixed(1)} ${H * 0.66} ${xt.toFixed(1)} ${H * 0.7} ${xt.toFixed(1)} ${H}`);
  }
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-50 md:opacity-100" fill="none" style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)", maskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)" }}>
      <g stroke="#111" strokeOpacity="0.22" strokeWidth="0.8">
        {lines.map((d, i) => <path key={i} d={d} />)}
      </g>
    </svg>
  );
}

type Variant = "diamond" | "circles" | "capsules";

/** Large dark illustrated panel used beside each audience block. */
export function IllusPanel({ variant }: { variant: Variant }) {
  return (
    <div className="m-illus" aria-hidden>
      <span className="m-plus" style={{ top: "6%", left: "6%" }} />
      <span className="m-plus" style={{ top: "6%", right: "6%" }} />
      <span className="m-plus" style={{ bottom: "6%", left: "6%" }} />
      <span className="m-plus" style={{ bottom: "6%", right: "6%" }} />
      <div className="m-illus-inner">
        {variant === "diamond" && (
          <>
            <div className="absolute inset-[16%] rounded-sm border border-white/25 bg-gradient-to-br from-white/20 to-white/5" />
            <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/60 bg-white/10" />
          </>
        )}
        {variant === "circles" && (
          <>
            <div className="absolute left-[22%] top-[30%] aspect-square w-[40%] rounded-full border border-white/50 bg-white/10" />
            <div className="absolute left-[38%] top-[34%] aspect-square w-[40%] rounded-full border border-white/50" />
          </>
        )}
        {variant === "capsules" && (
          <img src="/brand/stacka-symbol-dark.svg" alt="" className="absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
}

/** Small grid thumbnail used on the "foundations" cards. */
export function GridThumb({ shape, tone = "light" }: { shape: "square-circle" | "double-circle" | "circle"; tone?: "light" | "dark" }) {
  const stroke = tone === "light" ? "#111" : "#ecebe6";
  const grid = tone === "light" ? "rgba(17,17,17,0.12)" : "rgba(236,235,230,0.18)";
  return (
    <svg aria-hidden viewBox="0 0 120 120" className="mx-auto w-28 sm:w-32" fill="none">
      <defs>
        <pattern id={`g-${tone}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0V12" stroke={grid} strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect x="0.5" y="0.5" width="119" height="119" fill={`url(#g-${tone})`} stroke={grid} />
      {shape === "square-circle" && (<><rect x="38" y="38" width="44" height="44" stroke={stroke} strokeWidth="1.4" /><circle cx="60" cy="60" r="14" stroke={stroke} strokeWidth="1.4" /></>)}
      {shape === "double-circle" && (<><circle cx="60" cy="50" r="16" stroke={stroke} strokeWidth="1.4" /><circle cx="60" cy="62" r="16" stroke={stroke} strokeWidth="1.4" /></>)}
      {shape === "circle" && <circle cx="60" cy="60" r="20" stroke={stroke} strokeWidth="1.4" />}
    </svg>
  );
}
