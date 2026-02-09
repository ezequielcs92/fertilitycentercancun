import { getPublishedPosts, getCategories } from '@/lib/actions/posts'
import BlogGrid from '@/components/blog/BlogGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog Médico | Fertility Center Cancun',
    description: 'Artículos, guías y últimas noticias sobre tratamientos de fertilidad, reproducción asistida y salud reproductiva.',
    openGraph: {
        title: 'Blog Médico | Fertility Center Cancun',
        description: 'Artículos, guías y últimas noticias sobre tratamientos de fertilidad',
        type: 'website',
    },
}

export const revalidate = 60 // ISR: Revalidar cada 60 segundos

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getPublishedPosts(12),
        getCategories()
    ])

    return (
        <main className="min-h-screen bg-white py-20">
            {/* Header */}
            <section className="bg-gradient-to-b from-brand-slate to-white py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-serif text-brand-violet mb-6">
                            Blog Médico
                        </h1>
                        <p className="text-xl text-slate-600 font-light">
                            Información actualizada sobre fertilidad, tratamientos de reproducción asistida y salud reproductiva de la mano de nuestros especialistas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            {categories.length > 0 && (
                <section className="border-b border-slate-100 py-6 sticky top-0 bg-white z-10">
                    <div className="container mx-auto px-6">
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            <a
                                href="/blog"
                                className="px-6 py-2 rounded-full border-2 border-brand-violet text-brand-violet font-bold text-sm whitespace-nowrap hover:bg-brand-violet hover:text-white transition-colors"
                            >
                                Todos
                            </a>
                            {categories.map((cat: any) => (
                                <a
                                    key={cat.id}
                                    href={`/blog/categoria/${cat.slug}`}
                                    className="px-6 py-2 rounded-full border-2 border-slate-200 text-slate-600 font-bold text-sm whitespace-nowrap hover:border-brand-violet hover:text-brand-violet transition-colors"
                                >
                                    {cat.nombre}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Posts Grid */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">
                                Aún no hay artículos publicados. ¡Próximamente!
                            </p>
                        </div>
                    ) : (
                        <BlogGrid posts={posts} />
                    )}
                </div>
            </section>
        </main>
    )
}
