import { redirect } from 'next/navigation';

export default async function LocalizedLoginRedirect() {
  redirect('/login');
}
