import React from 'react'
import TestimoniosPage from '@/app/testimonios/page'

export default async function Page({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (locale === 'es') {
    return <TestimoniosPage locale={locale} />
  }

  return <TestimoniosPage locale={locale} />
}
