'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView, animate } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';

const stats = [
    {
        number: 7654,
        label: "Ciclos realizados",
        sublabel: "2012 - 2025",
        delay: 0.1,
        suffix: ""
    },
    {
        number: 100,
        label: "Betas positivas",
        sublabel: "",
        delay: 0.2,
        suffix: ""
    },
    {
        number: 1000,
        label: "Bebés",
        sublabel: "",
        delay: 0.3,
        suffix: "+"
    }
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const rounded = useSpring(count, { stiffness: 50, damping: 20 });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (inView) {
            animate(count, value, { duration: 2, ease: "easeOut" });
        }
    }, [inView, value]);

    useEffect(() => {
        return rounded.on("change", (v) => {
            setDisplayValue(Math.floor(v).toLocaleString());
        });
    }, [rounded]);

    return (
        <span ref={ref} className="block text-6xl md:text-7xl font-sans font-bold text-white mb-4 tracking-tighter">
            {displayValue}{suffix}
        </span>
    );
}

export default function SuccessRates() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image Collage Style */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-brand-violet/90 z-10" />
                <div className="grid grid-cols-4 md:grid-cols-6 h-full opacity-20">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="relative aspect-square">
                            <Image
                                src={i % 2 === 0 ? "/maternity.png" : "/lab.png"}
                                alt="Background Tile"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Container className="relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif text-white mb-4"
                    >
                        Nuestras tasas de <span className="text-brand-green italic">éxitos</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: stat.delay, duration: 0.5 }}
                            className="relative group py-12 px-8 flex flex-col items-center justify-center text-center"
                        >
                            {/* Accent Border - Matching the screenshot style */}
                            <div className="absolute inset-0 border-[3px] border-brand-green/30 rounded-[3rem] group-hover:border-brand-green transition-colors duration-500" />
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[3rem] -z-10" />

                            <div className="relative z-10">
                                <Counter value={stat.number} suffix={stat.suffix} />
                                <h3 className="text-2xl font-serif text-brand-green font-medium mb-1">
                                    {stat.label}
                                </h3>
                                {stat.sublabel && (
                                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                                        {stat.sublabel}
                                    </p>
                                )}
                            </div>

                            {/* Decorative Corner Glow */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-brand-green/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
