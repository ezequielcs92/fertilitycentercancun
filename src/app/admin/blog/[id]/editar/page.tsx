import React from 'react';
import PostForm from '@/components/admin/PostForm';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
    params: {
        id: string;
    };
}

export default async function EditPostPage(props: EditPostPageProps) {
    const params = await props.params;

    const supabase = await createClient();
    if (!supabase) return notFound();

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!post) return notFound();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-serif text-brand-violet mb-2">Editar Artículo</h1>
                <p className="text-slate-500 font-light text-lg italic">Modificando: {post.titulo}</p>
            </div>

            <PostForm initialData={post} />
        </div>
    );
}
