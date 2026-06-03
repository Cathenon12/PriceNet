import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, TrendingDown } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation simple
      if (!email || !password) {
        setError("Veuillez remplir tous les champs");
        return;
      }

      if (!email.includes("@")) {
        setError("Email invalide");
        return;
      }

      // Simuler une connexion - en production, faire un appel API
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email);

      if (!user || user.password !== password) {
        setError("Email ou mot de passe incorrect");
        return;
      }

      // Stocker l'utilisateur connecté
      localStorage.setItem("currentUser", JSON.stringify({ email: user.email, id: user.id }));
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
            <TrendingDown className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PriceNet
          </span>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 backdrop-blur">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Bienvenue
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Connectez-vous pour gérer vos prix
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
            Pas encore inscrit?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Créer un compte
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
              🔐 Démo - Utilisateurs de test:
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Email: <code className="font-mono">demo@pricenet.com</code>
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Mot de passe: <code className="font-mono">demo123</code>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
