# Integración con Upnify — estado y datos pendientes

Recoge lo acordado en la reunión del 29/07/2026 con Luis Hernández (AFCC),
Aldair Leyva (Upnify) e Iván Hernández, y cómo queda implementado en el sitio.

---

## Flujo acordado

1. **Una integración por idioma.** El formulario en español publica en la
   integración ES y el de inglés en la EN. Cada integración lleva ya configurados
   su **fase**, su **origen** y su **etiqueta** desde el CRM, así que el sitio ya
   **no** envía ninguno de los tres. Los tokens `ETIQ-...` que se compartieron en
   la llamada quedaron obsoletos por esto.
2. **El tratamiento de interés llega en su propio campo**, no dentro de
   comentarios, y en el idioma de la página: `Inseminación Artificial` desde la
   web en español, `Artificial Insemination` desde la inglesa.
3. **El país llega en un campo personalizado nuevo de tipo texto.** El campo
   `pais` del CRM es de sistema y de tipo lista: por eso todos los prospectos
   llegaban como "México" aunque el paciente eligiera Canadá.
4. **No hay un formulario por tratamiento.** Las páginas de tratamiento llevan a
   `/contacto`, y ahí el paciente elige el tratamiento en el selector.
5. **Aviso por correo** de cada lead a `comercial@afcc.com.mx`, con copia a
   `info@fertilitycentercancun.com.mx`. El correo configurado en el panel de
   administración se suma como copia adicional.
6. **Promociones**: la promoción concreta viaja identificada, no dentro del mensaje.

---

## Cómo quedó implementado

Todo vive en [`src/lib/actions/leads.ts`](src/lib/actions/leads.ts).

- La URL de la integración se elige por idioma (`UPNIFY_INTEGRATION_URL_ES` / `_EN`).
- Los nombres de los campos personalizados son 100 % configurables por entorno.
  **No hay valores por defecto a propósito**: un nombre inventado hace que Upnify
  descarte el dato en silencio, que es justo el problema que se detectó.
- Mientras un campo no esté configurado, su dato **no se pierde**: viaja dentro de
  `comentarios` y el servidor lo avisa una vez por arranque:

  ```
  [crm] UPNIFY_COUNTRY_FIELD sin configurar: "Pais" se enviará dentro de
  comentarios en lugar de su campo propio en Upnify.
  ```

- `comentarios` ya solo lleva el mensaje del paciente más lo que no encontró
  campo propio.
- Se capturan `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
  `utm_content` y `gclid` en la primera página de la visita y se conservan hasta
  el envío ([`src/lib/utm.ts`](src/lib/utm.ts)), porque el anuncio suele aterrizar
  en una página de tratamiento y el formulario está en otra.

### Ejemplo real de lo que recibe el CRM

Lead enviado desde `/es/contacto` con `UPNIFY_TREATMENT_FIELD=tratamiento_interes`
y `UPNIFY_COUNTRY_FIELD` todavía sin configurar:

```json
{
  "nombre": "Prueba",
  "apellidos": "Payload Ezequiel",
  "correo": "prueba.payload@example.com",
  "telefono": "+52 998 111 2233",
  "movil": "+52 998 111 2233",
  "tratamiento_interes": "Inseminación Artificial",
  "utm_campana": "fiv-verano",
  "atribucion": "utm_source=google | utm_medium=cpc | gclid=TEST123",
  "comentarios": "Quisiera información sobre costos\n\nPais: Canadá"
}
```

En cuanto se rellene `UPNIFY_COUNTRY_FIELD`, `Pais: Canadá` desaparece de
comentarios y pasa a su columna.

---

## Estado de la configuración en el CRM

### Resuelto

Las dos integraciones existen y están separadas por idioma, cada una con su
etiqueta correcta (`Español` / `Inglés` + `FCCCancún`):

- `INTEGRACION - VERCEL WEB - ESPAÑOL`
- `INTEGRACION - VERCEL WEB - INGLÉS`

Las URLs se consultan en el CRM: **Ajustes > API**, columna Configuración.

> Esas URLs son credenciales: cualquiera que las tenga puede dar de alta
> prospectos en el CRM. Por eso no se escriben aquí. Van únicamente en las
> variables de entorno del servidor, nunca en el repositorio ni en código de
> cliente.

### Pendiente en el CRM

| # | Qué | Por qué |
| --- | --- | --- |
| 1 | **Fase** y **Origen** están vacíos en las dos integraciones | Son obligatorios (`[TKFASE]`, `[TKORIGEN]`). Sin fase, el lead no dispara la regla del correo de bienvenida |
| 2 | **"Activar campos personalizados"** está desmarcado en las dos | Sin eso, el campo de tratamiento no se guardará aunque el sitio lo envíe |
| 3 | La etiqueta **AdWords** está fija en las dos integraciones | Marca como "de pago" todo lead del sitio, también el orgánico y el directo |
| 4 | No existe el campo personalizado **Tratamiento de interés** (tipo texto) | Es el dato que Luis quiere ver en su columna y no dentro de comentarios |
| 5 | El país sigue siendo `[PAIS]`, tipo lista y obligatorio | Hay que crear un campo de texto o pasarme los valores exactos de la lista |

Opcional, según decidan: campo para la **promoción** (`UPNIFY_PROMOTION_FIELD`) y
campos para la **atribución** de campañas, si no acaban usando la integración
nativa de Google Ads que ofreció Aldair.

---

## Activación

Variables a poner en el entorno de producción (Coolify). Los nombres de campo
admiten corchetes o no: se normalizan al leerlos.

```bash
# URLs desde el CRM: Ajustes > API > Configuración. No versionar estos valores.
UPNIFY_INTEGRATION_URL_ES=https://api.salesup.com/integraciones/<token-integracion-espanol>
UPNIFY_INTEGRATION_URL_EN=https://api.salesup.com/integraciones/<token-integracion-ingles>
UPNIFY_TREATMENT_FIELD=TRATAMIENTODEINTERES
UPNIFY_COUNTRY_FIELD=PAISUSUARIO
```

Payload verificado contra un endpoint de prueba, con estos mismos valores:

```json
{
  "nombre": "Sarah", "apellidos": "Miller",
  "correo": "sarah.miller@example.com",
  "telefono": "+1 305 555 0177", "movil": "+1 305 555 0177",
  "TRATAMIENTODEINTERES": "Egg Donation",
  "PAISUSUARIO": "United States",
  "comentarios": "What is the cost of egg donation?"
}
```

Y comprobar, con un lead de prueba por idioma, que en el prospecto de Upnify:

- [ ] La etiqueta de idioma es la correcta y no hay ninguna "español" de más
- [ ] La fase y el origen son los de la integración
- [ ] El tratamiento aparece en su columna, en el idioma de la web usada
- [ ] El país es el que eligió el paciente, no "México"
- [ ] `comentarios` contiene solo el mensaje del paciente
- [ ] El aviso llegó a `comercial@afcc.com.mx` y con copia a `info@fertilitycentercancun.com.mx`

---

## Temas abiertos de la reunión

- **Alinear los campos del formulario con los del CRM.** Luis mencionó que existen
  campos en Upnify que el formulario no pide (por ejemplo "cuándo te gustaría
  empezar tu tratamiento") y dudaba de su utilidad comercial. Quedó pendiente de
  la opinión de Agustín (marketing).
- **Integración nativa con Google Ads.** Aldair la mostró por encima y quedó en
  agendar una sesión aparte con Luis. Es configuración del CRM, no del sitio.
