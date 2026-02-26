'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Turnstile } from '@marsidev/react-turnstile'
import { submitLead, type LeadFormData } from '@/lib/actions/leads'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ContactForm() {
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
            newErrors.nombre = 'El nombre es requerido'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Por favor ingrese un email válido'
        }

        if (!formData.telefono.trim()) {
            newErrors.telefono = 'El teléfono es requerido'
        }

        if (!formData.pais) {
            newErrors.pais = 'Por favor seleccione su país'
        }

        if (!formData.tratamiento) {
            newErrors.tratamiento = 'Por favor seleccione un tratamiento'
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

        if (!captchaToken) {
            setSubmitStatus('error')
            setSubmitMessage('Por favor, complete la verificación de seguridad.')
            return
        }

        setIsLoading(true)

        try {
            const result = await submitLead({ ...formData, captchaToken })

            if (result.success) {
                setSubmitStatus('success')
                setSubmitMessage(result.message)
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
            setSubmitMessage('Error de conexión. Por favor intente nuevamente.')
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
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-[3rem] p-8 md:p-12">

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

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Nombre Completo */}
                        <div className="md:col-span-1">
                            <label htmlFor="nombre" className="block text-base font-bold text-brand-violet mb-3 uppercase tracking-wider">
                                Nombre Completo *
                            </label>
                            <Input
                                id="nombre"
                                type="text"
                                placeholder="Ej. María González"
                                value={formData.nombre}
                                onChange={(e) => handleChange('nombre', e.target.value)}
                                error={errors.nombre}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Email */}
                        <div className="md:col-span-1">
                            <label htmlFor="email" className="block text-base font-bold text-brand-violet mb-3 uppercase tracking-wider">
                                Email *
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                error={errors.email}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="md:col-span-1">
                            <label htmlFor="telefono" className="block text-base font-bold text-brand-violet mb-3 uppercase tracking-wider">
                                Teléfono *
                            </label>
                            <Input
                                id="telefono"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={formData.telefono}
                                onChange={(e) => handleChange('telefono', e.target.value)}
                                error={errors.telefono}
                                disabled={isLoading}
                            />
                        </div>

                        {/* País */}
                        <div className="md:col-span-1">
                            <label htmlFor="pais" className="block text-base font-bold text-brand-violet mb-3 uppercase tracking-wider">
                                País *
                            </label>
                            <Select
                                id="pais"
                                value={formData.pais}
                                onChange={(e) => handleChange('pais', e.target.value)}
                                error={errors.pais}
                                disabled={isLoading}
                            >
                                <option value="">Seleccione su país</option>
                                <option value="Estados Unidos">Estados Unidos</option>
                                <option value="Canadá">Canadá</option>
                                <option value="México">México</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Brasil">Brasil</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="España">España</option>
                                <option value="Otro">Otro</option>
                            </Select>
                        </div>

                        {/* Tratamiento de Interés */}
                        <div className="md:col-span-2">
                            <label htmlFor="tratamiento" className="block text-base font-bold text-brand-violet mb-3 uppercase tracking-wider">
                                Tratamiento de Interés *
                            </label>
                            <Select
                                id="tratamiento"
                                value={formData.tratamiento}
                                onChange={(e) => handleChange('tratamiento', e.target.value)}
                                error={errors.tratamiento}
                                disabled={isLoading}
                            >
                                <option value="">Seleccione un tratamiento</option>
                                <option value="FIV - Fertilización In Vitro">FIV - Fertilización In Vitro</option>
                                <option value="Ovodonación">Ovodonación</option>
                                <option value="Inseminación Artificial">Inseminación Artificial</option>
                                <option value="Método ROPA">Método ROPA</option>
                                <option value="PGT-A - Diagnóstico Genético">PGT-A - Diagnóstico Genético</option>
                                <option value="Preservación de Fertilidad">Preservación de Fertilidad</option>
                                <option value="Donación de Embriones">Donación de Embriones</option>
                                <option value="Apoyo LGBT+">Apoyo LGBT+</option>
                                <option value="Consulta Especializada">Consulta Especializada</option>
                            </Select>
                        </div>

                        {/* Mensaje */}
                        <div className="md:col-span-2">
                            <label htmlFor="mensaje" className="block text-base font-bold text-brand-violet mb-3 uppercase tracking-wider">
                                Mensaje (Opcional)
                            </label>
                            <textarea
                                id="mensaje"
                                rows={4}
                                placeholder="Cuéntenos brevemente sobre su caso o consulta..."
                                value={formData.mensaje}
                                onChange={(e) => handleChange('mensaje', e.target.value)}
                                disabled={isLoading}
                                className="flex w-full rounded-2xl bg-slate-50 px-6 py-4 text-base transition-all placeholder:text-slate-400 placeholder:font-light focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            />
                        </div>
                    </div>

                    {/* CAPTCHA */}
                    <div className="mt-8 flex justify-center min-h-[65px]">
                        {isMounted && (
                            <Turnstile
                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
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
                    <div className="mt-6 flex justify-center">
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isLoading}
                            className="w-full md:w-auto min-w-[280px]"
                        >
                            {!isLoading && <Send className="w-5 h-5" />}
                            Solicitar Consulta
                        </Button>
                    </div>

                    {/* Nota de Privacidad */}
                    <p className="mt-6 text-center text-base text-slate-400 font-light">
                        Al enviar este formulario, acepta nuestra política de privacidad. Su información está protegida con encriptación de grado médico.
                    </p>
                </div>
            </form>
        </motion.div>
    )
}
