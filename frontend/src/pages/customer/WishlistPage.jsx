import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Trash2, X } from 'lucide-react';
import { formatCurrency } from '../../utils';
import PRODUCTS from '../../data/products';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(
    PRODUCTS.filter(p => [2, 5, 11, 14, 23]).includes(p.id) ? [] : [PRODUCTS[1], PRODUCTS[4], PRODUCTS[10], PRODUCTS[13], PRODUCTS[22]]
  );

  const removeItem = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="h-24 w-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
          <Heart className="h-12 w-12 text-rose-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Your Wishlist is Empty</h2>
        <p className="text-slate-500 mb-6">Save items you love for later.</p>
        <Link to="/products">
          <button className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-2xl shadow-lg shadow-violet-500/25 text-sm">
            Explore Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
            My Wishlist <span className="text-slate-400 text-lg font-normal">({wishlistItems.length} items)</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover-card relative">
              <button
                onClick={() => removeItem(product.id)}
                className="absolute top-3 right-3 z-10 h-8 w-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 shadow-sm transition-all"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative aspect-square product-image-zoom bg-slate-50">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                {product.comparePrice && (
                  <span className="absolute top-3 left-3 badge bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                    {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                  ))}
                </div>
                <Link to={`/products/${product.slug}`}>
                  <h3 className="font-medium text-sm text-slate-800 mb-1 line-clamp-2 hover:text-violet-700">{product.name}</h3>
                </Link>
                <p className="text-xs text-slate-400 mb-3">{product.brand}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-lg text-slate-900">{formatCurrency(product.price)}</span>
                  {product.comparePrice && <span className="text-sm text-slate-400 line-through">{formatCurrency(product.comparePrice)}</span>}
                </div>
                <button className="w-full py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;