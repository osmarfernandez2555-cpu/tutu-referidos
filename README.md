# Club de Referidos · Tutu Automotores

Landing, Términos y Condiciones y panel interno de la campaña “Referidos” (vigente del 12/11/2026 al 31/12/2026).
Servidor Node (Express) con su propia base PostgreSQL, independiente de Ruthina.

## Rutas

- `/referidos` — landing con el formulario (el link para compartir)
- `/referidos/bases` — Términos y Condiciones completos
- `/referidos/admin` — panel interno (pide contraseña)
- `/salud` — chequeo del servidor y la base
- `/api/referidos` — API (alta pública; lista, cambios y CSV con contraseña)

## Archivos

- `server.js` — arranca el servidor y conecta la base
- `referidos.js` — reglas de la campaña, tabla `referidos` y API
- `public/referidos.html` — landing
- `public/referidos-bases.html` — Términos y Condiciones
- `public/referidos-admin.html` — panel
- `public/js/scroll-world.js` — motor del recorrido animado (skill scroll-world, MIT)
- `public/vid/tramo1..5.mp4` — recorrido horizontal (1280×720) · `tramoN-m.mp4` vertical para celular (720×1280)
- `public/img/tramo1..5.webp` — primer cuadro de cada tramo (se muestra mientras carga el video)

Los videos se generaron en Google Flow (Veo 3.1 Fast), proyecto "Tutu Referidos - recorrido".
Cada tramo empieza en la imagen donde termina el anterior, así el recorrido no tiene cortes.

## Deploy en Railway

1. Railway → **New Project** (o el proyecto de siempre) → **New** → **GitHub Repo** → `tutu-referidos`.
2. En el mismo proyecto: **New** → **Database** → **PostgreSQL**.
3. En el servicio `tutu-referidos` → **Variables** → **New Variable** → **Add Reference** → elegí `DATABASE_URL` de la base PostgreSQL.
4. Agregá `REFERIDOS_PANEL_PASS` con la contraseña del panel.
5. **Settings** → **Networking** → **Generate Domain**. El link para compartir es `https://<dominio>/referidos`.
6. En los logs tienen que aparecer `✅ PostgreSQL conectado OK` y `✅ Tabla referidos lista`.

## Variables opcionales

- `REFERIDOS_INICIO` / `REFERIDOS_FIN` — fechas de la campaña (def. 2026-11-12 00:00 y 2026-12-31 23:59, hora argentina)
- `REFERIDOS_MADURACION_DIAS` — días que tiene el referido para comprar (def. 60)
- `REFERIDOS_TOPE_REFERENTE` — beneficios máximos por persona (def. 0 = sin límite)
- `REFERIDOS_TOPE_TOTAL` — beneficios máximos de la campaña (def. 0 = sin cupo)
- `REFERIDOS_DIAS_DUPLICADO` — si se pone, un comprador se puede volver a referir pasados esos días

Si cambian las fechas o los topes, hay que cambiarlos también en el texto de `public/referidos.html` y `public/referidos-bases.html`.

## Problemas comunes

- **Los logs dicen “Falta DATABASE_URL” o “PostgreSQL NO conectado”** → falta el paso 3, o la base no está en el mismo proyecto.
- **El panel dice “Falta configurar REFERIDOS_PANEL_PASS”** → falta el paso 4.
- **El panel dice “Contraseña incorrecta”** → revisá la variable (sin espacios al final).
- **El formulario dice “No pudimos guardar el referido”** → mirá los logs; casi siempre es la base.
- **“La campaña Referidos no está vigente”** → la fecha está fuera de `REFERIDOS_INICIO` / `REFERIDOS_FIN`.
