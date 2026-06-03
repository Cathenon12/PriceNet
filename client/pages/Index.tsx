import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Zap, Shield, TrendingDown, Github, ExternalLink, ChevronRight, Sparkles } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.4}px)` }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * -0.2}px)` }} />
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrollY > 10 ? 'bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-600/25 transition-all">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PriceNet
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <a href="#features" className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#security" className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm group">
                Security
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#tech" className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm group">
                Tech Stack
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </a>
            </div>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Code</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 mb-8 border border-blue-200 dark:border-blue-500/20 backdrop-blur-sm hover:bg-blue-100/70 dark:hover:bg-blue-500/15 transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Production-Ready Price Comparison Engine</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            Trouvez les meilleurs{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              prix
            </span>
            <br />
            en toute confiance
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Comparez les prix en temps réel sur plusieurs plateformes. Intelligence artificielle, sécurité avancée et expérience fluide.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-16">
            <div className="relative flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto group">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Samsung Galaxy S24, MacBook Pro, AirPods..."
                  className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <Zap className="w-5 h-5" />
                Comparer
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Populaires:</span>
            {["Smartphones", "Laptops", "Headphones"].map((category) => (
              <button
                key={category}
                className="px-5 py-2.5 rounded-full bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 text-sm font-semibold">
              Caractéristiques principales
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Puissance Enterprise
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Architecture production avec technologie moderne et mesures de sécurité complètes
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Ultra Rapide",
                description: "Réponses en moins de 200ms avec cache Redis. Extraction asynchrone temps réel.",
                color: "from-blue-600 to-blue-400",
                index: 0,
              },
              {
                icon: Shield,
                title: "Sécurisé",
                description: "Cookies sécurisés, CSRF, rate limiting et protection anti-bot intelligent.",
                color: "from-purple-600 to-purple-400",
                index: 1,
              },
              {
                icon: Sparkles,
                title: "IA Intelligente",
                description: "Hermes AI détecte les fausses promos et recommande les meilleures offres.",
                color: "from-pink-600 to-pink-400",
                index: 2,
              },
              {
                icon: TrendingDown,
                title: "Historique Complet",
                description: "Suivi des prix stockés en PostgreSQL avec intégration MongoDB flexible.",
                color: "from-emerald-600 to-emerald-400",
                index: 3,
              },
              {
                icon: ExternalLink,
                title: "Multi-Magasins",
                description: "Jumia, Amazon et autres plateformes avec extraction intelligente.",
                color: "from-orange-600 to-orange-400",
                index: 4,
              },
              {
                icon: Zap,
                title: "Disponibilité 99.9%",
                description: "Workers distribués, queue de tâches et failover automatique.",
                color: "from-cyan-600 to-cyan-400",
                index: 5,
              },
            ].map(({ icon: Icon, title, description, color, index }) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 bg-gradient-to-br ${color} transition-opacity duration-300`} />

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-current/25 transition-all duration-300 ${hoveredFeature === index ? "scale-110" : ""}`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-100/50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20 text-sm font-semibold">
              Stack technologique
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Technologie Moderne
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Construit avec les technologies les plus fiables pour la scalabilité et performance
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "FastAPI", emoji: "⚡" },
              { name: "MongoDB", emoji: "🐘" },
              { name: "Redis", emoji: "🔴" },
              { name: "Celery", emoji: "🌾" },
              { name: "Docker", emoji: "🐳" },
              { name: "PostgreSQL", emoji: "🔵" },
              { name: "React", emoji: "⚛️" },
              { name: "Tailwind CSS", emoji: "🎨" },
              { name: "Nginx", emoji: "🏢" },
              { name: "Ollama AI", emoji: "🤖" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-3 relative z-10">
                  <div className="text-5xl group-hover:scale-125 transition-transform duration-300">{tech.emoji}</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{tech.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 text-sm font-semibold">
              Protection avancée
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Sécurité en priorité
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Mesures de sécurité enterprise-grade contre les vulnérabilités web et attaques bot
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              {[
                "Cookies HTTP-only sécurisés avec SameSite",
                "Protection CSRF sur toutes les opérations",
                "Rate limiting et blocage par IP",
                "Rotation dynamique des user agents",
                "Validation avec schémas Pydantic",
                "Prévention des injections SQL",
                "Protection XSS avec encodage",
                "Configuration des secrets en variables",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-emerald-600/30 transition-all duration-300">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium pt-0.5 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="text-3xl">⚙️</span>
                  Modes Dev & Prod
                </h3>
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                    <h4 className="font-semibold mb-2 text-blue-100 flex items-center gap-2">
                      🔧 Développement
                    </h4>
                    <p className="text-sm text-blue-100/90">
                      Logs détaillés, données mock, CORS relaxé, messages d'erreur verbeux
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                    <h4 className="font-semibold mb-2 text-blue-100 flex items-center gap-2">
                      🚀 Production
                    </h4>
                    <p className="text-sm text-blue-100/90">
                      Headers sécurisés, rate limiting actif, logs minimaux, masquage d'erreurs
                    </p>
                  </div>
                  <div className="pt-4 border-t border-blue-400/30">
                    <p className="text-sm text-blue-100">
                      Basculer via la variable <code className="bg-blue-700/40 px-3 py-1.5 rounded-lg font-mono text-blue-50 inline-block">ENVIRONMENT</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/80 to-pink-600/80 -z-10" />

        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Prêt à economiser?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Commencez à comparer les prix sur plusieurs plateformes avec recommendations IA
          </p>
          <button className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-blue-600 font-bold hover:shadow-2xl hover:shadow-blue-900/50 transition-all duration-300 hover:scale-110 group">
            <Search className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>Commencer maintenant</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              {
                title: "Produit",
                links: ["Caractéristiques", "Tarifs", "Sécurité"],
              },
              {
                title: "Développeurs",
                links: ["API Docs", "GitHub", "Status"],
              },
              {
                title: "Entreprise",
                links: ["À propos", "Blog", "Contact"],
              },
              {
                title: "Juridique",
                links: ["Confidentialité", "Conditions", "Cookies"],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href="#"
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                  PriceNet V2
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2024 PriceNet. Construit avec les technologies modernes.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
