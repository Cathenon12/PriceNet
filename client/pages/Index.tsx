import { useState } from "react";
import { Search, Zap, Shield, TrendingDown, Github, ExternalLink } from "lucide-react";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PriceNet
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#security" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                Security
              </a>
              <a href="#tech" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                Tech Stack
              </a>
            </div>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">Code</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-8">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold">Production-Ready Price Comparison Engine</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Smart Price{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Comparison
            </span>
            <br />
            Made Simple
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Compare prices across multiple e-commerce platforms in real-time. AI-powered insights, advanced scraping,
            and built-in security for the modern web.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-16">
            <div className="relative flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products (e.g., Samsung Galaxy S24)..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? "Searching..." : "Compare Now"}
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {["Smartphones", "Laptops", "Headphones"].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Enterprise-Grade Features
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built on modern technology stack with production-ready architecture and comprehensive security measures
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sub-200ms cache hits with asyncio-powered scraping. Real-time price updates via Redis broker.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Fortified Security</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Dynamic user agents, secure cookies, CSRF protection, and rate limiting against bot attacks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-600 to-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI-Powered Insights</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Hermes AI model analyzes offers, detects fake promotions, and provides intelligent recommendations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Price Tracking</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Historical price data stored in PostgreSQL with MongoDB integration for flexible querying.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Multi-Store Coverage</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Scrape from Jumia, Amazon, and other e-commerce platforms with intelligent extraction.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">99.9% Uptime SLA</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Distributed workers, background job queue, and failover mechanisms for maximum reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Modern Tech Stack
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built with industry-leading technologies for scalability and performance
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-4xl mb-3">{tech.emoji}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Security First
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                PriceNet V2 implements enterprise-grade security measures to protect against common web vulnerabilities
                and bot attacks.
              </p>

              <ul className="space-y-4">
                {[
                  "Secure HTTP-only cookies with SameSite attributes",
                  "CSRF token protection on all state-changing operations",
                  "Rate limiting and IP-based blocking",
                  "Dynamic user agent rotation for ethical scraping",
                  "Request validation with Pydantic schemas",
                  "SQL injection prevention via ORM and parameterized queries",
                  "XSS protection with output encoding",
                  "Environment-based configuration for secrets",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 dark:text-green-400 font-bold text-sm">✓</span>
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Development & Production Modes</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-100">🔧 Development</h4>
                    <p className="text-sm text-blue-100">
                      Debug logging, mock data, relaxed CORS for testing, verbose error messages
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-100">🚀 Production</h4>
                    <p className="text-sm text-blue-100">
                      Hardened security headers, rate limiting enabled, minimal logging, error masking
                    </p>
                  </div>
                  <div className="pt-4 border-t border-blue-400/30">
                    <p className="text-sm text-blue-100">
                      Switch between modes via <code className="bg-blue-700/30 px-2 py-1 rounded">ENVIRONMENT</code>{" "}
                      variable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Compare?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Start comparing prices across multiple e-commerce platforms with AI-powered insights
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-lg transition-all hover:scale-105">
            <Search className="w-5 h-5" />
            Start Searching
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Developers</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900 dark:text-white">PriceNet V2</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2024 PriceNet. Built with modern technologies.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
