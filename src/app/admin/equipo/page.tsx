'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, UserPlus, Search } from 'lucide-react';
import Link from 'next/link';
import { getTeamMembers, deleteTeamMember, type TeamMember } from '@/lib/actions/team';
import { Button } from '@/components/ui/Button';

export default function TeamManagerPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchMembers = async () => {
        setLoading(true);
        const data = await getTeamMembers();
        setMembers(data as TeamMember[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de que deseas eliminar este miembro del equipo?')) {
            const result = await deleteTeamMember(id);
            if (result.success) {
                fetchMembers();
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        }
    };

    const filteredMembers = members.filter(m =>
        m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-serif text-brand-violet mb-2">Gestor de Equipo Médico</h1>
                    <p className="text-slate-500 font-light">Administra los perfiles de los especialistas de la clínica.</p>
                </div>
                <Link href="/admin/equipo/nuevo">
                    <Button className="bg-brand-violet text-white flex items-center gap-2 px-6 py-4 rounded-2xl shadow-xl shadow-brand-violet/20 hover:bg-brand-green hover:text-brand-violet transition-all">
                        <UserPlus className="w-5 h-5" /> Agregar Especialista
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-brand-violet/5 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o especialidad..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 text-center">
                        <div className="w-12 h-12 border-4 border-brand-violet border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 italic">Cargando especialistas...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-left">
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Especialista</th>
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Especialidad</th>
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Contacto</th>
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredMembers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic">
                                            No se encontraron especialistas.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMembers.map((member) => (
                                        <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-brand-green/20">
                                                        <img
                                                            src={member.foto_url || 'https://via.placeholder.com/150'}
                                                            alt={member.nombre}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-brand-violet">{member.nombre}</p>
                                                        <p className="text-xs text-slate-400 italic">{member.ubicacion}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="px-3 py-1 bg-brand-violet/5 text-brand-violet rounded-full text-xs font-medium">
                                                    {member.especialidad}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-sm">
                                                    <p className="text-slate-600">{member.email}</p>
                                                    <p className="text-slate-400 text-xs">{member.telefono}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                {member.activo ? (
                                                    <span className="flex items-center gap-1.5 text-brand-green text-xs font-bold">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" /> Activo
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Inactivo
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/equipo/${member.id}/editar`}>
                                                        <button
                                                            title="Editar especialista"
                                                            className="p-2 text-slate-400 hover:text-brand-violet hover:bg-white rounded-lg shadow-sm transition-all"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(member.id!)}
                                                        title="Eliminar especialista"
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
