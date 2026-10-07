'use client'

import { useEffect, useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { useLocale } from 'next-intl'
import { CheckCircle2, AlertCircle, Send } from 'lucide-react'
import { submitLifeStartApplication } from '@/lib/actions/leads'
import { readUtmParams } from '@/lib/utm'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type FieldName =
    | 'nombre'
    | 'edad'
    | 'fechaNacimiento'
    | 'peso'
    | 'talla'
    | 'nacionalidad'
    | 'telefono'
    | 'email'

const EMPTY_FORM: Record<FieldName, string> = {
    nombre: '',
    edad: '',
    fechaNacimiento: '',
    peso: '',
    talla: '',
    nacionalidad: '',
    telefono: '',
    email: '',
}

export default function LifeStartApplicationForm() {
    const locale = useLocale()
    const isEs = locale === 'es'
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    const isTurnstileTestKey = turnstileSiteKey === '1x00000000000000000000AA'
    const isProduction = process.env.NODE_ENV === 'production'
    const isCaptchaEnabled = Boolean(turnstileSiteKey && !isTurnstileTestKey)

    const [isMounted, setIsMounted] = useState(false)
    const [values, setValues] = useState(EMPTY_FORM)
    const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [submitMessage, setSubmitMessage] = useState('')

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const copy = isEs
        ? {
            title: 'Formulario de aplicación',
            intro: 'Completa tu solicitud. El equipo de LifeStart la revisará y te contactará por WhatsApp o correo.',
            nombre: 'Nombre completo',
            edad: 'Edad',
            fecha: 'Fecha de nacimiento',
            peso: 'Peso',
            talla: 'Talla',
            nacionalidad: 'Nacionalidad',
            telefono: 'Tel. WhatsApp',
            email: 'Email',
            pesoPlaceholder: 'Ej. 58 kg',
            tallaPlaceholder: 'Ej. 165 cm',
            submit: 'Enviar solicitud',
            privacy: 'Tus datos se usan solo para evaluar tu solicitud al programa LifeStart Donors.',
            captcha: 'Completa la verificación de seguridad.',
            captchaMissing: 'El sistema anti-spam no está configurado. Intenta más tarde.',
            connection: 'No pudimos enviar la solicitud. Revisa tu conexión e inténtalo de nuevo.',
            required: 'Este campo es obligatorio.',
            emailInvalid: 'Ingresa un email válido.',
            age: 'El programa es para mujeres de 18 a 29 años.',
            phone: 'Ingresa un teléfono de WhatsApp válido.',
        }
        : {
            title: 'Application form',
            intro: 'Complete your application. The LifeStart team will review it and contact you by WhatsApp or email.',
            nombre: 'Full name',
            edad: 'Age',
            fecha: 'Date of birth',
            peso: 'Weight',
            talla: 'Height',
            nacionalidad: 'Nationality',
            telefono: 'WhatsApp number',
            email: 'Email',
            pesoPlaceholder: 'e.g. 128 lb',
            tallaPlaceholder: 'e.g. 5 ft 5 in',
            submit: 'Submit application',
            privacy: 'Your information is used only to review your LifeStart Donors application.',
            captcha: 'Please complete the security check.',
            captchaMissing: 'The anti-spam system is not configured. Please try again later.',
            connection: 'We could not send your application. Check your connection and try again.',
            required: 'This field is required.',
            emailInvalid: 'Enter a valid email address.',
            age: 'The program is for women between 18 and 29 years old.',
            phone: 'Enter a valid WhatsApp number.',
        }

    const validate = (): boolean => {
        const next: Partial<Record<FieldName, string>> = {}
        const edad = Number(values.edad)

        if (values.nombre.trim().length < 2) next.nombre = copy.required
        if (!Number.isInteger(edad) || edad < 18 || edad > 29) next.edad = copy.age
        if (!values.fechaNacimiento) next.fechaNacimiento = copy.required
        if (!/\d/.test(values.peso)) next.peso = copy.required
        if (!/\d/.test(values.talla)) next.talla = copy.required
        if (values.nacionalidad.trim().length < 2) next.nacionalidad = copy.required
        if (values.telefono.replace(/\D/g, '').length < 8) next.telefono = copy.phone
        if (!values.email.trim()) next.email = copy.required
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = copy.emailInvalid

        setErrors(next)
        return Object.keys(next).length === 0
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setSubmitStatus('idle')
        setSubmitMessage('')

        if (!validate()) return

        if (isProduction && !isCaptchaEnabled) {
            setSubmitStatus('error')
            setSubmitMessage(copy.captchaMissing)
            return
        }

        if (isCaptchaEnabled && !captchaToken) {
            setSubmitStatus('error')
            setSubmitMessage(copy.captcha)
            return
        }

        setIsLoading(true)
        try {
            const result = await submitLifeStartApplication({
                ...values,
                locale: isEs ? 'es' : 'en',
                utm: readUtmParams(),
                captchaToken,
            })

            if (result.success) {
                setSubmitStatus('success')
                setSubmitMessage(result.message)
                setValues(EMPTY_FORM)
                setErrors({})
                setCaptchaToken(null)
            } else {
                console.error('[lifestart] la solicitud no se registró:', result.error || result.message)
                setSubmitStatus('error')
                setSubmitMessage(result.message)
            }
        } catch (error) {
            console.error('[lifestart] falló la acción del servidor:', error)
            setSubmitStatus('error')
            setSubmitMessage(copy.connection)
        } finally {
            setIsLoading(false)
        }
    }

    const update = (field: FieldName, value: string) => {
        setValues((current) => ({ ...current, [field]: value }))
        if (errors[field]) {
            setErrors((current) => ({ ...current, [field]: undefined }))
        }
    }

    const labelClass = 'block text-sm font-bold text-brand-violet mb-2 uppercase tracking-wider'

    return (
        <div id="solicitud" className="not-prose scroll-mt-28 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-3xl font-serif text-brand-violet mb-4">{copy.title}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">{copy.intro}</p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {submitStatus !== 'idle' && (
                    <div
                        className={`rounded-2xl p-6 flex items-start gap-4 ${
                            submitStatus === 'success'
                                ? 'bg-brand-green/10 border-2 border-brand-green/30'
                                : 'bg-red-50 border-2 border-red-200'
                        }`}
                    >
                        {submitStatus === 'success' ? (
                            <CheckCircle2 className="w-6 h-6 text-brand-violet flex-shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <p className={`font-medium ${submitStatus === 'success' ? 'text-brand-violet' : 'text-red-800'}`}>
                            {submitMessage}
                        </p>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="ls-nombre" className={labelClass}>{copy.nombre} *</label>
                        <Input id="ls-nombre" type="text" value={values.nombre} error={errors.nombre} disabled={isLoading} onChange={(event) => update('nombre', event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="ls-edad" className={labelClass}>{copy.edad} *</label>
                        <Input id="ls-edad" type="number" min={18} max={29} inputMode="numeric" value={values.edad} error={errors.edad} disabled={isLoading} onChange={(event) => update('edad', event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="ls-fecha" className={labelClass}>{copy.fecha} *</label>
                        <Input id="ls-fecha" type="date" value={values.fechaNacimiento} error={errors.fechaNacimiento} disabled={isLoading} onChange={(event) => update('fechaNacimiento', event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="ls-peso" className={labelClass}>{copy.peso} *</label>
                        <Input id="ls-peso" type="text" placeholder={copy.pesoPlaceholder} value={values.peso} error={errors.peso} disabled={isLoading} onChange={(event) => update('peso', event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="ls-talla" className={labelClass}>{copy.talla} *</label>
                        <Input id="ls-talla" type="text" placeholder={copy.tallaPlaceholder} value={values.talla} error={errors.talla} disabled={isLoading} onChange={(event) => update('talla', event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="ls-nacionalidad" className={labelClass}>{copy.nacionalidad} *</label>
                        <Input id="ls-nacionalidad" type="text" value={values.nacionalidad} error={errors.nacionalidad} disabled={isLoading} onChange={(event) => update('nacionalidad', event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="ls-telefono" className={labelClass}>{copy.telefono} *</label>
                        <Input id="ls-telefono" type="tel" inputMode="tel" autoComplete="tel" value={values.telefono} error={errors.telefono} disabled={isLoading} onChange={(event) => update('telefono', event.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="ls-email" className={labelClass}>{copy.email} *</label>
                        <Input id="ls-email" type="email" autoComplete="email" value={values.email} error={errors.email} disabled={isLoading} onChange={(event) => update('email', event.target.value)} />
                    </div>
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
                    <Button type="submit" variant="secondary" isLoading={isLoading} className="w-full md:w-auto min-w-[280px]">
                        {!isLoading && <Send className="w-5 h-5" />}
                        {copy.submit}
                    </Button>
                </div>

                <p className="text-center text-slate-400 font-light text-sm">{copy.privacy}</p>
            </form>
        </div>
    )
}
