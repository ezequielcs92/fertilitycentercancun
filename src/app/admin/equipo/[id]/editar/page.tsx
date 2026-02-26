import React from 'react';
import TeamMemberForm from '@/components/admin/TeamMemberForm';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

interface EditSpecialistPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditSpecialistPage({ params }: EditSpecialistPageProps) {
    const { id } = await params;
    const supabase = await createClient();
    if (!supabase) return notFound();

    const { data: member } = await supabase
        .from('equipo_medico')
        .select('*')
        .eq('id', id)
        .single();

    if (!member) return notFound();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-serif text-brand-violet mb-2">Editar Especialista</h1>
                <p className="text-slate-500 font-light text-lg italic">Modifica el perfil de {member.nombre}.</p>
            </div>

            <TeamMemberForm initialData={member} />
        </div>
    );
}
