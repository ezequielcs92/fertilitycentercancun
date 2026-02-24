
export interface FAQItem {
    id: string;
    pregunta: string;
    respuesta: string;
    categoria: 'clinica' | 'tratamientos' | 'pacientes';
}

export const FAQ_DATA: FAQItem[] = [
    // Clínica / General
    {
        id: 'faq-1',
        categoria: 'clinica',
        pregunta: '¿Por qué elegir Advanced Fertility Center Cancun?',
        respuesta: 'Elegirnos significa contar con atención de primer nivel, las tasas de éxito más altas, especialistas líderes en medicina reproductiva, tecnología de punta y apoyo emocional integral, todo en una ubicación paradisíaca con certificaciones internacionales.'
    },
    {
        id: 'faq-2',
        categoria: 'clinica',
        pregunta: '¿Dónde se encuentran ubicados?',
        respuesta: 'Estamos ubicados en Cancún, Quintana Roo, México: Edificio Tulum Center – Avenida Tulum, Super Manzana 9, Manzana 1, Lote 3. Código Postal 77500.'
    },
    {
        id: 'faq-3',
        categoria: 'clinica',
        pregunta: '¿Cuáles son los horarios de atención?',
        respuesta: 'Lunes a Viernes de 8:00 a.m. a 5:00 p.m. (última consulta de primera vez a las 4:00 p.m.) y Sábados de 9:00 a.m. a 2:00 p.m. (última consulta de primera vez a las 1:00 p.m.).'
    },
    // Tratamientos
    {
        id: 'faq-4',
        categoria: 'tratamientos',
        pregunta: '¿Cuándo se debe consultar a un especialista en fertilidad?',
        respuesta: 'Si has intentado concebir durante un año sin éxito (o 6 meses si eres mayor de 35 años), o si tienes alguna condición previamente diagnosticada como miomas o trastornos ovulatorios, es fundamental buscar una evaluación profesional sin demora.'
    },
    {
        id: 'faq-5',
        categoria: 'tratamientos',
        pregunta: '¿Qué tratamientos de fertilidad ofrecen?',
        respuesta: 'Ofrecemos coito programado, inseminación intrauterina (IIU), fertilización in vitro (FIV), ovodonación, criopreservación, adopción de embriones, método ROPA y diagnóstico genético preimplantacional con selección de sexo, entre otros.'
    },
    {
        id: 'faq-6',
        categoria: 'tratamientos',
        pregunta: '¿Cuál es el precio de la consulta?',
        respuesta: 'La consulta tiene un costo de $1,100 MXN e incluye una ecografía transvaginal para evaluar útero y ovarios, además de la creación de tu historial médico completo para una evaluación integral.'
    },
    {
        id: 'faq-7',
        categoria: 'tratamientos',
        pregunta: '¿Tengo miomas y quiero quedar embarazada, qué opciones tengo?',
        respuesta: 'Existen tratamientos médicos conservadores y quirúrgicos (como la miomectomía laparoscópica) para preservar el útero. Cada caso debe ser evaluado individualmente para determinar el impacto de los miomas en la fertilidad.'
    },
    {
        id: 'faq-8',
        categoria: 'tratamientos',
        pregunta: '¿Cómo afecta el SOP a mi fertilidad?',
        respuesta: 'El Síndrome de Ovario Poliquístico altera la ovulación debido a desajustes hormonales. Sin embargo, con medicación adecuada para inducir la ovulación y cambios en el estilo de vida, entre el 70-90% de las pacientes logran ovular y muchas consiguen el embarazo en pocos meses.'
    },
    {
        id: 'faq-9',
        categoria: 'tratamientos',
        pregunta: 'Me ligué las trompas, ¿puedo volver a quedar embarazada?',
        respuesta: 'Sí, es posible mediante técnicas de recanalización tubárica (dependiendo del caso) o, más comúnmente, a través de tratamientos de alta complejidad como la FIV/ICSI, que saltan la función de las trompas.'
    },
    // Pacientes / Procesos
    {
        id: 'faq-10',
        categoria: 'pacientes',
        pregunta: '¿Qué pasará durante mi primera consulta?',
        respuesta: 'Un especialista revisará tu historial, realizará un ultrasonido transvaginal y discutirá contigo tus objetivos y posibles causas de infertilidad. La sesión dura aproximadamente una hora.'
    },
    {
        id: 'faq-11',
        categoria: 'pacientes',
        pregunta: '¿Ofrecen consultas virtuales?',
        respuesta: 'Sí, ofrecemos consultas virtuales sin costo adicional para pacientes que no pueden asistir en persona. Solo necesitamos tu nombre, fecha de nacimiento, correo y teléfono para agendarla.'
    },
    {
        id: 'faq-12',
        categoria: 'pacientes',
        pregunta: '¿Ofrecen apoyo emocional durante el proceso?',
        respuesta: 'Entendemos que este es un camino emocionalmente desafiante, por lo que ofrecemos servicios de apoyo psicológico y acompañamiento emocional para todas nuestras pacientes.'
    },
    {
        id: 'faq-13',
        categoria: 'pacientes',
        pregunta: '¿Tienen opciones para parejas del mismo sexo o personas sin pareja?',
        respuesta: 'Absolutamente. Ofrecemos opciones como banco de donantes (esperma y óvulos), método ROPA para parejas de mujeres y convenios para gestación subrogada, permitiendo que todos cumplan su sueño de ser padres.'
    },
    {
        id: 'faq-14',
        categoria: 'pacientes',
        pregunta: '¿Existe lista de espera para los tratamientos?',
        respuesta: 'No tenemos lista de espera. El tiempo para una primera consulta suele ser de 2 a 3 días, y el tratamiento puede iniciarse tan pronto como se complete la evaluación inicial.'
    }
];
