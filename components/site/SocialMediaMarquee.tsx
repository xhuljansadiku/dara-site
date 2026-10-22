import Image from "next/image";
import { SOCIAL_MEDIA_BOARDS } from "@/lib/projects";

const HALF = Math.ceil(SOCIAL_MEDIA_BOARDS.length / 2);
const ROWS = [SOCIAL_MEDIA_BOARDS.slice(0, HALF), SOCIAL_MEDIA_BOARDS.slice(HALF)];

/** Two rows of social media mockups drifting in opposite directions (paused on hover); clicking one opens it. */
export default function SocialMediaMarquee({ onOpen }: { onOpen: (img: string) => void }) {
  return (
    <div className="space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] md:space-y-5">
      {ROWS.map((row, r) => (
        <div key={r} className="work-marquee-row">
          {/* Two copies plus a trailing gap, so shifting by -50% loops without a jump. */}
          <div className={`work-marquee flex w-max gap-4 pr-4 md:gap-5 md:pr-5 ${r % 2 ? "work-marquee-reverse" : ""}`}>
            {[0, 1].map((copy) =>
              row.map((board) => (
                <button
                  key={`${copy}-${board.img}`}
                  type="button"
                  onClick={() => onOpen(board.img)}
                  aria-hidden={copy === 1 || undefined}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="group relative aspect-video w-[17rem] shrink-0 overflow-hidden rounded-xl bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B89D5E] md:w-[24rem]"
                >
                  <Image src={board.img} alt="" fill sizes="(max-width: 768px) 17rem, 24rem" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-8 text-left text-sm font-semibold text-white transition group-hover:translate-y-0 group-focus-visible:translate-y-0">
                    {board.name}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
