# Puesta a punto del entorno

Checklist de lo que hay que configurar **fuera del código** para que el sitio
funcione completo. Para la arquitectura y los scripts, ver [`README.md`](README.md).

---

## 1. Variables de entorno

```bash
cp .env.example .env.local
```

Rellena al menos:

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Base de datos, auth y storage |
| `NEXT_PUBLIC_SITE_URL` | Canonical, hreflang, sitemap y RSS |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Anti-spam. **En producción el formulario se bloquea si faltan** |
| `RESEND_API_KEY` | Aviso por correo de cada lead |
| `UPNIFY_INTEGRATION_URL_ES` / `_EN` | Alta del lead en el CRM |
| `ADMIN_EMAILS` | Acceso al panel durante el arranque |

El resto está documentado en `.env.example`.

---

## 2. Base de datos

En **Supabase → SQL Editor**, ejecutar en este orden:

1. `supabase-schema.sql` — tabla `leads`
2. `supabase-schema-fase2.sql` — blog, equipo, podcasts, comentarios
3. `supabase-schema-contact-messages.sql` — bandeja de contacto
4. `supabase-schema-admin-updates.sql` — testimonios de pacientes
5. `supabase-schema-admin-roles.sql` — **control de acceso por rol**

### ⚠️ Antes de ejecutar el paso 5

Abre el archivo y descomenta el `INSERT` que da de alta al primer administrador,
poniendo tu correo:

```sql
INSERT INTO public.admin_users (user_id, email)
SELECT id, email FROM auth.users WHERE email = 'tu-correo@afcc.com.mx'
ON CONFLICT (user_id) DO NOTHING;
```

Para ver qué cuentas existen:

```sql
SELECT id, email, created_at FROM auth.users ORDER BY created_at;
```

Si no lo haces, nadie podrá entrar al panel. (El código tiene una salida de
emergencia: la variable `ADMIN_EMAILS`.)

### ⚠️ Cerrar el alta de usuarios

**Authentication → Providers → Email → desactivar "Enable Sign Ups".**

Con el registro abierto cualquiera puede crearse una cuenta. La migración del
paso 5 impide que esa cuenta administre el sitio, pero el alta debe cerrarse
igualmente.

---

## 3. Storage

Crear tres buckets **públicos en lectura**:

- `blog-images`
- `team-photos`
- `galeria-familias`

Las políticas de escritura (solo administradores) las aplica
`supabase-schema-admin-roles.sql`.

---

## 4. Verificación

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

Comprobaciones manuales:

- [ ] `/es` y `/en` cargan con Navbar y Footer
- [ ] Una página de tratamiento (`/es/inseminacion-artificial`) muestra su propio
      `<title>` y `<meta name="description">` en el HTML
- [ ] `/sitemap.xml` lista las páginas de contenido y los posts
- [ ] `/robots.txt` responde y apunta al sitemap
- [ ] El formulario de contacto guarda en `leads`, dispara el correo y crea el
      registro en Upnify
- [ ] `/admin` con una cuenta **no** administradora muestra "Acceso no autorizado"
- [ ] `/admin` con una cuenta administradora carga el dashboard
- [ ] Un post creado desde `/admin/blog` se ve en `/es/blog/<slug>`

---

## 5. Despliegue

Docker (`output: 'standalone'`) sobre Coolify. Ver
[`coolify_ubuntu_deploy.md`](coolify_ubuntu_deploy.md).

Todas las variables de `.env.example` deben existir también en el entorno de
producción: las que faltan no rompen el build, pero degradan el sitio en
silencio (sin `TURNSTILE_SECRET_KEY` el formulario deja de aceptar envíos; sin
`NEXT_PUBLIC_SITE_URL` los canonical apuntan al dominio por defecto).

---

## Problemas frecuentes

**"Acceso no autorizado" con la cuenta correcta**
La cuenta no está en `admin_users`. Añádela con el `INSERT` del paso 2 o
inclúyela temporalmente en `ADMIN_EMAILS`.

**En los logs aparece "La tabla `admin_users` no existe"**
No se ejecutó `supabase-schema-admin-roles.sql`. Mientras tanto el panel sigue
abierto a cualquier usuario autenticado.

**El formulario responde "Sistema anti-spam no configurado"**
Falta `TURNSTILE_SECRET_KEY` en producción.

**Un post nuevo del panel da 404**
El slug debe ser único y el post estar en estado `published`.

**Error de RLS al escribir desde el panel**
Las políticas del paso 5 no se aplicaron, o la cuenta no está en `admin_users`.
