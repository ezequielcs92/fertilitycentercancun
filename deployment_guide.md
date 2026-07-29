# 🚀 Guía de Despliegue en Vercel - Fertility Center Cancun

Sigue estos pasos para poner tu sitio en producción de forma segura.

## 0. Credenciales de Administrador

Para acceder al panel en `/admin`, utiliza estas credenciales:
- **Usuario:** `admin@fertilitycentercancun.com`
- **Contraseña:** `Admin_Fertility_2026`

> [!NOTE]
> Estas credenciales se utilizan en la página de login (`/login`) para acceder a la gestión de leads, blog y equipo médico.

## 1. Configurar Variables de Entorno

Debes agregar estas variables en el Dashboard de Vercel (**Settings > Environment Variables**):

| Nombre de Variable | Valor / Origen | Notas |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://albhkcvkihratkrxcavi.supabase.co` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | La clave que me proporcionaste |
| `NEXT_PUBLIC_TINYMCE_API_KEY` | `vw1ypnbl6ql8xs11n5r66qpu9057j3z65jcc2xfufsx3auq7` | Clave para el editor de texto |
| `RESEND_API_KEY` | Tu clave privada de Resend | Clave para envío de correos. Nunca subirla al repositorio |
| `RESEND_FROM_EMAIL` | Remitente verificado en Resend | Ejemplo: `Fertility Center Cancun <contacto@tudominio.com>` |
| `LEAD_NOTIFICATION_EMAILS` | Correos adicionales separados por coma | Los correos corporativos acordados ya se incluyen por defecto |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Tu **Site Key** de Cloudflare | Ver paso 2 abajo |
| `TURNSTILE_SECRET_KEY` | Tu **Secret Key** de Cloudflare | Ver paso 2 abajo |
| `CRM_WEBHOOK_URL` | URL del webhook de tu CRM | Recibe los leads del formulario en JSON |
| `CRM_WEBHOOK_TOKEN` | Token Bearer del webhook (opcional) | Si tu CRM requiere autenticación |
| `REQUIRE_CRM_DELIVERY` | `true`/`false` (opcional) | Si es `true`, el formulario falla cuando CRM no responde |
| `UPNIFY_INTEGRATION_URL_ES` | URL de integración Upnify en español | Debe tener fase/origen/etiqueta ES configurados en CRM |
| `UPNIFY_INTEGRATION_URL_EN` | URL de integración Upnify en inglés | Debe tener fase/origen/etiqueta EN configurados en CRM |
| `UPNIFY_INTEGRATION_TOKEN_ES` | Token ES (alternativa a URL) | El sistema construye la URL automáticamente |
| `UPNIFY_INTEGRATION_TOKEN_EN` | Token EN (alternativa a URL) | El sistema construye la URL automáticamente |
| `UPNIFY_TREATMENT_FIELD` | Nombre API del campo personalizado | Debe ser el campo de texto "Tratamiento de interés" creado en CRM |
| `UPNIFY_COUNTRY_FIELD` | Nombre API del campo país | Por defecto: `pais` |

`UPNIFY_INTEGRATION_URL` y `UPNIFY_INTEGRATION_TOKEN` se conservan temporalmente como fallback de compatibilidad, pero producción debe configurar las variables separadas por idioma.

## 2. Configurar Cloudflare Turnstile (CAPTCHA)

Para que el CAPTCHA no muestre el mensaje de "Prueba" en producción:

1. Crea una cuenta en [Cloudflare](https://dash.cloudflare.com/) si no tienes una.
2. Ve a la sección **Turnstile**.
3. Haz clic en **Add Site**.
4. Nombre: `Fertility Center Cancun`
5. Domain: `fertilitycentercancun.com` (y tus otros dominios de Vercel).
6. Widget Type: **Managed** (Recomendado).
7. Copia la **Site Key** y la **Secret Key** y agrégalas a Vercel.

## 3. Desplegar

Si estás usando GitHub, Vercel desplegará automáticamente al hacer `push`. Si usas la CLI:

```bash
vercel deploy --prod
```

## 4. Verificar

Una vez desplegado:
1. Ve a tu formulario de contacto.
2. Verifica que el CAPTCHA cargue correctamente.
3. Envía una prueba y verifica que:
   - Aparezca el mensaje de éxito verde.
   - El lead aparezca en el **Table Editor** de Supabase.
   - Recibas el correo de notificación (si configuraste el email en `/admin/configuracion`).

---
*Preparado por Antigravity*
