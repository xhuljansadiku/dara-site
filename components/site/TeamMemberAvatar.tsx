import Image from "next/image";

/** Logo / brand gold (same family as site accents) */
const GOLD = {
  from: "#e8d5b0",
  via: "#B89D5E",
  to: "#8a7344",
} as const;

type Props = {
  name: string;
  /** Unsplash or uploaded profile URL */
  img?: string;
  /** Shown when there is no photo (e.g. "ST") */
  initials?: string;
  variant: "circle" | "card";
  /** For Next/Image fill in circle */
  sizes?: string;
  /** CSS object-position (portrait crop tuning per person) */
  photoObjectPosition?: string;
  /** Editorial B&W to unify with other portraits (only when `img` is set) */
  photoGrayscale?: boolean;
  /** Zoom (>1) so wider shots match tighter portraits */
  photoScale?: number;
};

function imageClassNames(opts: { variant: "circle" | "card"; grayscale?: boolean; disableHoverZoom?: boolean }) {
  const { variant, grayscale, disableHoverZoom } = opts;
  return [
    "object-cover transition duration-300",
    variant === "card" && !disableHoverZoom ? "group-hover:scale-105" : "",
    grayscale ? "grayscale contrast-[1.06] brightness-[1.03]" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Profile image or initials monogram on logo-gold gradient (no stock photo).
 */
export default function TeamMemberAvatar({
  name,
  img,
  initials,
  variant,
  sizes,
  photoObjectPosition,
  photoGrayscale,
  photoScale,
}: Props) {
  const zoom = photoScale && photoScale > 1 ? photoScale : undefined;
  const imgStyle =
    photoObjectPosition || zoom
      ? {
          ...(photoObjectPosition ? { objectPosition: photoObjectPosition } : {}),
          ...(zoom
            ? {
                transform: `scale(${zoom})`,
                /* Match object-position so zoom stays centered on the same focal point */
                transformOrigin: photoObjectPosition ?? "center 42%",
              }
            : {}),
        }
      : undefined;
  const gray = !!photoGrayscale;
  const disableHoverZoom = !!zoom;

  if (img) {
    if (variant === "circle") {
      return (
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={img}
            alt=""
            fill
            sizes={sizes ?? "96px"}
            className={imageClassNames({ variant: "circle", grayscale: gray, disableHoverZoom })}
            style={imgStyle}
          />
        </div>
      );
    }
    return (
      <Image
        src={img}
        alt={name}
        fill
        sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className={imageClassNames({ variant: "card", grayscale: gray, disableHoverZoom })}
        style={imgStyle}
      />
    );
  }

  const monogram = initials?.trim() || name.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 2).toUpperCase();

  if (variant === "circle") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
        style={{
          background: `linear-gradient(145deg, ${GOLD.from} 0%, ${GOLD.via} 45%, ${GOLD.to} 100%)`,
        }}
        aria-hidden
      >
        <span className="font-display text-[1.05rem] font-bold tracking-[0.14em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          {monogram}
        </span>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition duration-300 group-hover:brightness-105"
      style={{
        background: `linear-gradient(155deg, ${GOLD.from} 0%, ${GOLD.via} 42%, ${GOLD.to} 100%)`,
      }}
      aria-hidden
    >
      <span className="font-display text-5xl font-bold tracking-[0.18em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] md:text-6xl">
        {monogram}
      </span>
    </div>
  );
}
