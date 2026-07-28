'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Turnstile } from '@marsidev/react-turnstile'
import { useTranslations } from 'next-intl'
import { submitLead, type LeadFormData } from '@/lib/actions/leads'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

interface ContactFormProps {
    compact?: boolean
}

export default function ContactForm({ compact = false }: ContactFormProps) {
    const t = useTranslations('ContactForm')
    const labelClassName = compact
        ? 'block text-xs font-bold text-brand-violet mb-1 uppercase tracking-wider'
        : 'block text-sm font-bold text-brand-violet mb-2 uppercase tracking-wider'
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    const isTurnstileTestKey = turnstileSiteKey === '1x00000000000000000000AA'
    const isProduction = process.env.NODE_ENV === 'production'
    const isCaptchaEnabled = Boolean(turnstileSiteKey && !isTurnstileTestKey)
    const [isMounted, setIsMounted] = useState(false)
    const [formData, setFormData] = useState<LeadFormData>({
        nombre: '',
        email: '',
        telefono: '',
        pais: '',
        tratamiento: '',
        mensaje: ''
    })

    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [submitMessage, setSubmitMessage] = useState('')

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Validación del lado del cliente
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof LeadFormData, string>> = {}

        if (!formData.nombre.trim()) {
            newErrors.nombre = t('errors.name_required')
        }

        if (!formData.email.trim()) {
            newErrors.email = t('errors.email_required')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('errors.email_invalid')
        }

        if (!formData.telefono.trim()) {
            newErrors.telefono = t('errors.phone_required')
        }

        if (!formData.pais) {
            newErrors.pais = t('errors.country_required')
        }

        if (!formData.tratamiento) {
            newErrors.tratamiento = t('errors.treatment_required')
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Limpiar estados previos
        setSubmitStatus('idle')
        setSubmitMessage('')

        if (!validateForm()) {
            return
        }

        if (isProduction && !isCaptchaEnabled) {
            setSubmitStatus('error')
            setSubmitMessage('El sistema anti-spam no está configurado. Intente más tarde.')
            return
        }

        if (isCaptchaEnabled && !captchaToken) {
            setSubmitStatus('error')
            setSubmitMessage(t('errors.captcha_required'))
            return
        }

        setIsLoading(true)

        try {
            const result = await submitLead({ ...formData, captchaToken })

            if (result.success) {
                setSubmitStatus('success')
                setSubmitMessage(result.message) // This might need translate if backend returns Spanish only
                // Limpiar formulario
                setFormData({
                    nombre: '',
                    email: '',
                    telefono: '',
                    pais: '',
                    tratamiento: '',
                    mensaje: ''
                })
                setErrors({})
                setCaptchaToken(null)
            } else {
                setSubmitStatus('error')
                setSubmitMessage(result.message)
            }
        } catch (error) {
            setSubmitStatus('error')
            setSubmitMessage(t('errors.connection_error'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (
        field: keyof LeadFormData,
        value: string
    ) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Limpiar error del campo al escribir
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-6'}>
                <div className={`bg-white shadow-[0_8px_60px_-10px_rgba(109,40,217,0.25)] border border-brand-violet/10 ${compact ? 'rounded-3xl p-6 md:p-8' : 'rounded-[3rem] p-8 md:p-12'}`}>

                    {/* Mensaje de Estado */}
                    <AnimatePresence mode="wait">
                        {submitStatus !== 'idle' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className={`rounded-2xl p-6 flex items-start gap-4 ${submitStatus === 'success'
                                    ? 'bg-brand-green/10 border-2 border-brand-green/30'
                                    : 'bg-red-50 border-2 border-red-200'
                                    }`}
                            >
                                {submitStatus === 'success' ? (
                                    <CheckCircle2 className="w-6 h-6 text-brand-violet flex-shrink-0 mt-0.5" />
                                ) : (
                                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1">
                                    <p className={`font-medium ${submitStatus === 'success' ? 'text-brand-violet' : 'text-red-800'
                                        }`}>
                                        {submitMessage}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={`grid grid-cols-1 ${compact ? 'gap-3' : 'gap-6'}`}>
                        {/* Nombre Completo */}
                        <div>
                            <label htmlFor="nombre" className={labelClassName}>
                                {t('name_label')} *
                            </label>
                            <Input
                                id="nombre"
                                type="text"
                                placeholder={t('name_placeholder')}
                                value={formData.nombre}
                                onChange={(e) => handleChange('nombre', e.target.value)}
                                error={errors.nombre}
                                disabled={isLoading}
                                className={compact ? 'h-10 rounded-xl px-4 py-2 text-sm' : undefined}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className={labelClassName}>
                                {t('email_label')} *
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t('email_placeholder')}
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                error={errors.email}
                                disabled={isLoading}
                                className={compact ? 'h-10 rounded-xl px-4 py-2 text-sm' : undefined}
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label htmlFor="telefono" className={labelClassName}>
                                {t('phone_label')} *
                            </label>
                            <Input
                                id="telefono"
                                type="tel"
                                placeholder={t('phone_placeholder')}
                                value={formData.telefono}
                                onChange={(e) => handleChange('telefono', e.target.value)}
                                error={errors.telefono}
                                disabled={isLoading}
                                className={compact ? 'h-10 rounded-xl px-4 py-2 text-sm' : undefined}
                            />
                        </div>

                        {/* País */}
                        <div>
                            <label htmlFor="pais" className={labelClassName}>
                                {t('country_label')} *
                            </label>
                            <Select
                                id="pais"
                                value={formData.pais}
                                onChange={(e) => handleChange('pais', e.target.value)}
                                error={errors.pais}
                                disabled={isLoading}
                                className={compact ? 'h-10 rounded-xl px-4 py-2 text-sm' : undefined}
                            >
                                <option value="">{t('country_placeholder')}</option>
                                <option value="Estados Unidos">{t('countries.usa')}</option>
                                <option value="Canadá">{t('countries.canada')}</option>
                                <option value="México">{t('countries.mexico')}</option>
                                <option value="Argentina">{t('countries.argentina')}</option>
                                <option value="Otro">{t('countries.other')}</option>
                            </Select>
                        </div>

                        {/* Tratamiento de Interés */}
                        <div>
                            <label htmlFor="tratamiento" className={labelClassName}>
                                {t('treatment_label')} *
                            </label>
                            <Select
                                id="tratamiento"
                                value={formData.tratamiento}
                                onChange={(e) => handleChange('tratamiento', e.target.value)}
                                error={errors.tratamiento}
                                disabled={isLoading}
                                className={compact ? 'h-10 rounded-xl px-4 py-2 text-sm' : undefined}
                            >
                                <option value="">{t('treatment_placeholder')}</option>
                                <option value="FIV - Fertilización In Vitro">{t('treatments.fiv')}</option>
                                <option value="Ovodonación">{t('treatments.egg_donation')}</option>
                                <option value="Inseminación Artificial">{t('treatments.artificial_insemination')}</option>
                                <option value="Método ROPA">{t('treatments.ropa')}</option>
                                <option value="PGT-A - Diagnóstico Genético">{t('treatments.genetic')}</option>
                                <option value="Preservación de Fertilidad">{t('treatments.preservation')}</option>
                                <option value="Donación de Embriones">{t('treatments.embryo_donation')}</option>
                                <option value="Apoyo LGBT+">{t('treatments.lgbt')}</option>
                                <option value="Consulta Especializada">{t('treatments.consultation')}</option>
                            </Select>
                        </div>

                        {/* Mensaje */}
                        <div>
                            <label htmlFor="mensaje" className={labelClassName}>
                                {t('message_label')}
                            </label>
                            <textarea
                                id="mensaje"
                                rows={compact ? 2 : 4}
                                placeholder={t('message_placeholder')}
                                value={formData.mensaje}
                                onChange={(e) => handleChange('mensaje', e.target.value)}
                                disabled={isLoading}
                                className={`flex w-full bg-slate-50 transition-all placeholder:text-slate-400 placeholder:font-light focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50 resize-none ${compact ? 'rounded-xl px-4 py-2 text-sm' : 'rounded-2xl px-6 py-4 text-base'}`}
                            />
                        </div>
                    </div>

                    {/* CAPTCHA */}
                    <div className={`flex justify-center ${compact ? 'mt-3 min-h-0' : 'mt-8 min-h-[65px]'}`}>
                        {isMounted && isCaptchaEnabled && (
                            <Turnstile
                                siteKey={turnstileSiteKey!}
                                options={{
                                    appearance: 'always',
                                    theme: 'light',
                                }}
                                onSuccess={(token) => {
                                    setCaptchaToken(token);
                                }}
                                onExpire={() => setCaptchaToken(null)}
                                onError={() => setCaptchaToken(null)}
                            />
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className={`flex justify-center ${compact ? 'mt-3' : 'mt-6'}`}>
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isLoading}
                            className={compact ? 'w-full px-6 py-3 text-sm' : 'w-full md:w-auto min-w-[280px]'}
                        >
                            {!isLoading && <Send className="w-5 h-5" />}
                            {t('submit_button')}
                        </Button>
                    </div>

                    {/* Nota de Privacidad */}
                    <p className={`text-center text-slate-400 font-light ${compact ? 'mt-3 text-xs' : 'mt-6 text-base'}`}>
                        {t('privacy_note')}
                    </p>
                </div>
            </form>
        </motion.div>
    )
}
