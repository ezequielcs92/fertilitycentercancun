import { redirect } from 'next/navigation';

export default async function LocalizedAdminRedirect({
  params
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { slug } = await params;
  const target = slug && slug.length > 0 ? `/admin/${slug.join('/')}` : '/admin';
  redirect(target);
}
