# 🚀 Configuración Final - Fertility Center Cancun

## ✅ Pasos Completados

1. ✅ Credenciales de Supabase configuradas en `.env.local`
2. ✅ Arquitectura completa implementada
3. ✅ Componente ContactForm creado

---

## 📋 Pasos Pendientes (Acción Requerida)

### 1. Ejecutar SQL en Supabase

**Instrucciones**:

1. Ve a tu proyecto Supabase: https://supabase.com/dashboard/project/albhkcvkihratkrxcavi

2. Navega a: **SQL Editor** (en el menú lateral izquierdo)

3. Haz clic en **"New Query"**

4. Copia y pega el siguiente SQL:

```sql
-- Crear tabla para almacenar leads del formulario de contacto
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  pais TEXT,
  tratamiento TEXT,
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS en la tabla
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política: Permitir INSERT sin autenticación (formulario público)
DROP POLICY IF EXISTS "Permitir inserción pública de leads" ON public.leads;
CREATE POLICY "Permitir inserción pública de leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden leer leads
DROP POLICY IF EXISTS "Solo admins pueden leer leads" ON public.leads;
CREATE POLICY "Solo admins pueden leer leads"
  ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_tratamiento ON public.leads(tratamiento);
```

5. Haz clic en **"Run"** o presiona `Ctrl+Enter`

6. Deberías ver el mensaje: ✅ **"Success. No rows returned"**

---

### 2. Verificar la Tabla

Después de ejecutar el SQL:

1. Ve a: **Table Editor** (menú lateral)
2. Deberías ver la tabla **`leads`** con las siguientes columnas:
   - id
   - nombre
   - email
   - telefono
   - pais
   - tratamiento
   - mensaje
   - created_at

---

### 3. Probar el Formulario Localmente

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

1. Abre http://localhost:3000
2. Scroll hasta el formulario de contacto
3. Completa todos los campos requeridos:
   - Nombre completo
   - Email
   - Teléfono
   - País
   - Tratamiento de interés
4. (Opcional) Agrega un mensaje
5. Haz clic en **"Solicitar Consulta"**

**Resultado esperado**:
- ✅ Aparece mensaje de éxito en verde
- ✅ El formulario se limpia automáticamente

---

### 4. Verificar en Supabase

1. Ve a: **Table Editor** → **leads**
2. Deberías ver tu registro de prueba
3. Verificar que todos los campos se guardaron correctamente

---

## 🎯 Checklist de Verificación

- [ ] SQL ejecutado en Supabase ✓
- [ ] Tabla `leads` visible en Table Editor ✓
- [ ] Servidor dev corriendo (`npm run dev`) ✓
- [ ] Formulario carga sin errores ✓
- [ ] Formulario se envía exitosamente ✓
- [ ] Datos aparecen en Supabase ✓

---

## 🐛 Troubleshooting

### Si el formulario no se envía:

1. **Abre la consola del navegador** (F12 → Console)
2. Busca errores relacionados con Supabase
3. **Verifica** que `.env.local` tiene las credenciales correctas
4. **Reinicia** el servidor de desarrollo (`Ctrl+C` y luego `npm run dev`)

### Si aparece error de RLS:

Significa que las políticas de seguridad no se aplicaron. Vuelve a ejecutar la sección de políticas del SQL:

```sql
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir inserción pública de leads" ON public.leads;
CREATE POLICY "Permitir inserción pública de leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);
```

---

## 🚀 Deploy a Vercel

Una vez que hayas verificado que todo funciona localmente:

1. **Configurar variables de entorno en Vercel**:
   - Ve a tu proyecto en Vercel
   - Settings → Environment Variables
   - Agrega:
     - `NEXT_PUBLIC_SUPABASE_URL` = `https://albhkcvkihratkrxcavi.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGci...` (tu key completa)

2. **Push a Git**:
   ```bash
   git add .
   git commit -m "feat: add contact form with Supabase integration"
   git push
   ```

3. Vercel deployará automáticamente

---

## ✨ ¡Listo!

Tu sitio web de Fertility Center Cancun está completo con:
- ✅ Formulario de contacto funcional
- ✅ Integración con Supabase
- ✅ Diseño médico premium
- ✅ Validación completa
- ✅ Responsive y optimizado

**Próximo paso**: Panel de administración para gestionar los leads (Fase 2)
