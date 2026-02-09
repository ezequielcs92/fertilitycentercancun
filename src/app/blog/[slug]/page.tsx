import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts } from '@/lib/actions/posts'
import { getApprovedComments } from '@/lib/actions/comments'
import PostContent from '@/components/blog/PostContent'
import CommentSection from '@/components/blog/CommentSection'
import RelatedPosts from '@/components/blog/RelatedPosts'
import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Eye } from 'lucide-react'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post no encontrado'
        }
    }

    return {
        title: `${post.titulo} | Fertility Center Cancun`,
        description: post.extracto || post.titulo,
        openGraph: {
            title: post.titulo,
            description: post.extracto || post.titulo,
            type: 'article',
            publishedTime: post.fecha_publicacion || undefined,
            images: post.imagen_banner_url ? [post.imagen_banner_url] : [],
        },
    }
}

export const revalidate = 60 // ISR

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    const [comments, relatedPosts] = await Promise.all([
        getApprovedComments(post.id),
        getRelatedPosts(post.id, post.categoria_id, 3)
    ])

    return (
        <main className="min-h-screen bg-white">
            {/* Banner Image */}
            {post.imagen_banner_url && (
                <div className="relative w-full h-[400px] md:h-[500px] bg-brand-slate">
                    <Image
                        src={post.imagen_banner_url}
                        alt={post.titulo}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            )}

            {/* Article Container */}
            <article className="container mx-auto px-6 max-w-4xl">
                <div className="-mt-32 relative z-10">
                    {/* Header Card */}
                    <header className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-12">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                            <a href="/" className="hover:text-brand-violet">Inicio</a>
                            <span>/</span>
                            <a href="/blog" className="hover:text-brand-violet">Blog</a>
                            {post.categoria && (
                                <>
                                    <span>/</span>
                                    <a
                                        href={`/blog/categoria/${post.categoria.slug}`}
                                        className="hover:text-brand-violet"
                                    >
                                        {post.categoria.nombre}
                                    </a>
                                </>
                            )}
                        </nav>

                        {/* Category Badge */}
                        {post.categoria && (
                            <div className="mb-4">
                                <span className="inline-block px-4 py-1 bg-brand-green/20 text-brand-violet text-xs font-bold uppercase tracking-wider rounded-full">
                                    {post.categoria.nombre}
                                </span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-serif text-brand-violet mb-6 leading-tight">
                            {post.titulo}
                        </h1>

                        {/* Excerpt */}
                        {post.extracto && (
                            <p className="text-xl text-slate-600 font-light mb-6 leading-relaxed">
                                {post.extracto}
                            </p>
                        )}

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                            {post.fecha_publicacion && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={post.fecha_publicacion}>
                                        {new Date(post.fecha_publicacion).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{post.views || 0} vistas</span>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
                        <PostContent html={post.contenido_html} />
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mb-12">
                            <RelatedPosts posts={relatedPosts} />
                        </div>
                    )}

                    {/* Comments */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                        <CommentSection postId={post.id} initialComments={comments} />
                    </div>
                </div>
            </article>
        </main>
    )
}
