import { loadEnvConfig } from '@next/env';
loadEnvConfig('./');

import { createClient } from '@supabase/supabase-js';

async function test() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!url || !key) {
        console.error("Missing credentials!");
        return;
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      categoria:categorias(nombre, slug)
    `)
        .eq('status', 'published')
        .not('fecha_publicacion', 'is', null)
        .order('fecha_publicacion', { ascending: false })
        .range(0, 11);

    if (error) {
        console.log("RAW ERROR:", error);
        console.log("MESSAGE:", error.message);
        console.log("HINT:", error.hint);
        console.log("DETAILS:", error.details);
        console.log("CODE:", error.code);
    } else {
        console.log("SUCCESS, found:", data?.length);
    }
}

test();
