import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search, Star, ShoppingCart, Heart, Filter, Grid3x3, List,
  ChevronDown, X, SlidersHorizontal, ArrowUpDown
} from 'lucide-react';
import { formatCurrency } from '../../utils';
import PRODUCTS, { CATEGORIES } from '../../data/products';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: [0, 5000],
    rating: 0,
    inStock: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (filters.category) {
      result = result.filter(p => p.categorySlug === filters.category);
    }
    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating);
    }
    if (filters.inStock) {
      result = result.filter(p => p.stock > 0);
    }
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'newest': result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); break;
    }

    return result;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const clearFilters = () => {
    setFilters({ category: '', priceRange: [0, 5000], rating: 0, inStock: false });
    setCurrentPage(1);
  };

  const activeFilterCount = [
    filters.category,
    filters.rating > 0,
    filters.inStock,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 5000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            All Products
          </h1>
          <p className="text-violet-200">
            Discover our complete collection of {PRODUCTS.length}+ premium products
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`
            ${showFilters ? 'fixed inset-0 z-50 bg-black/50 lg:relative lg:bg-transparent lg:z-auto' : 'hidden lg:block'}
            lg:w-64 lg:shrink-0
          `}>
            <div className={`
              ${showFilters ? 'absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto lg:relative lg:w-auto lg:shadow-none lg:p-0' : ''}
            `}>
              {/* Mobile filter header */}
              {showFilters && (
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6 lg:sticky lg:top-24">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-violet-600 hover:underline">
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-slate-700">Category</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setFilters(f => ({ ...f, category: '' })); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${!filters.category ? 'bg-violet-50 text-violet-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.slug}
                        onClick={() => { setFilters(f => ({ ...f, category: cat.slug })); setCurrentPage(1); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${filters.category === cat.slug ? 'bg-violet-50 text-violet-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        <span>{cat.icon} {cat.name}</span>
                        <span className="text-xs text-slate-400">{cat.productCount}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-slate-700">Price Range</h4>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0] || ''}
                      onChange={(e) => { setFilters(f => ({ ...f, priceRange: [Number(e.target.value) || 0, f.priceRange[1]] })); setCurrentPage(1); }}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none"
                    />
                    <span className="text-slate-400 self-center">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1] === 5000 ? '' : filters.priceRange[1]}
                      onChange={(e) => { setFilters(f => ({ ...f, priceRange: [f.priceRange[0], Number(e.target.value) || 5000] })); setCurrentPage(1); }}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-slate-700">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <button
                        key={rating}
                        onClick={() => { setFilters(f => ({ ...f, rating: f.rating === rating ? 0 : rating })); setCurrentPage(1); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${filters.rating === rating ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                          ))}
                        </div>
                        <span>& Up</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* In Stock */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => { setFilters(f => ({ ...f, inStock: e.target.checked })); setCurrentPage(1); }}
                      className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-sm text-slate-700">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 p-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="h-5 w-5 bg-violet-600 text-white text-xs rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{filteredProducts.length}</span> products found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="hidden sm:flex items-center bg-slate-50 rounded-xl p-0.5 border border-slate-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-violet-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-violet-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-slate-500">Active:</span>
                {filters.category && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-sm">
                    {CATEGORIES.find(c => c.slug === filters.category)?.name}
                    <button onClick={() => setFilters(f => ({ ...f, category: '' }))} className="hover:text-violet-900">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                {filters.rating > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-sm">
                    {filters.rating}+ Stars
                    <button onClick={() => setFilters(f => ({ ...f, rating: 0 }))} className="hover:text-amber-900">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                {filters.inStock && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                    In Stock
                    <button onClick={() => setFilters(f => ({ ...f, inStock: false }))} className="hover:text-emerald-900">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid / List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover-card">
                    <div className="relative aspect-square product-image-zoom bg-slate-50">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      {product.comparePrice && (
                        <span className="absolute top-3 left-3 badge bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg">
                          {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                        </span>
                      )}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <button className="h-9 w-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-600 hover:text-rose-500 shadow-lg transition-all">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Link to={`/products/${product.slug}`} className="block w-full py-2.5 bg-slate-900/90 backdrop-blur-sm text-white text-sm font-medium text-center rounded-xl hover:bg-slate-900 transition-colors">
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
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="group flex bg-white rounded-2xl border border-slate-100 overflow-hidden hover-card">
                    <div className="relative w-48 h-48 shrink-0 product-image-zoom bg-slate-50">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      {product.comparePrice && (
                        <span className="absolute top-3 left-3 badge bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs">
                          {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                          ))}
                          <span className="text-xs text-slate-400 ml-1">({product.reviewCount})</span>
                        </div>
                        <Link to={`/products/${product.slug}`}>
                          <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-violet-700 transition-colors">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-2">{product.shortDescription}</p>
                        <p className="text-xs text-slate-400">{product.brand} • {product.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-slate-900">{formatCurrency(product.price)}</span>
                          {product.comparePrice && <span className="text-sm text-slate-400 line-through">{formatCurrency(product.comparePrice)}</span>}
                        </div>
                        <Link to={`/products/${product.slug}`}>
                          <button className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4" /> View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-10 w-10 text-sm font-medium rounded-xl transition-all ${currentPage === i + 1
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                        : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;