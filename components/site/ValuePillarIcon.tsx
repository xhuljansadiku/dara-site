/**
 * Decorative icons for the homepage value pillars (gold gradient, soft glow on card hover).
 */
export default function ValuePillarIcon({ index }: { index: number }) {
  const gid = `vp-g-${index}`;

  const gradientDef = (
    <defs>
      <linearGradient id={gid} x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#c9b07a" />
        <stop offset="50%" stopColor="#B89D5E" />
        <stop offset="100%" stopColor="#8a7344" />
      </linearGradient>
    </defs>
  );

  const icons = [
    // 0 Creativity: layered art boards + brush stroke
    <svg key="c" viewBox="0 0 24 24" className="h-11 w-11" aria-hidden>
      {gradientDef}
      <path
        fill={`url(#${gid})`}
        d="M4 6.5a2 2 0 012-2h7l1 2H6a1 1 0 00-1 1V17a2 2 0 002 2h8a2 2 0 002-2v-6.5l2 1V17a4 4 0 01-4 4H7a4 4 0 01-4-4V6.5z"
        opacity="0.92"
      />
      <path
        fill={`url(#${gid})`}
        d="M13.5 4.5l4 2.5v3l-4-2.5v-3z"
        opacity="0.65"
      />
      <circle cx="8.5" cy="11" r="1.2" fill="#fffdf8" opacity="0.9" />
      <circle cx="11" cy="12.5" r="0.9" fill="#fffdf8" opacity="0.75" />
      <path
        stroke={`url(#${gid})`}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        d="M15 14.5c2 0 3.5 1.2 4 2.5"
        opacity="0.85"
      />
    </svg>,
    // 1 Unique: gem + sparkles
    <svg key="u" viewBox="0 0 24 24" className="h-11 w-11" aria-hidden>
      {gradientDef}
      <path
        fill={`url(#${gid})`}
        d="M12 3l2.2 3.2h3.8L21 10l-9 11-9-11 2.8-3.8h3.9L12 3z"
        opacity="0.95"
      />
      <path fill="#fffdf8" opacity="0.35" d="M12 6.5l-1.2 1.8h2.4L12 6.5z" />
      <path
        fill={`url(#${gid})`}
        d="M5 4l.6 1.2L7 5.5 5.8 6.5 5 7.8 4.2 6.5 3 5.5l1.4-.3L5 4zm14 2l.8 1.4 1.6.2-1.3 1 .4 1.6-1.5-.7-1.5.7.4-1.6-1.3-1 1.6-.2.8-1.4z"
        opacity="0.9"
      />
    </svg>,
    // 2 Innovation: lightning bolt (heroicons-style)
    <svg key="i" viewBox="0 0 24 24" className="h-11 w-11" aria-hidden>
      {gradientDef}
      <path fill={`url(#${gid})`} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    // 3 Results: bars + trend
    <svg key="r" viewBox="0 0 24 24" className="h-11 w-11" aria-hidden>
      {gradientDef}
      <path
        fill={`url(#${gid})`}
        d="M5 20V11h3v9H5zm5 0V8h3v12h-3zm5 0V14h3v6h-3z"
        opacity="0.88"
      />
      <path
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12.5c3-3 6-1 10-4 3.5-2.5 6-1 7 0"
        opacity="0.95"
      />
      <path fill={`url(#${gid})`} d="M19.5 6.5l1.5 2h-3l1.5-2z" />
    </svg>,
  ];

  return (
    <div className="relative flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center">
      {/* Ambient glow (intensifies on card hover) */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-[#B89D5E]/25 via-[#B89D5E]/10 to-transparent opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg"
        aria-hidden
      />
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 bg-gradient-to-br from-white via-[#faf8f5] to-[#f0ebe3] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_-8px_rgba(184,157,94,0.35)] ring-1 ring-[#B89D5E]/25 transition-all duration-500 group-hover:scale-[1.06] group-hover:ring-[#B89D5E]/50 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_32px_-6px_rgba(184,157,94,0.45)]"
      >
        <span className="transition duration-500 group-hover:[filter:drop-shadow(0_4px_12px_rgba(184,157,94,0.55))]">
          {icons[index] ?? icons[0]}
        </span>
      </div>
    </div>
  );
}
