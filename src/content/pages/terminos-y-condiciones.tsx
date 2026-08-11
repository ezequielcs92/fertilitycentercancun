
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { FileText, UserCheck, AlertCircle, Gavel, Globe } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function Page() {
    return (
        <main className="bg-white pb-24">
            <PageHeader
                title="Términos y Condiciones"
                breadcrumb={[
                    { label: 'Inicio', href: '/' },
                    { label: 'Términos y Condiciones', href: '#' }
                ]}
            />
            <Container className="pt-16 pb-24">
                <div className="max-w-4xl mx-auto">
                    <GlassCard className="p-8 md:p-12 mb-12 border-l-4 border-l-brand-green">
                        <div className="flex items-start gap-4">
                            <FileText className="w-8 h-8 text-brand-green shrink-0" />
                            <div>
                                <h2 className="text-2xl font-serif text-brand-violet mb-4">Aceptación de Términos</h2>
                                <p className="text-lg text-slate-600 font-light leading-relaxed">
                                    Bienvenido a <strong>Advanced Fertility Center Cancún</strong>. Al acceder y utilizar este sitio web, usted acepta cumplir con los siguientes términos y condiciones de uso, los cuales, junto con nuestra política de privacidad, rigen la relación entre usted y nuestro centro médico.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="grid gap-8">
                        <section>
                            <h3 className="text-2xl font-serif text-brand-violet mb-6 flex items-center gap-3">
                                <Globe className="w-6 h-6" />
                                1. Uso del Sitio Web
                            </h3>
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 italic font-light text-slate-600">
                                &quot;El contenido de las páginas de este sitio web es para su información general y uso exclusivamente. Está sujeto a cambios sin previo aviso. Ni nosotros ni terceros ofrecemos ninguna garantía en cuanto a la exactitud, puntualidad, rendimiento, integridad o adecuación de la información y los materiales encontrados u ofrecidos en este sitio para cualquier propósito particular.&quot;
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-serif text-brand-violet mb-6 flex items-center gap-3">
                                <UserCheck className="w-6 h-6" />
                                2. Responsabilidad del Usuario
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { title: "Información Veraz", desc: "El usuario se compromete a proporcionar información real y precisa en formularios de contacto." },
                                    { title: "Uso Personal", desc: "El contenido está destinado a consulta personal y no comercial sin autorización previa." },
                                    { title: "Propiedad Intelectual", desc: "Este sitio contiene material que es propiedad nuestra o licenciado a nosotros, incluyendo el diseño y gráficos." },
                                    { title: "Enlaces Externos", desc: "De vez en cuando, este sitio también puede incluir enlaces a otros sitios web para su conveniencia." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-2xl border border-brand-violet/10 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <h4 className="font-bold text-brand-violet mb-1">{item.title}</h4>
                                        <p className="text-slate-600 text-sm font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-brand-violet rounded-[3rem] p-10 text-white shadow-xl my-8">
                            <h3 className="text-3xl font-serif mb-8 flex items-center gap-3">
                                <AlertCircle className="w-8 h-8 text-brand-green" />
                                3. Deslinde Médico
                            </h3>
                            <p className="text-lg font-light opacity-90 leading-relaxed mb-6">
                                La información proporcionada en este sitio web tiene fines informativos y educativos únicamente. <strong>No constituye consejo médico</strong>, diagnóstico o tratamiento profesional.
                            </p>
                            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                                <p className="text-sm font-medium italic">
                                    Siempre busque el consejo de su médico u otro proveedor de salud calificado para cualquier pregunta que pueda tener sobre una condición médica. Nunca ignore el consejo médico profesional ni retrase su búsqueda debido a algo que haya leído en este sitio web.
                                </p>
                            </div>
                        </section>

                        <section className="border-t border-slate-100 pt-12">
                            <h3 className="text-2xl font-serif text-brand-violet mb-6 flex items-center gap-3">
                                <Gavel className="w-6 h-6" />
                                4. Legislación Aplicable
                            </h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                El uso de este sitio web y cualquier disputa que surja de dicho uso del sitio web está sujeto a las leyes de los Estados Unidos Mexicanos, específicamente en la jurisdicción de los tribunales competentes en la ciudad de Cancún, Quintana Roo.
                            </p>
                        </section>
                    </div>
                </div>
            </Container>
        </main>
    );
}
