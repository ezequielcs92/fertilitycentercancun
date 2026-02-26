import React from 'react';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

export default function NewSpecialistPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-serif text-brand-violet mb-2">Nuevo Especialista</h1>
                <p className="text-slate-500 font-light text-lg italic">Crea un nuevo perfil para el equipo médico.</p>
            </div>

            <TeamMemberForm />
        </div>
    );
}
