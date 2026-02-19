"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { defaultLocale } from "@/i18n";

type Props = {
  href: string; // p.sh. "/", "/contact", "/services"
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export default function LocaleLink({ href, className, children, onClick }: Props) {
  const params = useParams();
  const locale = String(params?.locale ?? defaultLocale);

  const normalized = href.startsWith("/") ? href : `/${href}`;
  const finalHref = normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;

  return (
    <Link href={finalHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
