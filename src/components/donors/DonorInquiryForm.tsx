'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Turnstile } from '@marsidev/react-turnstile'
import { useLocale, useTranslations } from 'next-intl'
import { submitLead, type LeadFormData } from '@/lib/actions/leads'
import { readUtmParams } from '@/lib/utm'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import type { DonorType } from '@/lib/donors/types'
import { useIsHydrated } from './useDonorSelection'

/**
 * Formulario de consulta por uno o varios donantes.
 *
 * Reutiliza `submitLead`, la misma acción que el formulario de contacto: así la
 * consulta entra en Supabase y en Upnify por el mismo camino que el resto de
 * leads, y no hay una segunda integración que mantener.
 *
 * El tipo de donante viaja al servidor porque de él depende a qué buzón de
 * AltraVita se manda la copia. La dirección se resuelve allí: aquí solo se dice
 * si son óvulos o esperma.
 */

/**
 * Tratamiento con el que entra la consulta en el CRM.
 *
 * Son literalmente las etiquetas que ya usa el selector del formulario de
 * contacto. Inventar una nueva dejaría el campo sin coincidencia en la lista de
 * Upnify y el dato se perdería.
 */
const TREATMENT_BY_TYPE: Record<DonorType, string> = {
    egg: 'Ovodón',
    sperm: 'Programa de Donación LifeStart',
}

interface DonorInquiryFormProps {
    donorType: DonorType
    donorIds: string[]
}

export default function DonorInquiryForm({ donorType, donorIds }: DonorInquiryFormProps) {
    const t = useTranslations('Donors.form')
    const tCard = useTranslations('Donors.card')
    const tContact = useTranslations('ContactForm')
    const locale = useLocale()
    const isEs = locale === 'es'

    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    const isTurnstileTestKey = turnstileSiteKey === '1x00000000000000000000AA'
    const isProduction = process.env.NODE_ENV === 'production'
    const isCaptchaEnabled = Boolean(turnstileSiteKey && !isTurnstileTestKey)

    // Turnstile inyecta un iframe, así que no puede pintarse en el HTML del
    // servidor: se espera a que hidrate.
    const isMounted = useIsHydrated()
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [submitMessage, setSubmitMessage] = useState('')
    const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        pais: '',
        mensaje: '',
    })

    const isMultiple = donorIds.length > 1

    const validate = (): boolean => {
        const next: Partial<Record<keyof LeadFormData, string>> = {}

        if (!formData.nombre.trim()) next.nombre = tContact('errors.name_required')

        if (!formData.email.trim()) {
            next.email = tContact('errors.email_required')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            next.email = tContact('errors.email_invalid')
        }

        if (!formData.telefono.trim()) next.telefono = tContact('errors.phone_required')
        if (!formData.pais) next.pais = tContact('errors.country_required')

        setErrors(next)
        return Object.keys(next).length === 0
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setSubmitStatus('idle')
        setSubmitMessage('')

        if (!validate()) return

        // En producción sin Turnstile configurado el servidor rechaza el envío;
        // se avisa aquí para no hacer perder el formulario relleno.
        if (isProduction && !isCaptchaEnabled) {
            setSubmitStatus('error')
            setSubmitMessage(
                isEs
                    ? 'El sistema anti-spam no está configurado. Intente más tarde.'
                    : 'The anti-spam system is not configured. Please try again later.',
            )
            return
        }

        if (isCaptchaEnabled && !captchaToken) {
            setSubmitStatus('error')
            setSubmitMessage(tContact('errors.captcha_required'))
            return
        }

        setIsLoading(true)

        // El número de donante se repite en el mensaje además de ir en su campo:
        // el comercial lee el cuerpo del correo, y así lo tiene delante sin
        // tener que cruzarlo con la tabla de arriba.
        const donorLine = isEs
            ? `Consulta desde el catálogo de donantes de ${donorType === 'egg' ? 'óvulos' : 'esperma'}. Donante(s): ${donorIds.join(', ')}.`
            : `Inquiry from the ${donorType === 'egg' ? 'egg' : 'sperm'} donor catalog. Donor(s): ${donorIds.join(', ')}.`

        try {
            const result = await submitLead({
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                pais: formData.pais,
                tratamiento: TREATMENT_BY_TYPE[donorType],
                mensaje: [donorLine, formData.mensaje.trim()].filter(Boolean).join('\n\n'),
                donorType,
                donorIds,
                utm: readUtmParams(),
                locale: isEs ? 'es' : 'en',
                captchaToken,
            })

            if (result.success) {
                setSubmitStatus('success')
                setSubmitMessage(t('success'))
                setFormData({ nombre: '', email: '', telefono: '', pais: '', mensaje: '' })
                setErrors({})
                setCaptchaToken(null)
            } else {
                console.error('[catalogo-donantes] la consulta no se registro:', result.error || result.message)
                setSubmitStatus('error')
                setSubmitMessage(result.message)
            }
        } catch (error) {
            console.error('[catalogo-donantes] fallo la accion del servidor:', error)
            setSubmitStatus('error')
            setSubmitMessage(tContact('errors.connection_error'))
        } finally {
            setIsLoading(false)
        }
    }

    const change = (field: keyof typeof formData, value: string) => {
        setFormData((previous) => ({ ...previous, [field]: value }))
        if (errors[field as keyof LeadFormData]) {
            setErrors((previous) => ({ ...previous, [field]: undefined }))
        }
    }

    const labelClassName = 'block text-xs font-bold text-brand-violet mb-2 uppercase tracking-wider'

    return (
        <div className="not-prose bg-white rounded-[2.5rem] border border-brand-violet/10 shadow-[0_8px_60px_-10px_rgba(109,40,217,0.25)] p-8 md:p-10">
            <h2 className="text-3xl font-serif text-brand-violet mb-3">
                {isMultiple ? t('title_multiple') : t('title')}
            </h2>
            <p className="text-slate-500 font-light mb-6">{t('description')}</p>

            <div className="mb-8 rounded-2xl bg-brand-green/10 border border-brand-green/30 px-5 py-4">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-violet/60 mb-1">
                    {isMultiple ? t('selected_label_multiple') : t('selected_label')}
                </span>
                <span className="text-brand-violet font-bold">
                    {donorIds.map((id) => tCard('donor_short', { id })).join(' · ')}
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                    {submitStatus !== 'idle' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`rounded-2xl p-5 flex items-start gap-3 ${
                                submitStatus === 'success'
                                    ? 'bg-brand-green/10 border-2 border-brand-green/30'
                                    : 'bg-red-50 border-2 border-red-200'
                            }`}
                        >
                            {submitStatus === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            )}
                            <p className={`font-medium ${submitStatus === 'success' ? 'text-brand-violet' : 'text-red-800'}`}>
                                {submitMessage}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="donor-nombre" className={labelClassName}>
                            {tContact('name_label')} *
                        </label>
                        <Input
                            id="donor-nombre"
                            type="text"
                            placeholder={tContact('name_placeholder')}
                            value={formData.nombre}
                            onChange={(event) => change('nombre', event.target.value)}
                            error={errors.nombre}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="donor-email" className={labelClassName}>
                            {tContact('email_label')} *
                        </label>
                        <Input
                            id="donor-email"
                            type="email"
                            placeholder={tContact('email_placeholder')}
                            value={formData.email}
                            onChange={(event) => change('email', event.target.value)}
                            error={errors.email}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="donor-telefono" className={labelClassName}>
                            {tContact('phone_label')} *
                        </label>
                        <Input
                            id="donor-telefono"
                            type="tel"
                            placeholder={tContact('phone_placeholder')}
                            value={formData.telefono}
                            onChange={(event) => change('telefono', event.target.value)}
                            error={errors.telefono}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="donor-pais" className={labelClassName}>
                            {tContact('country_label')} *
                        </label>
                        <Select
                            id="donor-pais"
                            value={formData.pais}
                            onChange={(event) => change('pais', event.target.value)}
                            error={errors.pais}
                            disabled={isLoading}
                        >
                            <option value="">{tContact('country_placeholder')}</option>
                            <option value={isEs ? 'Estados Unidos' : 'United States'}>{tContact('countries.usa')}</option>
                            <option value={isEs ? 'Canadá' : 'Canada'}>{tContact('countries.canada')}</option>
                            <option value={isEs ? 'México' : 'Mexico'}>{tContact('countries.mexico')}</option>
                            <option value="Argentina">{tContact('countries.argentina')}</option>
                            <option value={isEs ? 'Otro' : 'Other'}>{tContact('countries.other')}</option>
                        </Select>
                    </div>
                </div>

                <div>
                    <label htmlFor="donor-mensaje" className={labelClassName}>
                        {tContact('message_label')}
                    </label>
                    <textarea
                        id="donor-mensaje"
                        rows={4}
                        placeholder={tContact('message_placeholder')}
                        value={formData.mensaje}
                        onChange={(event) => change('mensaje', event.target.value)}
                        disabled={isLoading}
                        className="flex w-full bg-slate-50 rounded-2xl px-6 py-4 text-base transition-all placeholder:text-slate-400 placeholder:font-light focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                </div>

                <div className="flex justify-center min-h-[65px]">
                    {isMounted && isCaptchaEnabled && (
                        <Turnstile
                            siteKey={turnstileSiteKey!}
                            options={{ appearance: 'always', theme: 'light' }}
                            onSuccess={(token) => setCaptchaToken(token)}
                            onExpire={() => setCaptchaToken(null)}
                            onError={() => setCaptchaToken(null)}
                        />
                    )}
                </div>

                <div className="flex justify-center">
                    <Button type="submit" variant="primary" isLoading={isLoading} className="w-full md:w-auto min-w-[280px]">
                        {!isLoading && <Send className="w-5 h-5" />}
                        {t('submit')}
                    </Button>
                </div>

                <p className="text-center text-slate-400 font-light text-sm">{tContact('privacy_note')}</p>
            </form>
        </div>
    )
}
