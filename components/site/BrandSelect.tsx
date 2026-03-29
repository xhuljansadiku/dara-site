"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  className?: string;
  id?: string;
};

/**
 * Custom dropdown (no native `<select>`) so the open list uses brand neutrals/gold instead of OS blue.
 */
export default function BrandSelect({ value, onChange, options, placeholder, className = "", id }: Props) {
  const autoId = useId();
  const listId = `${autoId}-list`;
  const btnId = id ?? `${autoId}-btn`;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const label = selected?.label ?? "";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        id={btnId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-full items-center justify-between rounded-2xl border border-neutral-200/90 bg-white px-4 pr-11 text-left text-[15px] text-neutral-950 shadow-sm outline-none ring-0 transition-[border-color,box-shadow] focus:border-[#B89D5E]/60 focus:shadow-[0_0_0_3px_rgba(184,157,94,0.15)]"
      >
        <span className={label ? "text-neutral-950" : "text-neutral-400"}>{label || placeholder}</span>
        <span
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-auto rounded-2xl border border-neutral-200/90 bg-white py-1.5 shadow-lg ring-1 ring-black/[0.06]"
        >
          <li role="presentation" className="px-1">
            <button
              type="button"
              role="option"
              aria-selected={value === ""}
              className="flex w-full rounded-xl px-3 py-2.5 text-left text-[15px] text-neutral-500 hover:bg-neutral-50"
              onClick={() => {
                onChange("");
                close();
              }}
            >
              {placeholder}
            </button>
          </li>
          {options.map((o) => (
            <li key={o.value} role="presentation" className="px-1">
              <button
                type="button"
                role="option"
                aria-selected={value === o.value}
                className={`flex w-full rounded-xl px-3 py-2.5 text-left text-[15px] transition-colors ${
                  value === o.value
                    ? "bg-[#B89D5E]/15 font-medium text-neutral-950 ring-1 ring-[#B89D5E]/25"
                    : "text-neutral-800 hover:bg-[#B89D5E]/10"
                }`}
                onClick={() => {
                  onChange(o.value);
                  close();
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
