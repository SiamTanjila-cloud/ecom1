import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Star, Heart, ShoppingCart, X, SlidersHorizontal } from 'lucide-react';
import { formatCurrency } from '../../utils';
import PRODUCTS from '../../data/products';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('relevance');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    let filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );

    switch (sortBy) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return filtered;
  }, [query, sortBy]);

  const suggestions = ['Headphones', 'Laptop', 'Watch', 'Running Shoes', 'Camera', 'Coffee'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Search Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands, categories..."
                autoFocus
                className="w-full pl-12 pr-12 py-4 text-lg bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              )}
            </form>
            {!query && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-slate-500">Popular:</span>
                {suggestions.map(s => (
                  <button key={s} onClick={() => setQuery(s)} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {query && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500">
              Found <span className="font-semibold text-slate-700">{results.length}</span> results for "<span className="text-violet-600">{query}</span>"
            </p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none">
              <option value="relevance">Most Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {results.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover-card">
                <div className="relative aspect-square product-image-zoom bg-slate-50">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                  {product.comparePrice && (
                    <span className="absolute top-3 left-3 badge bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                      {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                    </span>
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    <Link to={`/products/${product.slug}`} className="block w-full py-2.5 bg-slate-900/90 backdrop-blur-sm text-white text-sm font-medium text-center rounded-xl">
                      View Product
                    </Link>
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
        ) : query ? (
          <div className="text-center py-20">
            <SearchIcon className="h-16 w-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
            <p className="text-slate-500 mb-6">Try different keywords or browse our categories</p>
            <Link to="/products">
              <button className="px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors text-sm">Browse All Products</button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;