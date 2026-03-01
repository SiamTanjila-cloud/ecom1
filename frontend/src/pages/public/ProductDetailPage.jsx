import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star, ShoppingCart, Heart, Minus, Plus, Truck,
  Shield, RotateCcw, Share2, ChevronRight, Check, Package
} from 'lucide-react';
import { formatCurrency } from '../../utils';
import PRODUCTS, { DUMMY_REVIEWS } from '../../data/products';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeTab, setActiveTab] = useState('description');

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-500 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/products" className="hover:text-violet-600 transition-colors">Products</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/categories/${product.categorySlug}`} className="hover:text-violet-600 transition-colors">{product.category}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-rose-500/25">
                  -{discount}%
                </span>
              )}
              <button className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-500 hover:text-rose-500 shadow-lg transition-all">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-violet-500 shadow-lg shadow-violet-500/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-violet-600 font-medium mb-2">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                  ))}
                </div>
                <span className="text-sm text-slate-500">{product.rating} ({product.reviewCount} reviews)</span>
                <span className="text-slate-300">|</span>
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
                {product.comparePrice && (
                  <>
                    <span className="text-xl text-slate-400 line-through">{formatCurrency(product.comparePrice)}</span>
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-sm font-semibold rounded-lg">
                      Save {formatCurrency(product.comparePrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-slate-600 leading-relaxed">{product.shortDescription}</p>
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                {product.variants.map((variant) => (
                  <div key={variant.id}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {variant.name}: <span className="text-violet-600">{selectedVariants[variant.name] || 'Select'}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedVariants(v => ({ ...v, [variant.name]: opt }))}
                          className={`px-4 py-2 text-sm rounded-xl border transition-all ${selectedVariants[variant.name] === opt
                            ? 'border-violet-500 bg-violet-50 text-violet-700 font-medium shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-slate-700">Quantity:</label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="h-10 w-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="h-10 w-12 flex items-center justify-center text-sm font-semibold border-x border-slate-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="h-10 w-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2 text-sm">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <button className="px-5 py-3.5 border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="px-5 py-3.5 border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="text-center p-3 bg-slate-50 rounded-xl">
                <Truck className="h-5 w-5 text-violet-600 mx-auto mb-1" />
                <p className="text-xs text-slate-600 font-medium">Free Shipping</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-xl">
                <Shield className="h-5 w-5 text-violet-600 mx-auto mb-1" />
                <p className="text-xs text-slate-600 font-medium">2-Year Warranty</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-xl">
                <RotateCcw className="h-5 w-5 text-violet-600 mx-auto mb-1" />
                <p className="text-xs text-slate-600 font-medium">30-Day Returns</p>
              </div>
            </div>

            {/* SKU & Meta */}
            <div className="text-sm text-slate-400 space-y-1 pt-4 border-t border-slate-100">
              <p><span className="font-medium text-slate-500">SKU:</span> {product.sku}</p>
              <p><span className="font-medium text-slate-500">Category:</span> {product.category}</p>
              <p><span className="font-medium text-slate-500">Tags:</span> {product.tags.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-slate-200 mb-8">
            {['description', 'features', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-all border-b-2 ${activeTab === tab
                  ? 'border-violet-600 text-violet-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="max-w-3xl text-slate-600 leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed vel urna eu leo suscipit pharetra. Proin nec felis vel sem tempor faucibus vel a magna. Integer malesuada nisl sit amet lectus viverra, a lacinia nisi consectetur.</p>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="h-8 w-8 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl space-y-6">
              {/* Rating Summary */}
              <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-900">{product.rating}</p>
                  <div className="flex items-center gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 w-3">{stars}</span>
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{
                            width: `${stars === 5 ? 60
                              : stars === 4 ? 25
                                : stars === 3 ? 10
                                  : stars === 2 ? 3
                                    : 2}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              {DUMMY_REVIEWS.map((review) => (
                <div key={review.id} className="p-6 border border-slate-100 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{review.user}</p>
                        <p className="text-xs text-slate-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <button className="text-xs text-slate-400 hover:text-violet-600 transition-colors">
                      👍 Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              Related Products
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover-card">
                  <div className="relative aspect-square product-image-zoom bg-slate-50">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm text-slate-800 mb-1 line-clamp-2 group-hover:text-violet-700 transition-colors">{p.name}</h3>
                    <p className="text-xs text-slate-400 mb-2">{p.brand}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{formatCurrency(p.price)}</span>
                      {p.comparePrice && <span className="text-xs text-slate-400 line-through">{formatCurrency(p.comparePrice)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;