'use client';

import React from 'react';
import { motion } from 'framer-motion';

function seededValue(seed: number) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
}

const elements = Array.from({ length: 20 }, (_, i) => {
    const base = i + 1;

    return {
        id: i,
        size: seededValue(base * 1.1) * 100 + 50,
        x: seededValue(base * 2.2) * 100,
        y: seededValue(base * 3.3) * 100,
        driftX: seededValue(base * 4.4) * 50 - 25,
        duration: seededValue(base * 5.5) * 20 + 20,
        delay: seededValue(base * 6.6) * -20,
    };
});

function px(value: number) {
    return `${value.toFixed(3)}px`;
}

function percent(value: number) {
    return `${value.toFixed(4)}%`;
}

export default function FloatingElements() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className="absolute rounded-full bg-brand-violet/[0.03] border border-brand-violet/[0.05] backdrop-blur-[2px]"
                    style={{
                        width: px(el.size),
                        height: px(el.size),
                        left: percent(el.x),
                        top: percent(el.y),
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, el.driftX, 0],
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: el.delay,
                    }}
                />
            ))}

            {/* Subtle Gradient Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>
    );
}
