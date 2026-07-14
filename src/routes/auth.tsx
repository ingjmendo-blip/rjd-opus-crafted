import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso Administrador | RJD Group" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setInfo("Cuenta creada. Iniciando sesión...");
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signInErr) throw signInErr;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo procesar la solicitud";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center bg-secondary/30 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 md:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Logo className="h-14 w-14" />
          <div>
            <div className="font-display font-bold text-brand-blue-dark text-xl leading-none">
              RJD Group
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-brand-gold mt-1">
              Panel Administrador
            </div>
          </div>
        </div>

        <h1 className="font-display font-bold text-2xl text-brand-blue-dark">
          {mode === "signin" ? "Iniciar sesión" : "Crear cuenta admin"}
        </h1>
        <p className="mt-1 text-sm text-brand-grey">
          {mode === "signin"
            ? "Accede al panel para editar el contenido del sitio."
            : "El correo autorizado (gerencia@rjdgroupsac.com) recibirá permisos automáticamente."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">
              Correo
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">
              Contraseña
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}
          {info && (
            <div className="rounded-lg bg-brand-gold-soft border border-brand-gold/40 text-brand-blue-dark px-3 py-2 text-sm">
              {info}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-dark disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {mode === "signin" ? "Ingresar" : "Crear cuenta"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setInfo(null);
            }}
            className="w-full text-center text-xs text-brand-grey hover:text-brand-blue"
          >
            {mode === "signin"
              ? "¿Primera vez? Crea tu cuenta admin"
              : "Ya tengo una cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}