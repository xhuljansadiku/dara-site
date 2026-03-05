// app/[locale]/team/page.tsx
// TODO: Faqja e ekipit shtohet më vonë. Për tani ridrejtojmë te Rreth nesh.
import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/about`);
}
