import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, LogOut, TrendingDown, Search, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  store: string;
  url: string;
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "Smartphones",
    price: "",
    store: "",
    url: "",
  });

  // Vérifier l'authentification
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
      loadProducts();
    }
  }, [navigate]);

  const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  };

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        store: product.store,
        url: product.url,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        category: "Smartphones",
        price: "",
        store: "",
        url: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      category: "Smartphones",
      price: "",
      store: "",
      url: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.store) {
      alert("Veuillez remplir tous les champs requis");
      return;
    }

    if (editingId) {
      // Éditer
      const updated = products.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              price: parseFloat(formData.price),
              store: formData.store,
              url: formData.url,
            }
          : p
      );
      saveProducts(updated);
    } else {
      // Créer
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        store: formData.store,
        url: formData.url,
        createdAt: new Date().toISOString(),
      };
      saveProducts([...products, newProduct]);
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
      saveProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.store.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PriceNet
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Bienvenue, <span className="font-semibold text-slate-900 dark:text-white">{currentUser.email}</span>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              Mes Produits
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Gérez et comparez les prix de vos produits
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:scale-105 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Ajouter un produit
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom ou boutique..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Products Table */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <TrendingDown className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {searchQuery ? "Aucun résultat" : "Aucun produit"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              {searchQuery
                ? "Essayez une autre recherche"
                : "Commencez en ajoutant votre premier produit"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Ajouter un produit
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Produit</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Catégorie</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Boutique</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Prix</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {product.name}
                        </p>
                        {product.url && (
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Voir le lien
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {product.store}
                    </td>
                    <td className="px-6 py-4 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {product.price.toLocaleString("fr-FR", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}{" "}
                      MGA
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        title="Éditer"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {editingId ? "Éditer le produit" : "Ajouter un produit"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Samsung Galaxy S24"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option>Smartphones</option>
                  <option>Laptops</option>
                  <option>Headphones</option>
                  <option>Tablets</option>
                  <option>Autre</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Prix (MGA) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="ex: 850000"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Store */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Boutique *
                </label>
                <input
                  type="text"
                  value={formData.store}
                  onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                  placeholder="ex: Jumia, Amazon"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Lien du produit
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
