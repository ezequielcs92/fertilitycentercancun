import React from 'react'
import TestimoniosPage from '@/app/testimonios/page'
import TestimonialsPage from '@/app/testimonials/page'

export default async function Page({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (locale === 'en') {
    return <TestimonialsPage />
  }

  return <TestimoniosPage locale={locale} />
}
