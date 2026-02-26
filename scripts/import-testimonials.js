import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in environment");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testimonials = [
    // English testimonials from page.tsx HTML string
    {
        nombre: "Ioana Luca USA",
        mensaje: "I started the process of freezing my eggs in the US and when I found out that it wasn't covered by my insurance I started to think about what other options I have. I was also not impressed with the client service I was receiving from the clinic I was at, and I had heard that abroad they tend to treat the patients much better and the conditions are nicer. I was not disappointed! The minute I contacted the Fertility Center Cancun I was put in touch with Cynthia, who gave me all the information I needed and was always accessible and responsive via WhatsApp. Once I arrived at the clinic, I felt the same kind of care and attention from the entire staff, including Dr. Ray. He responded to all my many questions and was very responsive on WhatsApp, even after office hours, if I had a pressing concern. I did two cycles of egg freezing and I am very happy with the results! I am even considering another round, just in case.",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "Shon WuUSA",
        mensaje: "Dr Suástegui I can not say it enough, Thank you for taking the best care of me. This was Exquisite Care as if i was Royal. You treated me like family not just a patient. I needed 2nd opinions and labs before my laparoscopy and you made sure I was treated fair by other nurses and doctors. I had a mishap at the pharmacy and my Dr showed up & even translated for me. I have never in all my life had a Doctor that went above and beyond to make sure I was ok and treated fair before during and after surgery. My husband could not make the trip but Dr Suástegui kept him informed every step of the way.",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "Austin UTAH - USA",
        mensaje: "I can't say enough good things about Dr. Cojab and her team at AFCC. My wife and I live in the U.S. and have gone through 2 failed surgeries on my end and a failed IVF FET cycle from The Reproductive Care Center in Salt Lake City. The clinic in SLC was the worst medical/ professional experience I've ever had, and we are still in dispute with them over several different problems. AFCC is the complete opposite. AFCC was terrific at communication, always there for questions, the Doctor maintained regular follow up months after we left and had a few scares, they were extremely patient and accommodating with the million questions we had, and most of all- they succeeded! We are now 12 weeks pregnant and entering the second trimester. We spent 3 years and $40k dealing with 3 doctors that were always too \"busy\", non-caring, and/ or incompetent (you can see a previous review on this clinic on my page); then we went to Mexico and got it done in a few months at half the cost of a normal cycle. They were honest and realistic with us, where the American doctors were always just watching out for medical malpractice and limiting the information, they would give us to protect themselves. We also have 2 more embryos that AFCC was able to freeze, so we will likely be back in a year. The vacation in Cancun was a little bonus as well haha. I 100% recommend this clinic.",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "Amy Gutierrez GARDEN CITY",
        mensaje: "BEST PLACE EVER! They make your dreams come true! I’m a travel patient Im from Idaho and I recommend Dr Alfonso ❤️ I had best experience and great communication with Elizabeth. Just remember IVF is a process is a journey forsure. Keep positive and everything you dream of will come true. I highly recommend and will be having all my IVF babies here at AFCC forsure!",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "Alex USA",
        mensaje: "We had our two children with the help of the Fertility Center, Cancun and we cannot praise them enough. They are incredibly professional, the doctors are just unbelievable and their staff goes out of their way to make you feel comfortable and help you through your stay in Cancun. We hear from other people trying for years with other providers, we were successful within months and had our babies nine months afterwards without any problems thanks to their incredible professionalism and facilities.",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "Leon Avelino USA",
        mensaje: "We had our two children with the help of the Fertility Center, Cancun and we cannot praise them enough. They are incredibly professional, the doctors are just unbelievable and their staff goes out of their way to make you feel comfortable and help you through your stay in Cancun. We hear from other people trying for years with other providers, we were successful within months and had our babies nine months afterwards without any problems thanks to their incredible professionalism and facilities.",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "Brenda Breitkreutz",
        mensaje: "AFCC is so amazing! The staff is so friendly, the clinic very clean. Communication was great! Any questions or concerns I had were addressed, they really listened to me. Dr Romero is so caring and knowledgeable, and Eli has to be the sweetest and most helpful person on the planet! Because of AFCC I have my 2 most beautiful & perfect babies. I would tell anyone looking for a fertility clinic to choose them. I was able to bring my daughter back to meet everyone, and I can’t wait to bring my son back and do the same! I’m forever grateful.",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "D W Florida",
        mensaje: "The Fertility Center allowed for something I didn't think would be possible, we had our baby. Everyone at this facility made the process so smooth for us. They treated us like family! Elizabeth made sure we had everything logistically taken care of, and Dr. Romero has always made sure we were physically and emotionally prepared for the entire process. We would recommend the Center to anyone who has been trying to have their baby. You will be in the hands of the best of the best!",
        calificacion: 5,
        status: 'approved'
    },

    // From SuccessStories.tsx
    {
        nombre: "Mariana & Carlos",
        mensaje: "Después de 3 años de búsqueda, logramos nuestro sueño en el primer ciclo de FIV. El trato fue excepcional.",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "Elena S.",
        mensaje: "Gracias al programa de Donación de Óvulos, hoy tengo a mi pequeño en brazos. La transparencia fue lo que más me gustó.",
        calificacion: 5,
        status: 'approved'
    },
    {
        nombre: "Clara & Sofia",
        mensaje: "El Método ROPA nos permitió ser ambas parte del milagro. Estamos eternamente agradecidas con todo el equipo.",
        calificacion: 5,
        status: 'approved'
    }
];

async function insertTestimonials() {
    for (const t of testimonials) {
        const { error } = await supabase.from('testimonios_pacientes').insert([t]);
        if (error) {
            console.error('Error inserting testimonial', t.nombre, error);
        } else {
            console.log('Inserted:', t.nombre);
        }
    }
}

insertTestimonials();
