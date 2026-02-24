
"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import FAQAccordion from '@/components/layout/FAQAccordion';
import { FAQ_DATA, type FAQItem } from '@/data/faqs';
import { Search, Filter, Stethoscope, Heart, Users, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'todos', label: 'Todas las preguntas', icon: MessageCircle },
  { id: 'clinica', label: 'Nuestra Clínica', icon: Stethoscope },
  { id: 'tratamientos', label: 'Tratamientos', icon: Heart },
  { id: 'pacientes', label: 'Pacientes y Procesos', icon: Users },
];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');

  const filteredFaqs = FAQ_DATA.filter(faq => {
    const matchesSearch = faq.pregunta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.respuesta.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || faq.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-brand-slate min-h-screen pb-24">
      <PageHeader
        title="Preguntas Frecuentes"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'FAQs', href: '#' }
        ]}
      />

      <Container className="pt-16 pb-24">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Categories Sidebar */}
          <div className="lg:w-1/3 xl:w-1/4 space-y-3">
            <div className="bg-white/50 backdrop-blur-sm p-3 rounded-[2.5rem] border border-white/50 shadow-sm">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-medium ${activeCategory === cat.id
                      ? 'bg-brand-violet text-white shadow-lg shadow-brand-violet/20'
                      : 'text-slate-500 hover:bg-white hover:text-brand-violet'
                    }`}
                >
                  <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-white' : 'text-brand-green'}`} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="p-8 bg-brand-violet/5 rounded-[2rem] border border-brand-violet/10">
              <h4 className="text-brand-violet font-serif text-xl mb-3">¿Aún tienes dudas?</h4>
              <p className="text-slate-500 text-sm font-light mb-6">Estamos aquí para ayudarte en cada paso de tu camino.</p>
              <a
                href="/contacto"
                className="block text-center py-4 bg-brand-green text-brand-violet font-bold rounded-xl hover:bg-brand-violet hover:text-white transition-all shadow-md"
              >
                Contactar ahora
              </a>
            </div>
          </div>

          {/* FAQ List and Search */}
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="relative mb-8">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca tu duda (ej: FIV, costos, ubicación...)"
                className="w-full pl-16 pr-8 py-6 rounded-[2rem] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-violet/5 bg-white shadow-sm text-lg"
              />
            </div>

            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FAQAccordion
                      id={faq.id}
                      pregunta={faq.pregunta}
                      respuesta={faq.respuesta}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-white/50 rounded-[3rem] border border-white">
                  <Search className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif text-brand-violet mb-2">No encontramos lo que buscas</h3>
                  <p className="text-slate-400 font-light">Intenta con otros términos o elige una categoría diferente.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
