import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import type { Post } from '@/lib/actions/posts'

interface BlogGridProps {
    posts: Post[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <article
                    key={post.id}
                    className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(117,98,162,0.05)] hover:shadow-[0_20px_50px_rgba(117,98,162,0.12)] hover:-translate-y-2 transition-all duration-500 border border-slate-50 flex flex-col h-full"
                >
                    {/* Image */}
                    <div className="relative h-64 bg-slate-50 overflow-hidden">
                        {post.imagen_banner_url ? (
                            <Image
                                src={post.imagen_banner_url}
                                alt={post.titulo}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/10 to-brand-green/10 flex items-center justify-center">
                                <span className="text-brand-violet/20 font-serif italic text-4xl">AFCC</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />

                        {post.categoria && (
                            <div className="absolute top-6 left-6 z-10">
                                <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-brand-violet text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                                    {post.categoria.nombre}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs font-medium uppercase tracking-[0.1em]">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={post.fecha_publicacion || ''}>
                                {post.fecha_publicacion ? new Date(post.fecha_publicacion).toLocaleDateString('es-ES', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) : 'Próximamente'}
                            </time>
                        </div>

                        <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-2xl font-serif text-brand-violet mb-4 leading-tight group-hover:text-brand-green transition-colors line-clamp-2 underline decoration-transparent group-hover:decoration-brand-green/30 px-px">
                                {post.titulo}
                            </h3>
                        </Link>

                        <p className="text-slate-500 font-light leading-relaxed mb-8 line-clamp-3 text-sm">
                            {post.extracto}
                        </p>

                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="flex items-center gap-2 text-brand-violet font-bold text-sm tracking-wider uppercase group/link"
                            >
                                <span>Leer artículo</span>
                                <div className="w-6 h-[1px] bg-brand-violet group-hover/link:w-10 transition-all origin-left" />
                            </Link>

                            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                                {post.views > 0 ? `${post.views} VISTAS` : 'NUEVO'}
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}
