'use client';

import { useEffect, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { submitLead } from '@/lib/actions/leads';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface PromotionsFormProps {
    locale: 'es' | 'en';
}

type PromotionFormData = {
    nombre: string;
    email: string;
    telefono: string;
    promocion: string;
    mensaje: string;
};

export default function PromotionsForm({ locale }: PromotionsFormProps) {
    const isEs = locale === 'es';
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const isTurnstileTestKey = turnstileSiteKey === '1x00000000000000000000AA';
    const isProduction = process.env.NODE_ENV === 'production';
    const isCaptchaEnabled = Boolean(turnstileSiteKey && !isTurnstileTestKey);
    const [formData, setFormData] = useState<PromotionFormData>({
        nombre: '',
        email: '',
        telefono: '',
        promocion: '',
        mensaje: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const updateField = (field: keyof PromotionFormData, value: string) => {
        setFormData((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('idle');
        setMessage('');

        if (!formData.nombre.trim() || !formData.email.trim() || !formData.telefono.trim()) {
            setStatus('error');
            setMessage(isEs ? 'Completa nombre, email y teléfono.' : 'Please complete your name, email and phone.');
            return;
        }

        if (isProduction && !isCaptchaEnabled) {
            setStatus('error');
            setMessage(isEs ? 'El sistema de seguridad no está configurado.' : 'The security system is not configured.');
            return;
        }

        if (isCaptchaEnabled && !captchaToken) {
            setStatus('error');
            setMessage(isEs ? 'Completa la verificación de seguridad.' : 'Please complete the security verification.');
            return;
        }

        setIsLoading(true);

        try {
            const result = await submitLead({
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                pais: '',
                tratamiento: 'Promociones',
                mensaje: [
                    formData.promocion ? `Promoción: ${formData.promocion}` : null,
                    formData.mensaje ? `Mensaje: ${formData.mensaje}` : null,
                ].filter(Boolean).join('\n'),
                captchaToken,
            });

            if (!result.success) {
                throw new Error(result.message);
            }

            setStatus('success');
            setMessage(isEs ? 'Gracias. Nuestro equipo te contactará pronto.' : 'Thank you. Our team will contact you soon.');
            setFormData({ nombre: '', email: '', telefono: '', promocion: '', mensaje: '' });
            setCaptchaToken(null);
        } catch {
            setStatus('error');
            setMessage(isEs ? 'No pudimos enviar tu solicitud. Inténtalo nuevamente.' : 'We could not send your request. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-50/70 rounded-3xl p-2 md:p-4">
            <div className="bg-white rounded-[1.75rem] p-6 md:p-8 shadow-[0_16px_40px_rgba(117,98,162,0.10)] border border-slate-100">
                <div className="mb-6">
                    <h3 className="text-2xl font-serif text-brand-violet">
                        {isEs ? 'Solicita tu promoción' : 'Request your promotion'}
                    </h3>
                    <p className="text-slate-500 font-light mt-2 text-sm">
                        {isEs ? 'Completa el formulario y te daremos más información.' : 'Complete the form and we will share more information.'}
                    </p>
                </div>

                {status !== 'idle' && (
                    <div className={`rounded-2xl p-3 mb-4 flex items-start gap-3 ${status === 'success' ? 'bg-brand-green/10 text-brand-violet' : 'bg-red-50 text-red-700'}`}>
                        {status === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                        <p className="text-xs font-medium">{message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                        <Field label={isEs ? 'Nombre completo' : 'Full name'}>
                            <Input
                                value={formData.nombre}
                                onChange={(event) => updateField('nombre', event.target.value)}
                                placeholder={isEs ? 'Ej. Ana García' : 'E.g. Jane Doe'}
                                disabled={isLoading}
                                required
                                className="h-10 rounded-xl px-4 py-2 text-sm"
                            />
                        </Field>
                        <Field label={isEs ? 'Correo electrónico' : 'Email address'}>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(event) => updateField('email', event.target.value)}
                                placeholder={isEs ? 'tu@email.com' : 'you@email.com'}
                                disabled={isLoading}
                                required
                                className="h-10 rounded-xl px-4 py-2 text-sm"
                            />
                        </Field>
                    </div>

                    <Field label={isEs ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}>
                        <Input
                            type="tel"
                            value={formData.telefono}
                            onChange={(event) => updateField('telefono', event.target.value)}
                            placeholder="+52 ..."
                            disabled={isLoading}
                            required
                            className="h-10 rounded-xl px-4 py-2 text-sm"
                        />
                    </Field>

                    <Field label={isEs ? 'Promoción de interés' : 'Promotion of interest'}>
                        <select
                            value={formData.promocion}
                            onChange={(event) => updateField('promocion', event.target.value)}
                            disabled={isLoading}
                            className="flex h-10 w-full rounded-xl bg-slate-50 px-4 py-2 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">{isEs ? 'Selecciona una opción' : 'Select an option'}</option>
                            <option value="Información general">{isEs ? 'Información general' : 'General information'}</option>
                            <option value="Tratamientos de fertilidad">{isEs ? 'Tratamientos de fertilidad' : 'Fertility treatments'}</option>
                            <option value="Consulta inicial">{isEs ? 'Consulta inicial' : 'Initial consultation'}</option>
                        </select>
                    </Field>

                    <Field label={isEs ? 'Mensaje (opcional)' : 'Message (optional)'}>
                        <textarea
                            rows={3}
                            value={formData.mensaje}
                            onChange={(event) => updateField('mensaje', event.target.value)}
                            placeholder={isEs ? 'Cuéntanos cómo podemos ayudarte...' : 'Tell us how we can help...'}
                            disabled={isLoading}
                            className="flex w-full rounded-xl bg-slate-50 px-4 py-2 text-sm transition-all placeholder:text-slate-400 placeholder:font-light focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        />
                    </Field>

                    <div className="min-h-0 flex justify-center pt-1">
                        {isMounted && isCaptchaEnabled && (
                            <Turnstile
                                siteKey={turnstileSiteKey!}
                                options={{ appearance: 'always', theme: 'light' }}
                                onSuccess={setCaptchaToken}
                                onExpire={() => setCaptchaToken(null)}
                                onError={() => setCaptchaToken(null)}
                            />
                        )}
                    </div>

                    <Button type="submit" isLoading={isLoading} className="w-full px-5 py-3 text-sm">
                        {!isLoading && <Send className="w-4 h-4" />}
                        {isEs ? 'Solicitar información' : 'Request information'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block text-xs font-bold text-brand-violet mb-1 uppercase tracking-wider">{label}</span>
            {children}
        </label>
    );
}
