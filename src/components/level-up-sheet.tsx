"use client";

import { Sheet } from "./sheet";

interface ISpeciesLite {
  name: string;
  emoji: string;
  trait?: string;
  evolutionLine?: string;
}

interface IProps {
  open: boolean;
  onClose: () => void;
  species: ISpeciesLite | null;
}

const SPARKLES = ["✨", "⭐", "✨", "⭐", "✨", "⭐", "✨"];

export const LevelUpSheet = ({ open, onClose, species }: IProps) => {
  if (!species) return null;

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-6 pb-8 pt-2">
        <div className="relative mx-auto mt-2 flex h-32 w-32 items-center justify-center">
          {SPARKLES.map((s, i) => {
            const angle = (i / SPARKLES.length) * Math.PI * 2;
            const radius = 46 + (i % 2) * 8;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const delay = i * 90;
            return (
              <span
                key={i}
                className="absolute select-none text-lg animate-sparkle-rise"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  animationDelay: `${delay}ms`,
                  color: "var(--ui-amber)",
                  ["--i" as string]: i,
                }}
                aria-hidden
              >
                {s}
              </span>
            );
          })}
          <span className="relative z-10 text-7xl animate-virtue-pop" aria-hidden>
            {species.emoji}
          </span>
        </div>

        <p
          className="mt-2 text-center text-xs font-medium tracking-wider"
          style={{ color: "var(--brand)" }}
        >
          환생종 진화!
        </p>
        <h3 className="mt-1 text-center text-2xl font-bold">{species.name}</h3>
        {species.trait ? (
          <p className="mt-1 text-center text-xs text-muted-foreground">{species.trait}</p>
        ) : null}

        {species.evolutionLine ? (
          <p className="mt-5 text-center text-sm leading-relaxed text-foreground/85">
            {species.evolutionLine}
          </p>
        ) : null}

        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-2xl py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
          style={{ background: "var(--brand)" }}
        >
          계속
        </button>
      </div>
    </Sheet>
  );
};
