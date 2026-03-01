import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ArrowRight, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils';
import PRODUCTS, { CATEGORIES } from '../../data/products';

const CategoryPage = () => {
  const { slug } = useParams();
  const category = CATEGORIES.find(c => c.slug === slug);
  const products = useMemo(() => PRODUCTS.filter(p => p.categorySlug === slug), [slug]);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Category Not Found</h2>
        <p className="text-slate-500 mb-6">This category doesn't exist.</p>
        <Link to="/products" className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors">Browse All Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-8">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-3">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">{category.name}</span>
            </nav>
            <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {category.icon} {category.name}
            </h1>
            <p className="text-white/70">{category.description} • {products.length} products</p>
          </div>
        </div>
      </div>

      {/* Other Categories */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${cat.slug === slug ? 'bg-violet-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover-card">
              <div className="relative aspect-square product-image-zoom bg-slate-50">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                {product.comparePrice && (
                  <span className="absolute top-3 left-3 badge bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg">
                    {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                  </span>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="h-9 w-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-600 hover:text-rose-500 shadow-lg transition-all">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <Link to={`/products/${product.slug}`} className="block w-full py-2.5 bg-slate-900/90 backdrop-blur-sm text-white text-sm font-medium text-center rounded-xl">View Product</Link>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">({product.reviewCount})</span>
                </div>
                <Link to={`/products/${product.slug}`}>
                  <h3 className="font-medium text-sm text-slate-800 mb-1 line-clamp-2 group-hover:text-violet-700 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-xs text-slate-400 mb-3">{product.brand}</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-slate-900">{formatCurrency(product.price)}</span>
                  {product.comparePrice && <span className="text-sm text-slate-400 line-through">{formatCurrency(product.comparePrice)}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 mb-4">No products found in this category.</p>
            <Link to="/products">
              <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700">Browse All Products</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;