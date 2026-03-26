# Despliegue en Ubuntu + Coolify

Esta app es una instalación de Next.js 16 con `npm`, salida `standalone` y puerto interno `3000`.

## Requisitos recomendados del servidor

- Ubuntu 22.04 LTS o 24.04 LTS
- 2 vCPU mínimo
- 4 GB RAM recomendado
- 40 GB SSD o más
- DNS apuntando al servidor para el dominio final

## 1. Preparar Ubuntu

Conéctate por SSH y ejecuta:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git ca-certificates gnupg lsb-release ufw
sudo timedatectl set-timezone America/Cancun
sudo hostnamectl set-hostname coolify-fcc
```

Si el servidor tiene 2 GB de RAM o menos, crea swap antes de compilar proyectos Next.js:

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

## 2. Abrir firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8000/tcp
sudo ufw --force enable
sudo ufw status
```

El puerto `8000` se usa normalmente para el acceso inicial a Coolify. Cuando ya tengas dominio y proxy configurados, puedes revisar si deseas restringirlo.

## 3. Instalar Coolify

Coolify instala Docker automáticamente si hace falta. Ejecuta el instalador oficial:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Verifica que los contenedores estén arriba:

```bash
docker ps
```

Accede a:

```text
http://IP_DEL_SERVIDOR:8000
```

Completa el usuario inicial de Coolify desde el navegador.

## 4. Preparar el repositorio para Coolify

Este repo ya quedó preparado para Coolify con:

- `Dockerfile`
- `.dockerignore`
- `next.config.ts` con `output: 'standalone'`

No hace falta `docker-compose` para desplegar la app en Coolify.

## 5. Crear el recurso en Coolify

Dentro de Coolify:

1. Crea un **Project** nuevo.
2. Elige **New Resource**.
3. Selecciona **Private Repository** o **Public Repository**, según dónde esté tu código.
4. Conecta GitHub/GitLab/Bitbucket.
5. Selecciona este repositorio.
6. En **Build Pack**, usa **Dockerfile**.
7. En **Port Exposes**, usa `3000`.
8. Define la rama de despliegue, por ejemplo `main`.

## 6. Variables de entorno que debes cargar en Coolify

Configura estas variables en el recurso de Coolify antes del primer deploy:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_TINYMCE_API_KEY=...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
RESEND_API_KEY=...
OPENAI_API_KEY=...
OPENAI_TRANSLATION_MODEL=gpt-4.1-mini
CRM_WEBHOOK_URL=...
CRM_WEBHOOK_TOKEN=...
REQUIRE_CRM_DELIVERY=false
UPNIFY_INTEGRATION_URL=https://api.upnify.com/v4/integraciones/...
# alternativa a UPNIFY_INTEGRATION_URL
UPNIFY_INTEGRATION_TOKEN=...
```

Notas:

- `OPENAI_API_KEY` solo es necesaria si quieres la traducción automática del contenido.
- `NEXT_PUBLIC_SITE_URL` debe ser el dominio público final para `sitemap.xml` y `rss.xml`.
- Si no configuras Turnstile en producción, el formulario bloqueará envíos.

## 7. Dominio y SSL

En Coolify, dentro del recurso:

1. Abre la sección **Domains**.
2. Agrega el dominio principal, por ejemplo `fertilitycentercancun.com`.
3. Agrega `www` si también lo vas a usar.
4. Activa **Generate SSL**.

En tu proveedor DNS crea registros tipo `A` apuntando a la IP del servidor.

## 8. Desplegar

Lanza el primer deploy desde Coolify.

Si algo falla en build, revisa primero:

- Variables de entorno faltantes
- Acceso del repositorio a la rama correcta
- RAM disponible durante `next build`

## 9. Verificaciones después del deploy

Prueba estos puntos:

- La home carga correctamente
- El formulario de contacto guarda leads en Supabase
- Turnstile valida en producción
- `/admin` responde
- `sitemap.xml` y `rss.xml` usan el dominio correcto

## 10. Comandos útiles de administración del servidor

```bash
docker ps
docker logs coolify
docker logs coolify-realtime
docker logs coolify-proxy
df -h
free -h
sudo ufw status
```

## 11. Recomendación operativa

En este repositorio existe documentación antigua orientada a Vercel y contiene secretos escritos en texto plano. Antes de publicar o compartir el repositorio, rota esas credenciales y elimínalas de la documentación versionada.