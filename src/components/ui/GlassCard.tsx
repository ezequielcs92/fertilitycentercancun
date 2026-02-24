"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className={`
        bg-white/40 backdrop-blur-md 
        border border-white/60 
        shadow-[0_8px_32px_0_rgba(117,98,162,0.1)] 
        rounded-[2.5rem] 
        hover:shadow-[0_8px_32px_0_rgba(117,98,162,0.15)] 
        transition-all duration-500
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
}
