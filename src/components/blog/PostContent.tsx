'use client'

interface PostContentProps {
    html: string
}

export default function PostContent({ html }: PostContentProps) {
    return (
        <div
            className="prose prose-lg max-w-none
        prose-headings:font-serif prose-headings:text-brand-violet
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
        prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
        prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
        prose-a:text-brand-violet prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
        prose-strong:text-brand-violet prose-strong:font-bold
        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
        prose-li:text-slate-700 prose-li:mb-2
        prose-blockquote:border-l-4 prose-blockquote:border-brand-green prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600
        prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
        prose-code:text-brand-violet prose-code:bg-brand-slate prose-code:px-2 prose-code:py-1 prose-code:rounded
        prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:p-6
        prose-table:my-8 prose-table:border-collapse
        prose-th:bg-brand-violet prose-th:text-white prose-th:p-3 prose-th:text-left
        prose-td:border prose-td:border-slate-200 prose-td:p-3
      "
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}
