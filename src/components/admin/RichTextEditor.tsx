'use client';

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    return (
        <Editor
            id="tinymce-rich-text-editor"
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
            value={value}
            onEditorChange={(content) => onChange(content)}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                branding: false,
                promotion: false,
                setup: (editor: any) => {
                    editor.on('init', () => {
                        const style = document.createElement('style');
                        style.innerHTML = `
                            .tox-notifications-container { display: none !important; }
                            .tox-promotion { display: none !important; }
                        `;
                        document.head.appendChild(style);
                    });
                }
            }}
        />
    );
}
