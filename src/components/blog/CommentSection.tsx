'use client'

import { useState } from 'react'
import { submitComment, type Comment } from '@/lib/actions/comments'
import { MessageCircle, Send } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface CommentSectionProps {
    postId: string
    initialComments: Comment[]
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
    const [comments, setComments] = useState(initialComments)
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contenido: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)
        setIsSubmitting(true)

        const result = await submitComment({
            post_id: postId,
            ...formData
        })

        if (result.success) {
            setMessage({ type: 'success', text: result.message })
            setFormData({ nombre: '', email: '', contenido: '' })
        } else {
            setMessage({ type: 'error', text: result.message })
        }

        setIsSubmitting(false)
    }

    return (
        <div>
            <h2 className="text-3xl font-serif text-brand-violet mb-8 flex items-center gap-3">
                <MessageCircle className="w-8 h-8" />
                Comentarios ({comments.length})
            </h2>

            {/* Comments List */}
            {comments.length > 0 && (
                <div className="space-y-6 mb-12">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-brand-green pl-6 py-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-10 h-10 rounded-full bg-brand-violet/10 flex items-center justify-center text-brand-violet font-bold">
                                    {comment.nombre.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-brand-violet">{comment.nombre}</p>
                                    <p className="text-base text-slate-400">
                                        {new Date(comment.created_at).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{comment.contenido}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Comment Form */}
            <div className="bg-brand-slate rounded-2xl p-8">
                <h3 className="text-xl font-serif text-brand-violet mb-6">
                    Deja tu comentario
                </h3>

                {message && (
                    <div className={`mb-6 p-4 rounded-xl ${message.type === 'success'
                            ? 'bg-brand-green/10 text-brand-violet border border-brand-green/30'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="nombre" className="block text-base font-bold text-brand-violet mb-2">
                                Nombre *
                            </label>
                            <Input
                                id="nombre"
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                                placeholder="Tu nombre"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-base font-bold text-brand-violet mb-2">
                                Email *
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="tu@email.com"
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="contenido" className="block text-base font-bold text-brand-violet mb-2">
                            Comentario *
                        </label>
                        <textarea
                            id="contenido"
                            rows={4}
                            value={formData.contenido}
                            onChange={(e) => setFormData(prev => ({ ...prev, contenido: e.target.value }))}
                            placeholder="Escribe tu comentario..."
                            disabled={isSubmitting}
                            required
                            className="flex w-full rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-base transition-all placeholder:text-slate-400 placeholder:font-light focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:border-brand-violet hover:border-brand-violet/30 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" isLoading={isSubmitting}>
                            <Send className="w-4 h-4" />
                            Enviar comentario
                        </Button>
                    </div>

                    <p className="text-base text-slate-500 italic">
                        * Tu comentario será revisado antes de ser publicado
                    </p>
                </form>
            </div>
        </div>
    )
}
