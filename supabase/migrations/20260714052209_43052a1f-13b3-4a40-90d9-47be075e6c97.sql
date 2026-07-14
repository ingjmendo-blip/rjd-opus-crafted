
-- =========================
-- USER ROLES
-- =========================
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Security definer role check
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only service_role can write; policies deliberately omit INSERT/UPDATE/DELETE for regular users.

-- Reusable updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================
-- SITE SETTINGS (singleton)
-- =========================
CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  phone text NOT NULL DEFAULT '',
  phone_display text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  whatsapp_message text NOT NULL DEFAULT '',
  facebook_url text NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  linkedin_url text NOT NULL DEFAULT '',
  hero_eyebrow text NOT NULL DEFAULT '',
  hero_title text NOT NULL DEFAULT '',
  hero_subtitle text NOT NULL DEFAULT '',
  hero_image_url text NOT NULL DEFAULT '',
  about_intro text NOT NULL DEFAULT '',
  about_image_url text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- SERVICES
-- =========================
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Compass',
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published services"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert services"
  ON public.services FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update services"
  ON public.services FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete services"
  ON public.services FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- PROJECTS
-- =========================
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published projects"
  ON public.projects FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- CLIENTS
-- =========================
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.clients TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published clients"
  ON public.clients FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert clients"
  ON public.clients FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update clients"
  ON public.clients FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete clients"
  ON public.clients FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- STORAGE: site-assets policies
-- =========================
CREATE POLICY "Public read site-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Admins upload site-assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update site-assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete site-assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

-- =========================
-- SEED
-- =========================
INSERT INTO public.site_settings (id, phone, phone_display, email, whatsapp_message, facebook_url, instagram_url, linkedin_url, hero_eyebrow, hero_title, hero_subtitle)
VALUES (
  1,
  '51976244498',
  '976 244 498',
  'gerencia@rjdgroupsac.com',
  'Hola RJD Group, quisiera solicitar información sobre sus servicios.',
  'https://www.facebook.com/rjdgroupsac',
  'https://www.instagram.com/rjdgroupsac',
  'https://www.linkedin.com/company/rjdgroupsac',
  'Ingeniería · Consultoría · Construcción',
  'Ingeniería que construye confianza.',
  'Consultoría, supervisión y ejecución de obras con estándares internacionales para empresas privadas, industrias y entidades públicas en el Perú.'
);

INSERT INTO public.services (icon, title, description, items, sort_order) VALUES
('Compass', 'Consultoría', 'Estudios técnicos, factibilidad, expedientes técnicos y asesoría estratégica.', '["Estudios de factibilidad","Expedientes técnicos","Auditoría técnica","Diagnóstico de infraestructura"]'::jsonb, 1),
('ClipboardCheck', 'Supervisión', 'Supervisión de obras públicas y privadas con control de calidad e inspección permanente.', '["Control de calidad","Control de plazos","Seguridad en obra","Reportes ejecutivos"]'::jsonb, 2),
('Hammer', 'Construcción', 'Ejecución de obras civiles, industriales, comerciales y estructuras metálicas.', '["Obra civil","Estructuras metálicas","Acabados premium","Remodelaciones"]'::jsonb, 3),
('Wrench', 'Mantenimiento', 'Mantenimiento preventivo y correctivo para infraestructura y activos.', '["Preventivo","Correctivo","Predictivo","Contratos anuales"]'::jsonb, 4),
('Map', 'Topografía', 'Levantamientos topográficos con equipos de precisión y drones georreferenciados.', '["Levantamientos","Replanteos","Batimetría","Fotogrametría con drones"]'::jsonb, 5),
('Truck', 'Alquiler de Maquinaria', 'Flota de maquinaria pesada y liviana con operadores certificados.', '["Excavadoras","Retroexcavadoras","Volquetes","Grupos electrógenos"]'::jsonb, 6),
('Briefcase', 'Gestión de Proyectos', 'Dirección integral de proyectos bajo metodología PMI y buenas prácticas.', '["Gerencia de proyecto","Control de costos","Cronogramas","Gestión de riesgos"]'::jsonb, 7);

INSERT INTO public.projects (name, location, project_type, year, image_url, is_featured, sort_order) VALUES
('Remodelación Clínica Yuvis', 'Trujillo, La Libertad', 'Obra Civil · Salud', '2024', '', true, 1),
('Nave Industrial Metálica', 'Lima, Perú', 'Estructura Metálica', '2024', '', true, 2),
('Infraestructura Minera', 'Ancash, Perú', 'Obra Civil · Minería', '2023', '', false, 3),
('Levantamiento Topográfico', 'Cajamarca, Perú', 'Topografía · Consultoría', '2023', '', false, 4);

INSERT INTO public.clients (name, logo_url, sort_order) VALUES
('Clínica Yuvis', '', 1),
('Mendoza Consultores', '', 2),
('Carbonia Industries SAC', '', 3);
