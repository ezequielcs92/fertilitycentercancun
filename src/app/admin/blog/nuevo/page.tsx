import React from 'react';
import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-serif text-brand-violet mb-2">Nuevo Artículo</h1>
                <p className="text-slate-500 font-light text-lg italic">Empieza a escribir tu próxima gran historia.</p>
            </div>

            <PostForm />
        </div>
    );
}
