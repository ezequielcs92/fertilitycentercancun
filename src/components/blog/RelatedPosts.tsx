import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/actions/posts'

interface RelatedPostsProps {
    posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null

    return (
        <section>
            <h2 className="text-3xl font-serif text-brand-violet mb-8">
                Artículos Relacionados
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    >
                        {post.imagen_banner_url ? (
                            <div className="relative h-40 bg-brand-slate overflow-hidden">
                                <Image
                                    src={post.imagen_banner_url}
                                    alt={post.titulo}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ) : (
                            <div className="h-40 bg-gradient-to-br from-brand-violet/20 to-brand-green/20" />
                        )}

                        <div className="p-5">
                            <h3 className="font-serif text-lg text-brand-violet group-hover:text-brand-green transition-colors line-clamp-2 mb-2">
                                {post.titulo}
                            </h3>
                            {post.extracto && (
                                <p className="text-base text-slate-600 line-clamp-2 font-light">
                                    {post.extracto}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
