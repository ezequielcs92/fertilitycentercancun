import type { ComponentType } from 'react'

/**
 * Registro único de las páginas de contenido estático.
 *
 * Los componentes viven en `src/content/pages/` y NO son rutas: la única ruta
 * pública es `app/[locale]/(public)/[slug]`, que los resuelve desde aquí. Este
 * archivo es también la fuente de la metadata SEO, del hreflang y del sitemap,
 * así que al añadir una página solo hay que registrarla en un sitio.
 */

export type ContentLocale = 'es' | 'en'

export interface ContentPage {
    /** Idioma en el que está escrito el contenido de la página. */
    locale: ContentLocale
    /** Título SEO, sin la marca (se añade en generateMetadata). */
    title: string
    /** Meta description, 140-160 caracteres, en el idioma de la página. */
    description: string
    /** Slug equivalente en el otro idioma; genera el hreflang alterno. */
    counterpart?: string
    /** Añade el bloque de CTA de tratamientos al final de la página. */
    isTreatment?: boolean
    /** Páginas utilitarias que no deben indexarse ni entrar al sitemap. */
    noIndex?: boolean
    /** Prioridad en el sitemap (por defecto 0.7). */
    priority?: number
    load: () => Promise<{ default: ComponentType<{ locale?: string }> }>
}

export const contentPages: Record<string, ContentPage> = {
    // ---------------------------------------------------------------
    // Institucional
    // ---------------------------------------------------------------
    'about-fertility-center': {
        locale: 'en',
        title: 'About Advanced Fertility Center Cancun',
        description:
            'Learn who we are: a fertility clinic in Cancun combining advanced reproductive technology with warm, personalized care for patients from around the world.',
        counterpart: 'sobre-fertility-center-cancun',
        priority: 0.9,
        load: () => import('@/content/pages/about-fertility-center'),
    },
    'why-afcc': {
        locale: 'en',
        title: 'Why Choose AFCC',
        description:
            'Individualized fertility care, an experienced multidisciplinary team and close support at every step of your treatment in Cancun, Mexico.',
        priority: 0.8,
        load: () => import('@/content/pages/why-afcc'),
    },
    'certificaciones-acreditaciones-y-alianzas': {
        locale: 'es',
        title: 'Certificaciones, Acreditaciones y Alianzas',
        description:
            'Nuestras certificaciones y alianzas estratégicas respaldan los estándares de seguridad, ética y calidad internacional con los que trabajamos en Cancún.',
        counterpart: 'certifications-accreditations-and-partnerships',
        priority: 0.7,
        load: () => import('@/content/pages/certificaciones-acreditaciones-y-alianzas'),
    },
    'certifications-accreditations-and-partnerships': {
        locale: 'en',
        title: 'Certifications, Accreditations and Partnerships',
        description:
            'Every certification and strategic alliance reflects our commitment to safety, ethics and world-class quality standards in assisted reproduction.',
        counterpart: 'certificaciones-acreditaciones-y-alianzas',
        priority: 0.7,
        load: () => import('@/content/pages/certifications-accreditations-and-partnerships'),
    },
    'instalaciones': {
        locale: 'es',
        title: 'Recorre Nuestras Instalaciones',
        description:
            'Explora nuestras instalaciones en un tour virtual 360°: laboratorios de FIV, quirófanos y áreas de atención al paciente en Cancún.',
        counterpart: 'clinic-tour',
        priority: 0.8,
        load: () => import('@/content/pages/instalaciones'),
    },
    'clinic-tour': {
        locale: 'en',
        title: 'Tour Our Fertility Clinic',
        description:
            'Explore our facilities in a 360° virtual tour: IVF laboratories, operating rooms and patient care areas in Cancun, Mexico.',
        counterpart: 'instalaciones',
        priority: 0.8,
        load: () => import('@/content/pages/clinic-tour'),
    },
    'laboratorios-y-servicios': {
        locale: 'es',
        title: 'Laboratorios y Servicios',
        description:
            'Instalaciones de vanguardia y un equipo altamente capacitado para brindarte atención avanzada, humana y personalizada en reproducción asistida.',
        counterpart: 'laboratories-and-services',
        priority: 0.8,
        load: () => import('@/content/pages/laboratorios-y-servicios'),
    },
    'laboratories-and-services': {
        locale: 'en',
        title: 'Laboratories and Services',
        description:
            'State-of-the-art facilities and a highly trained team delivering advanced, compassionate and personalized assisted reproduction care in Cancun.',
        counterpart: 'laboratorios-y-servicios',
        priority: 0.8,
        load: () => import('@/content/pages/laboratories-and-services'),
    },
    'ivf-team': {
        locale: 'en',
        title: 'Our Medical Team',
        description:
            'Meet the multidisciplinary team of fertility specialists, embryologists and patient coordinators committed to your care and treatment success.',
        counterpart: 'equipo',
        priority: 0.9,
        load: () => import('@/content/pages/ivf-team'),
    },
    'ixchel': {
        locale: 'es',
        title: 'Ixchel, Diosa Maya de la Fertilidad',
        description:
            'La historia de Ixchel, diosa maya de la fertilidad, y por qué su presencia acompaña a nuestras pacientes en Advanced Fertility Center Cancún.',
        priority: 0.5,
        load: () => import('@/content/pages/ixchel'),
    },
    'turismo-medico': {
        locale: 'es',
        title: 'Turismo Médico de Fertilidad en Cancún',
        description:
            'Trata tu fertilidad en Cancún: costos accesibles, marco legal favorable y acompañamiento completo durante tu estancia. Descubre por qué elegirnos.',
        counterpart: 'international-patients',
        priority: 0.9,
        load: () => import('@/content/pages/turismo-medico'),
    },
    'international-patients': {
        locale: 'en',
        title: 'Fertility Medical Tourism in Cancun',
        description:
            'Travel to Cancun for your fertility treatment: accessible costs, favorable legal framework and full support throughout your stay in Mexico.',
        counterpart: 'turismo-medico',
        priority: 0.9,
        load: () => import('@/content/pages/international-patients'),
    },
    'soporte-internacional': {
        locale: 'es',
        title: 'Soporte Médico Internacional',
        description:
            'Contamos con el respaldo de especialistas internacionales que comparten sus investigaciones sobre las técnicas más avanzadas en fertilidad.',
        counterpart: 'international-support',
        priority: 0.6,
        load: () => import('@/content/pages/soporte-internacional'),
    },
    'international-support': {
        locale: 'en',
        title: 'International Medical Support',
        description:
            'We are backed by leading international specialists who share their research and discoveries on the most advanced fertility techniques.',
        counterpart: 'soporte-internacional',
        priority: 0.6,
        load: () => import('@/content/pages/international-support'),
    },

    // ---------------------------------------------------------------
    // Primer contacto
    // ---------------------------------------------------------------
    'primera-visita-a-nuestra-clinica-de-fertilidad': {
        locale: 'es',
        title: 'Tu Primera Visita a la Clínica',
        description:
            '¿Llevas más de un año buscando embarazo? Te explicamos qué esperar en tu primera consulta de fertilidad, qué estudios se realizan y cómo prepararte.',
        counterpart: 'first-visit',
        priority: 0.9,
        load: () => import('@/content/pages/primera-visita-a-nuestra-clinica-de-fertilidad'),
    },
    'first-visit': {
        locale: 'en',
        title: 'Your First Visit to Our Clinic',
        description:
            'Trying to conceive for more than a year? Here is what to expect at your first fertility consultation, which tests are done and how to prepare.',
        counterpart: 'primera-visita-a-nuestra-clinica-de-fertilidad',
        priority: 0.9,
        load: () => import('@/content/pages/first-visit'),
    },
    'contact-ivf-doctors': {
        locale: 'en',
        title: 'Contact Our IVF Doctors',
        description:
            'Talk to our fertility specialists in Cancun. Request a consultation and get a personalized answer about your treatment within 24 hours.',
        counterpart: 'contacto',
        priority: 0.9,
        load: () => import('@/content/pages/contact-ivf-doctors'),
    },
    'faqs': {
        locale: 'es',
        title: 'Preguntas Frecuentes sobre Fertilidad',
        description:
            'Respuestas a las dudas más comunes sobre FIV, inseminación, donación de óvulos, costos y tiempos de tratamiento en nuestra clínica de Cancún.',
        priority: 0.8,
        load: () => import('@/content/pages/faqs'),
    },
    'testimonios': {
        locale: 'es',
        title: 'Testimonios de Pacientes',
        description:
            'Historias reales de pacientes que lograron su embarazo con nosotros. Conoce sus experiencias y el acompañamiento que recibieron en cada paso.',
        counterpart: 'testimonials',
        priority: 0.8,
        load: () => import('@/content/pages/testimonios'),
    },
    'testimonials': {
        locale: 'en',
        title: 'Patient Testimonials',
        description:
            'Real stories from patients who achieved pregnancy with us. Discover their experiences and the support they received at every step.',
        counterpart: 'testimonios',
        priority: 0.8,
        load: () => import('@/content/pages/testimonials'),
    },

    // ---------------------------------------------------------------
    // Tratamientos
    // ---------------------------------------------------------------
    'fertility-treatments': {
        locale: 'en',
        title: 'Fertility Treatments',
        description:
            'Explore our full range of fertility treatments: IVF, artificial insemination, egg donation, ROPA method, fertility preservation and more.',
        counterpart: 'tratamientos',
        priority: 1,
        load: () => import('@/content/pages/fertility-treatments'),
    },
    'fiv-fertilizacion-in-vitro': {
        locale: 'es',
        title: 'FIV — Fertilización In Vitro',
        description:
            'La Fertilización In Vitro paso a paso: estimulación, aspiración folicular, fecundación en laboratorio y transferencia embrionaria en Cancún.',
        counterpart: 'ivf-in-vitro-fertilization',
        isTreatment: true,
        priority: 1,
        load: () => import('@/content/pages/fiv-fertilizacion-in-vitro'),
    },
    'ivf-in-vitro-fertilization': {
        locale: 'en',
        title: 'IVF — In Vitro Fertilization',
        description:
            'In Vitro Fertilization step by step: ovarian stimulation, egg retrieval, laboratory fertilization and embryo transfer in Cancun, Mexico.',
        counterpart: 'fiv-fertilizacion-in-vitro',
        isTreatment: true,
        priority: 1,
        load: () => import('@/content/pages/ivf-in-vitro-fertilization'),
    },
    'fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo': {
        locale: 'es',
        title: 'FIV con Estudio Genético y Selección de Sexo',
        description:
            'FIV combinada con estudio genético preimplantacional (PGT-A): permite detectar alteraciones cromosómicas y seleccionar el sexo del embrión.',
        counterpart: 'in-vitro-fertilization-with-genetic-testing-and-sex-selection',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo'),
    },
    'in-vitro-fertilization-with-genetic-testing-and-sex-selection': {
        locale: 'en',
        title: 'IVF with Genetic Testing and Sex Selection',
        description:
            'IVF combined with preimplantation genetic testing (PGT-A) to detect chromosomal conditions and select the sex of the embryo.',
        counterpart: 'fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/in-vitro-fertilization-with-genetic-testing-and-sex-selection'),
    },
    'fertilizacion-in-vitro-en-fiv-ciclo-natural': {
        locale: 'es',
        title: 'FIV en Ciclo Natural',
        description:
            'FIV sin estimulación hormonal: ideal si buscas un tratamiento menos invasivo, tienes baja reserva ovárica o prefieres evitar las hormonas.',
        counterpart: 'in-vitro-fertilization-in-ivf-natural-cycle',
        isTreatment: true,
        priority: 0.8,
        load: () => import('@/content/pages/fertilizacion-in-vitro-en-fiv-ciclo-natural'),
    },
    'in-vitro-fertilization-in-ivf-natural-cycle': {
        locale: 'en',
        title: 'IVF in Natural Cycle',
        description:
            'IVF without hormonal stimulation: ideal if you want a less invasive treatment, have low ovarian reserve or prefer to avoid hormones.',
        counterpart: 'fertilizacion-in-vitro-en-fiv-ciclo-natural',
        isTreatment: true,
        priority: 0.8,
        load: () => import('@/content/pages/in-vitro-fertilization-in-ivf-natural-cycle'),
    },
    'mini-fiv': {
        locale: 'es',
        title: 'Mini FIV',
        description:
            'Una FIV con estimulación suave: más natural, más accesible y menos invasiva, manteniendo buenas tasas de éxito en pacientes seleccionadas.',
        counterpart: 'mini-ivf',
        isTreatment: true,
        priority: 0.8,
        load: () => import('@/content/pages/mini-fiv'),
    },
    'mini-ivf': {
        locale: 'en',
        title: 'Mini IVF',
        description:
            'IVF with mild stimulation: a more natural, more affordable and less invasive option that keeps strong success rates in selected patients.',
        counterpart: 'mini-fiv',
        isTreatment: true,
        priority: 0.8,
        load: () => import('@/content/pages/mini-ivf'),
    },
    'inseminacion-artificial': {
        locale: 'es',
        title: 'Inseminación Artificial (IIU)',
        description:
            'La inseminación intrauterina es una opción accesible y efectiva para infertilidad leve o sin causa aparente. Conoce el proceso y a quién se recomienda.',
        counterpart: 'artificial-insemination',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/inseminacion-artificial'),
    },
    'artificial-insemination': {
        locale: 'en',
        title: 'Artificial Insemination (IUI)',
        description:
            'Intrauterine insemination is an accessible, effective option for mild or unexplained infertility. Learn how the procedure works and who it suits.',
        counterpart: 'inseminacion-artificial',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/artificial-insemination'),
    },
    'donacion-de-ovulos': {
        locale: 'es',
        title: 'Ovodonación — Donación de Óvulos',
        description:
            'La ovodonación ofrece las tasas de éxito más altas en reproducción asistida. Conoce el proceso, la selección de donantes y los tiempos de espera.',
        counterpart: 'egg-donation',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/donacion-de-ovulos'),
    },
    'egg-donation': {
        locale: 'en',
        title: 'Egg Donation',
        description:
            'Egg donation offers the highest success rates in assisted reproduction. Learn about the process, donor selection and expected waiting times.',
        counterpart: 'donacion-de-ovulos',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/egg-donation'),
    },
    'donacion-de-espermatozoides': {
        locale: 'es',
        title: 'Donación de Espermatozoides — Programa LifeStart',
        description:
            'Nuestro programa de donación de gametos: requisitos, estudios previos y acompañamiento para donantes en Advanced Fertility Center Cancún.',
        counterpart: 'sperm-donation',
        isTreatment: true,
        priority: 0.7,
        load: () => import('@/content/pages/donacion-de-espermatozoides'),
    },
    'sperm-donation': {
        locale: 'en',
        title: 'Sperm Donation — LifeStart Program',
        description:
            'Our gamete donation program: requirements, screening tests and full support for donors at Advanced Fertility Center Cancun.',
        counterpart: 'donacion-de-espermatozoides',
        isTreatment: true,
        priority: 0.7,
        load: () => import('@/content/pages/sperm-donation'),
    },
    'donacion-y-adopcion-embriones': {
        locale: 'es',
        title: 'Donación y Adopción de Embriones',
        description:
            'La adopción de embriones es una vía accesible hacia la maternidad. Te explicamos cómo funciona el programa, los requisitos y las tasas de éxito.',
        counterpart: 'embryo-donation-and-adoption',
        isTreatment: true,
        priority: 0.8,
        load: () => import('@/content/pages/donacion-y-adopcion-embriones'),
    },
    'embryo-donation-and-adoption': {
        locale: 'en',
        title: 'Embryo Donation and Adoption',
        description:
            'Embryo adoption is an accessible path to parenthood. Learn how the program works, the requirements involved and the expected success rates.',
        counterpart: 'donacion-y-adopcion-embriones',
        isTreatment: true,
        priority: 0.8,
        load: () => import('@/content/pages/embryo-donation-and-adoption'),
    },
    'metodo-ropa': {
        locale: 'es',
        title: 'Método ROPA para Parejas de Mujeres',
        description:
            'Con el método ROPA una mujer aporta los óvulos y la otra gesta al bebé: una forma única de compartir la maternidad. Conoce el proceso completo.',
        counterpart: 'ropa-method',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/metodo-ropa'),
    },
    'ropa-method': {
        locale: 'en',
        title: 'ROPA Method for Female Couples',
        description:
            'With the ROPA method one partner provides the eggs and the other carries the pregnancy: a unique way to share motherhood. See the full process.',
        counterpart: 'metodo-ropa',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/ropa-method'),
    },
    'preservacion-de-la-fertilidad': {
        locale: 'es',
        title: 'Preservación de la Fertilidad',
        description:
            'Congelación de óvulos y preservación de la fertilidad para que decidas cuándo es tu mejor momento. Conoce el proceso, la edad ideal y los costos.',
        counterpart: 'fertility-preservation',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/preservacion-de-la-fertilidad'),
    },
    'fertility-preservation': {
        locale: 'en',
        title: 'Fertility Preservation',
        description:
            'Egg freezing and fertility preservation so you can decide when the time is right. Learn about the process, ideal age and what it involves.',
        counterpart: 'preservacion-de-la-fertilidad',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/fertility-preservation'),
    },
    'coito-programado-e-induccion-de-ovulacion': {
        locale: 'es',
        title: 'Coito Programado e Inducción de Ovulación',
        description:
            'El tratamiento de fertilidad más sencillo: inducimos la ovulación y programamos el momento óptimo para la concepción natural.',
        counterpart: 'timed-intercourse-and-ovulation-induction',
        isTreatment: true,
        priority: 0.7,
        load: () => import('@/content/pages/coito-programado-e-induccion-de-ovulacion'),
    },
    'timed-intercourse-and-ovulation-induction': {
        locale: 'en',
        title: 'Timed Intercourse and Ovulation Induction',
        description:
            'The simplest fertility treatment: we induce ovulation and time the optimal window for natural conception under medical guidance.',
        counterpart: 'coito-programado-e-induccion-de-ovulacion',
        isTreatment: true,
        priority: 0.7,
        load: () => import('@/content/pages/timed-intercourse-and-ovulation-induction'),
    },
    'transferencia-de-embriones-y-preparacion-endometrial': {
        locale: 'es',
        title: 'Transferencia de Embriones y Preparación Endometrial',
        description:
            'El momento más esperado del tratamiento. Te explicamos cómo se prepara el endometrio y cómo se realiza la transferencia embrionaria.',
        counterpart: 'embryo-transfer-and-endometrial-preparation',
        isTreatment: true,
        priority: 0.8,
        load: () => import('@/content/pages/transferencia-de-embriones-y-preparacion-endometrial'),
    },
    'embryo-transfer-and-endometrial-preparation': {
        locale: 'en',
        title: 'Embryo Transfer and Endometrial Preparation',
        description:
            'The most awaited moment of your treatment. Learn how the endometrium is prepared and how the embryo transfer procedure is performed.',
        counterpart: 'transferencia-de-embriones-y-preparacion-endometrial',
        isTreatment: true,
        priority: 0.8,
        load: () => import('@/content/pages/embryo-transfer-and-endometrial-preparation'),
    },
    'transferencia-de-embriones-congelados': {
        locale: 'es',
        title: 'Transferencia de Embriones Congelados',
        description:
            'Desvitrificamos tus embriones y los transferimos a un útero preparado para recibirlos. Conoce el proceso de la transferencia en diferido.',
        isTreatment: true,
        priority: 0.7,
        load: () => import('@/content/pages/transferencia-de-embriones-congelados'),
    },
    'doble-acumulacion': {
        locale: 'es',
        title: 'Doble Acumulación (DuoStim)',
        description:
            'Dos estimulaciones ováricas en un mismo ciclo para acumular más óvulos y embriones. Especialmente útil en baja reserva ovárica.',
        counterpart: 'double-accumulation-back-to-back-or-duo-stim',
        isTreatment: true,
        priority: 0.7,
        load: () => import('@/content/pages/doble-acumulacion'),
    },
    'double-accumulation-back-to-back-or-duo-stim': {
        locale: 'en',
        title: 'Double Accumulation (Back-to-Back or DuoStim)',
        description:
            'Two ovarian stimulations within the same cycle to accumulate more eggs and embryos. Especially useful for low ovarian reserve.',
        counterpart: 'doble-acumulacion',
        isTreatment: true,
        priority: 0.7,
        load: () => import('@/content/pages/double-accumulation-back-to-back-or-duo-stim'),
    },
    'construyendo-familias': {
        locale: 'es',
        title: 'Construyendo Familias — Comunidad LGBT+',
        description:
            'Programas de fertilidad para parejas del mismo sexo, personas solteras y familias diversas. El amor hace a la familia; nosotros te ayudamos a crearla.',
        counterpart: 'building-families',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/construyendo-familias'),
    },
    'building-families': {
        locale: 'en',
        title: 'Building Families — LGBTQ+ Community',
        description:
            'Fertility programs for same-sex couples, single parents and diverse families. Love makes a family, and we help you create it.',
        counterpart: 'construyendo-familias',
        isTreatment: true,
        priority: 0.9,
        load: () => import('@/content/pages/building-families'),
    },
    'estudios-geneticos': {
        locale: 'es',
        title: 'Estudios Genéticos Preimplantacionales',
        description:
            'El análisis genético embrionario (PGT-A) detecta alteraciones en el número de cromosomas antes de la transferencia y mejora las tasas de implantación.',
        counterpart: 'genetic-studies',
        priority: 0.8,
        load: () => import('@/content/pages/estudios-geneticos'),
    },
    'genetic-studies': {
        locale: 'en',
        title: 'Preimplantation Genetic Testing',
        description:
            'Embryonic genetic analysis (PGT-A) detects chromosomal abnormalities before transfer and improves implantation and pregnancy rates.',
        counterpart: 'estudios-geneticos',
        priority: 0.8,
        load: () => import('@/content/pages/genetic-studies'),
    },
    'add-ons-complementos-para-optimizar-tu-tratamiento-de-fertilidad': {
        locale: 'es',
        title: 'Add-Ons para Optimizar tu Tratamiento',
        description:
            'Complementos que pueden mejorar tus resultados: terapias inmunológicas, ERA, EmbryoGlue y otras técnicas adicionales a tu tratamiento de fertilidad.',
        counterpart: 'add-ons-enhancements-to-optimize-your-fertility-treatment',
        priority: 0.7,
        load: () => import('@/content/pages/add-ons-complementos-para-optimizar-tu-tratamiento-de-fertilidad'),
    },
    'add-ons-enhancements-to-optimize-your-fertility-treatment': {
        locale: 'en',
        title: 'Add-Ons to Optimize Your Treatment',
        description:
            'Enhancements that can improve your results: immune therapies, ERA testing, EmbryoGlue and other techniques added to your fertility treatment.',
        counterpart: 'add-ons-complementos-para-optimizar-tu-tratamiento-de-fertilidad',
        priority: 0.7,
        load: () => import('@/content/pages/add-ons-enhancements-to-optimize-your-fertility-treatment'),
    },

    // ---------------------------------------------------------------
    // Promociones y programas
    // ---------------------------------------------------------------
    'promociones': {
        locale: 'es',
        title: 'Promociones en Tratamientos de Fertilidad',
        description:
            'Consulta las promociones vigentes en FIV, ovodonación y estudios de fertilidad en Advanced Fertility Center Cancún.',
        counterpart: 'promotions',
        priority: 0.8,
        load: () => import('@/content/pages/promociones'),
    },
    'promotions': {
        locale: 'en',
        title: 'Fertility Treatment Promotions',
        description:
            'See current promotions on IVF, egg donation and fertility testing at Advanced Fertility Center Cancun.',
        counterpart: 'promociones',
        priority: 0.8,
        load: () => import('@/content/pages/promotions'),
    },
    'programa-de-referidos': {
        locale: 'es',
        title: 'Programa de Referidos',
        description:
            'Recomienda Advanced Fertility Center Cancún y recibe beneficios en tu tratamiento. Conoce cómo funciona nuestro programa de referidos.',
        counterpart: 'referral-program',
        priority: 0.6,
        load: () => import('@/content/pages/programa-de-referidos'),
    },
    'referral-program': {
        locale: 'en',
        title: 'Referral Program',
        description:
            'Refer Advanced Fertility Center Cancun and receive benefits on your treatment. Learn how our referral program works.',
        counterpart: 'programa-de-referidos',
        priority: 0.6,
        load: () => import('@/content/pages/referral-program'),
    },

    // ---------------------------------------------------------------
    // Contactos directos del equipo (no indexables)
    // ---------------------------------------------------------------
    'alejandra-macip-magana': {
        locale: 'es',
        title: 'Contacto — Alejandra Macip Magaña',
        description: 'Datos de contacto directo de Alejandra Macip Magaña, ejecutiva comercial de Advanced Fertility Center Cancún.',
        noIndex: true,
        load: () => import('@/content/pages/alejandra-macip-magana'),
    },
    'contacto-annecy-aguirre': {
        locale: 'es',
        title: 'Contacto — Lic. Annecy Aguirre Mortera',
        description: 'Datos de contacto directo de la Lic. Annecy Aguirre Mortera, ejecutiva comercial de Advanced Fertility Center Cancún.',
        noIndex: true,
        load: () => import('@/content/pages/contacto-annecy-aguirre'),
    },
    'contacto-tere-anguiano': {
        locale: 'es',
        title: 'Contacto — Tere Anguiano',
        description: 'Datos de contacto directo de Tere Anguiano, ejecutiva de ventas de Advanced Fertility Center Cancún.',
        noIndex: true,
        load: () => import('@/content/pages/contacto-tere-anguiano'),
    },
    'dra-azul-estefania-torres-contacto': {
        locale: 'es',
        title: 'Contacto — Dra. Azul Estefanía Torres',
        description: 'Datos de contacto directo de la Dra. Azul Estefanía Torres Rivera, directora médica de Advanced Fertility Center Cancún.',
        noIndex: true,
        load: () => import('@/content/pages/dra-azul-estefania-torres-contacto'),
    },

    // ---------------------------------------------------------------
    // Legales y utilitarias
    // ---------------------------------------------------------------
    'aviso-de-privacidad': {
        locale: 'es',
        title: 'Aviso de Privacidad',
        description:
            'Aviso de privacidad de Advanced Fertility Center Cancún conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
        counterpart: 'privacy-notice',
        priority: 0.3,
        load: () => import('@/content/pages/aviso-de-privacidad'),
    },
    'privacy-notice': {
        locale: 'en',
        title: 'Privacy Notice',
        description:
            'Privacy notice of Advanced Fertility Center Cancun under the Mexican Federal Law on Protection of Personal Data Held by Private Parties.',
        counterpart: 'aviso-de-privacidad',
        priority: 0.3,
        load: () => import('@/content/pages/privacy-notice'),
    },
    'terminos-y-condiciones': {
        locale: 'es',
        title: 'Términos y Condiciones',
        description:
            'Términos y condiciones de uso del sitio de Advanced Fertility Center Cancún. La información publicada tiene fines informativos y educativos.',
        priority: 0.3,
        load: () => import('@/content/pages/terminos-y-condiciones'),
    },
    'gracias': {
        locale: 'es',
        title: 'Gracias por Contactarnos',
        description: 'Hemos recibido tu solicitud. Nuestro equipo médico se pondrá en contacto contigo en menos de 24 horas.',
        counterpart: 'thanks-your',
        noIndex: true,
        load: () => import('@/content/pages/gracias'),
    },
    'thanks-your': {
        locale: 'en',
        title: 'Thank You for Contacting Us',
        description: 'We have received your request. Our medical team will contact you within 24 hours.',
        counterpart: 'gracias',
        noIndex: true,
        load: () => import('@/content/pages/thanks-your'),
    },
}

/**
 * Slugs que no tienen archivo propio: son la versión localizada de otra página
 * y se resuelven redirigiendo. Mapea slug en español -> slug en inglés.
 */
export const esToEnSlug: Record<string, string> = {
    'sobre-fertility-center-cancun': 'about-fertility-center',
    'turismo-medico': 'international-patients',
    'instalaciones': 'clinic-tour',
    'laboratorios-y-servicios': 'laboratories-and-services',
    'equipo': 'ivf-team',
    'certificaciones-acreditaciones-y-alianzas': 'certifications-accreditations-and-partnerships',
    'tratamientos': 'fertility-treatments',
    'fiv-fertilizacion-in-vitro': 'ivf-in-vitro-fertilization',
    'fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo': 'in-vitro-fertilization-with-genetic-testing-and-sex-selection',
    'mini-fiv': 'mini-ivf',
    'inseminacion-artificial': 'artificial-insemination',
    'donacion-de-ovulos': 'egg-donation',
    'donacion-de-espermatozoides': 'sperm-donation',
    'donacion-y-adopcion-embriones': 'embryo-donation-and-adoption',
    'metodo-ropa': 'ropa-method',
    'preservacion-de-la-fertilidad': 'fertility-preservation',
    'coito-programado-e-induccion-de-ovulacion': 'timed-intercourse-and-ovulation-induction',
    'transferencia-de-embriones-y-preparacion-endometrial': 'embryo-transfer-and-endometrial-preparation',
    'construyendo-familias': 'building-families',
    'estudios-geneticos': 'genetic-studies',
    'fertilizacion-in-vitro-en-fiv-ciclo-natural': 'in-vitro-fertilization-in-ivf-natural-cycle',
    'doble-acumulacion': 'double-accumulation-back-to-back-or-duo-stim',
    'primera-visita-a-nuestra-clinica-de-fertilidad': 'first-visit',
    'testimonios': 'testimonials',
    'contacto': 'contact-ivf-doctors',
    'aviso-de-privacidad': 'privacy-notice',
    'programa-de-referidos': 'referral-program',
    'promociones': 'promotions',
    'soporte-internacional': 'international-support',
    'add-ons-complementos-para-optimizar-tu-tratamiento-de-fertilidad':
        'add-ons-enhancements-to-optimize-your-fertility-treatment',
    'gracias': 'thanks-your',
}

export const enToEsSlug: Record<string, string> = Object.fromEntries(
    Object.entries(esToEnSlug).map(([es, en]) => [en, es])
)

/**
 * URLs heredadas de WordPress que ya no existen y deben redirigir al slug actual.
 */
export const legacySlugRedirects: Record<string, string> = {
    'ovodon': 'donacion-de-ovulos',
    'programa-donacion-lifestart': 'donacion-de-espermatozoides',
    'comunidad-lgbt-tratamiento': 'construyendo-familias',
    'lgbt-community-treatments': 'building-families',
}

export function getContentPage(slug: string): ContentPage | undefined {
    return contentPages[slug]
}

/** Páginas que deben entrar al sitemap, con su locale y su alterno. */
export function getIndexablePages(): Array<{ slug: string; page: ContentPage }> {
    return Object.entries(contentPages)
        .filter(([, page]) => !page.noIndex)
        .map(([slug, page]) => ({ slug, page }))
}
