import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Zap, TrendingDown, ArrowRight, AlertCircle, Filter, X } from "lucide-react";

interface Offer {
  store_name: string;
  price: number;
  currency: string;
  product_url: string;
  in_stock: boolean;
}

interface SearchResult {
  query: string;
  processed_at: string;
  extracted_offers: Offer[];
  ai_insight: string | null;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSearchQuery, setNewSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "store">( "price");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error("Erreur lors de la recherche");
        }

        const data: SearchResult = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleNewSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(newSearchQuery)}`);
      setNewSearchQuery("");
    }
  };

  const sortedOffers = results
    ? [...results.extracted_offers].sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        }
        return a.store_name.localeCompare(b.store_name);
      })
    : [];

  const minPrice = sortedOffers.length > 0 ? Math.min(...sortedOffers.map((o) => o.price)) : 0;
  const maxPrice = sortedOffers.length > 0 ? Math.max(...sortedOffers.map((o) => o.price)) : 0;
  const savingsAmount = sortedOffers.length > 1 ? maxPrice - minPrice : 0;
  const savingsPercent = minPrice > 0 ? ((savingsAmount / maxPrice) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-600/25 transition-all">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PriceNet
              </span>
            </button>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105"
            >
              Code
            </a>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 sticky top-16 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleNewSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={newSearchQuery}
                onChange={(e) => setNewSearchQuery(e.target.value)}
                placeholder="Rechercher un autre produit..."
                defaultValue={query}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-600 transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 hover:scale-105"
            >
              Rechercher
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!query ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Aucune recherche
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Entrez un produit pour commencer à comparer les prix
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Retour à l'accueil
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Recherche en cours...
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Nous analysons les prix sur plusieurs plateformes
            </p>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-900 dark:text-red-300 mb-2">
                    Erreur de recherche
                  </h3>
                  <p className="text-red-800 dark:text-red-400">{error}</p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                  >
                    Retour à l'accueil
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : results && sortedOffers.length > 0 ? (
          <>
            {/* Results Header */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-3">
                    Résultats pour <span className="gradient-text">"{query}"</span>
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    {sortedOffers.length} offre{sortedOffers.length > 1 ? "s" : ""} trouvée{sortedOffers.length > 1 ? "s" : ""} •{" "}
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Économisez {savingsPercent}% ({Math.round(savingsAmount)} MGA)
                    </span>
                  </p>
                </div>

                {/* Sort & Filter */}
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Filter className="w-5 h-5" />
                    <span>Filtres</span>
                  </button>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "price" | "store")}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  >
                    <option value="price">Trier par prix</option>
                    <option value="store">Trier par boutique</option>
                  </select>
                </div>
              </div>

              {/* AI Insight Card */}
              {results.ai_insight && (
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                        Recommandation IA
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {results.ai_insight}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedOffers.map((offer, idx) => {
                const isLowest = offer.price === minPrice && sortedOffers.length > 1;
                return (
                  <a
                    key={idx}
                    href={offer.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Lowest Price Badge */}
                    {isLowest && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg">
                          <TrendingDown className="w-4 h-4" />
                          Meilleur prix
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Store Name */}
                      <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                        {offer.store_name}
                      </h3>

                      {/* Price */}
                      <div className="mb-6">
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Prix</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {offer.price.toLocaleString("fr-FR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400 font-semibold">
                            {offer.currency}
                          </span>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mb-6">
                        {offer.in_stock ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                            <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                            En stock
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium">
                            <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
                            Rupture de stock
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2">
                        <span>Voir l'offre</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Price Range Summary */}
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">
                Analyse des prix
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Prix le plus bas</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {minPrice.toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Prix le plus haut</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {maxPrice.toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Différence</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {savingsAmount.toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    <span className="text-lg">({savingsPercent}%)</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : results && sortedOffers.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Aucune offre trouvée
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Essayez une autre recherche ou consultez nos catégories populaires
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Retour à l'accueil
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
