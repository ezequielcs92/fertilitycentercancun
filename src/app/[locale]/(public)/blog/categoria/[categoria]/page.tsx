import { getPostsByCategory, getCategoriesTranslated, type Category } from '@/lib/actions/posts'
import BlogGrid from '@/components/blog/BlogGrid'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ categoria: string, locale: string }> }): Promise<Metadata> {
    const { categoria, locale } = await params;
    const categories = await getCategoriesTranslated(locale)
    const category = categories.find((cat: Category) => cat.slug === categoria)

    if (!category) {
        return { title: locale === 'en' ? 'Category not found' : 'Categoría no encontrada' }
    }

    return {
        title: `${category.nombre} | Blog | Fertility Center Cancun`,
        description: category.descripcion || `Artículos sobre ${category.nombre}`,
    }
}

export const revalidate = 60

export default async function CategoryPage({ params }: { params: Promise<{ categoria: string, locale: string }> }) {
    const { categoria, locale } = await params;
    const isEs = locale === 'es'

    const [posts, categories] = await Promise.all([
        getPostsByCategory(categoria, 50, locale),
        getCategoriesTranslated(locale)
    ])

    const category = categories.find((cat: Category) => cat.slug === categoria)

    if (!category) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-white py-20">
            {/* Header */}
            <section className="bg-gradient-to-b from-brand-slate to-white py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <Link href="/blog" className="text-brand-violet hover:underline mb-4 inline-block">
                            {isEs ? '← Volver al blog' : '← Back to blog'}
                        </Link>
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
                                {isEs ? 'No hay artículos en esta categoría aún.' : 'There are no articles in this category yet.'}
                            </p>
                        </div>
                    ) : (
                        <BlogGrid posts={posts} locale={locale} />
                    )}
                </div>
            </section>
        </main>
    )
}
