import { getPostsByCategory, getCategories } from '@/lib/actions/posts'
import BlogGrid from '@/components/blog/BlogGrid'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { categoria: string } }): Promise<Metadata> {
    const categories = await getCategories()
    const category = categories.find((cat: any) => cat.slug === params.categoria)

    if (!category) {
        return { title: 'Categoría no encontrada' }
    }

    return {
        title: `${category.nombre} | Blog | Fertility Center Cancun`,
        description: category.descripcion || `Artículos sobre ${category.nombre}`,
    }
}

export const revalidate = 60

export default async function CategoryPage({ params }: { params: { categoria: string } }) {
    const [posts, categories] = await Promise.all([
        getPostsByCategory(params.categoria, 50),
        getCategories()
    ])

    const category = categories.find((cat: any) => cat.slug === params.categoria)

    if (!category) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-white py-20">
            {/* Header */}
            <section className="bg-gradient-to-b from-brand-slate to-white py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <a href="/blog" className="text-brand-violet hover:underline mb-4 inline-block">
                            ← Volver al blog
                        </a>
                        <h1 className="text-5xl md:text-7xl font-serif text-brand-violet mb-6">
                            {category.nombre}
                        </h1>
                        {category.descripcion && (
                            <p className="text-xl text-slate-600 font-light">
                                {category.descripcion}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Posts */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">
                                No hay artículos en esta categoría aún.
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
