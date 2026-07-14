# Dashboard editor para RJD Group

Construiré un panel privado en `/admin` que permita editar todo el contenido de la web (textos e imágenes) sin tocar código. Los cambios se reflejan al instante en la página pública porque la landing pasará a leer su contenido desde la base de datos.

## 1. Backend (Lovable Cloud)

Activaré **Lovable Cloud** para tener base de datos, autenticación y almacenamiento de imágenes. Se crearán:

- **Auth**: correo + contraseña. Primer admin: `gerencia@rjdgroupsac.com`.
- **Tabla `user_roles`** con enum `app_role` (`admin`) y función `has_role()` (patrón seguro, sin escalamiento).
- **Storage bucket público `site-assets`** para hero, logos de clientes y fotos de proyectos.
- **Tablas de contenido** (con RLS: lectura pública, escritura solo admin):
  - `site_settings` (singleton): teléfono, correo, redes, hero (título, subtítulo, imagen), stats.
  - `about_content`: misión, visión, valores, pilares, imagen de equipo.
  - `services`: icono, título, descripción, sub-ítems, orden.
  - `projects`: nombre, ubicación, tipo, año, imagen, orden, destacado.
  - `clients`: nombre, logo, orden.

## 2. Panel `/admin`

Ruta protegida bajo `_authenticated/` con verificación de rol admin. Layout con sidebar y estas secciones:

- **Inicio**: editar hero (título, subtítulo, imagen), CTAs y stats.
- **Nosotros**: misión, visión, valores, lista de pilares, imagen.
- **Servicios**: tabla con crear / editar / eliminar / reordenar.
- **Proyectos**: tabla con subida de imagen, edición inline, reordenar, destacar.
- **Clientes**: subir logo + nombre, reordenar.
- **Contacto**: teléfono, correo, WhatsApp, URLs de Facebook/Instagram/LinkedIn.
- **Usuarios**: invitar nuevos admins por correo, listar y revocar rol.

Cada formulario valida con Zod y guarda con feedback (toast + optimistic update).

## 3. Landing pública (rewire)

Cada ruta pública (`/`, `/nosotros`, `/servicios`, `/proyectos`, `/contacto`) pasa a cargar su contenido con un server function que lee de la base de datos usando cliente publishable (sin login). El diseño y componentes existentes se mantienen 1:1; solo cambia la fuente de datos.

Los valores actuales que ya tienes en el sitio se insertarán como **seed inicial** en una migración, así el sitio arranca con lo mismo que hoy y desde el panel puedes editarlo.

## 4. Seguridad

- RLS activo en todas las tablas; lectura anon solo a columnas seguras.
- Roles en tabla separada + `has_role()` security definer (evita escalamiento).
- Bucket público solo lectura; escritura restringida a admins.
- Validación server-side en cada mutación.

## Detalles técnicos

- Stack: TanStack Start + Supabase (Lovable Cloud), server functions con `requireSupabaseAuth` para mutaciones, cliente publishable para lecturas públicas SSR.
- Imágenes: se suben al bucket `site-assets` y se guarda solo la URL pública en la tabla.
- Reordenamiento por columna `sort_order` numérica, botones ↑/↓ en el panel.

## Alcance / entregable

1. Activar Lovable Cloud + configurar auth email/password.
2. Migración: tablas, RLS, roles, seed con el contenido actual.
3. Panel `/admin` completo con las 7 secciones descritas.
4. Landing rewired para consumir datos del CMS.
5. Crear tu usuario admin `gerencia@rjdgroupsac.com`.

Por el volumen, esto tomará varios pasos de construcción. Al aprobar, arranco activando Cloud y creando el esquema, y voy mostrándote avances por sección.
