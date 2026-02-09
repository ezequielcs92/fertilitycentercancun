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
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                    {/* Image */}
                    {post.imagen_banner_url ? (
                        <Link href={`/blog/${post.slug}`}>
                            <div className="relative h-56 bg-brand-slate overflow-hidden">
                                <Image
                                    src={post.imagen_banner_url}
                                    alt={post.titulo}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                    ) : (
                        <div className="h-56 bg-gradient-to-br from-brand-violet to-brand-green/30" />
                    )}

                    {/* Content */}
                    <div className="p-6">
                        {/* Category */}
                        {post.categoria && (
                            <Link
                                href={`/blog/categoria/${post.categoria.slug}`}
                                className="inline-block mb-3 px-3 py-1 bg-brand-green/20 text-brand-violet text-xs font-bold uppercase tracking-wider rounded-full hover:bg-brand-green/30 transition-colors"
                            >
                                {post.categoria.nombre}
                            </Link>
                        )}

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-2xl font-serif text-brand-violet mb-3 group-hover:text-brand-green transition-colors line-clamp-2">
                                {post.titulo}
                            </h3>
                        </Link>

                        {/* Excerpt */}
                        {post.extracto && (
                            <p className="text-slate-600 text-sm font-light mb-4 line-clamp-3 leading-relaxed">
                                {post.extracto}
                            </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-slate-400">
                            {post.fecha_publicacion && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <time dateTime={post.fecha_publicacion}>
                                        {new Date(post.fecha_publicacion).toLocaleDateString('es-ES', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </time>
                                </div>
                            )}

                            <Link
                                href={`/blog/${post.slug}`}
                                className="text-brand-violet font-bold hover:underline"
                            >
                                Leer más →
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}
