import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, ShoppingCart, Heart, Truck, Shield,
  Headphones, Zap, ChevronLeft, ChevronRight, Clock, Sparkles,
  TrendingUp, Award, Package
} from 'lucide-react';
import { Button } from '../../components/ui';
import { formatCurrency } from '../../utils';
import PRODUCTS, { CATEGORIES, DUMMY_REVIEWS } from '../../data/products';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({ days: 3, hours: 14, minutes: 32, seconds: 45 });

  const featuredProducts = PRODUCTS.filter(p => p.isFeatured);
  const flashSaleProducts = PRODUCTS.filter(p => p.isFlashSale);
  const newArrivals = PRODUCTS.slice(0, 8);
  const bestSellers = PRODUCTS.filter(p => p.reviewCount > 500).slice(0, 4);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return prev;
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      title: 'Discover Premium\nLifestyle Products',
      subtitle: 'Curated collections of the finest products for modern living. Free shipping on orders over $100.',
      cta: 'Shop Collection',
      ctaLink: '/products',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      gradient: 'from-violet-950 via-indigo-950 to-slate-950',
    },
    {
      title: 'Flash Sale\nUp to 50% Off',
      subtitle: 'Limited time deals on premium electronics, fashion, and home essentials. Don\'t miss out!',
      cta: 'Shop Deals',
      ctaLink: '/search?q=sale',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop',
      gradient: 'from-rose-950 via-pink-950 to-slate-950',
    },
    {
      title: 'New Season\nNew Arrivals',
      subtitle: 'Explore our latest collection of trending products handpicked for you.',
      cta: 'Explore Now',
      ctaLink: '/products',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop',
      gradient: 'from-emerald-950 via-teal-950 to-slate-950',
    },
  ];

  const ProductCard = ({ product, index }) => (
    <div
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative aspect-square product-image-zoom bg-slate-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.comparePrice && (
            <span className="badge bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25">
              {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
            </span>
          )}
          {product.isFlashSale && (
            <span className="badge bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 flex items-center gap-1">
              <Zap className="h-3 w-3" /> Flash Sale
            </span>
          )}
        </div>
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button className="h-9 w-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-white shadow-lg transition-all">
            <Heart className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-600 hover:text-violet-600 hover:bg-white shadow-lg transition-all">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
        {/* Quick Add */}
        <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link
            to={`/products/${product.slug}`}
            className="block w-full py-2.5 bg-slate-900/90 backdrop-blur-sm text-white text-sm font-medium text-center rounded-xl hover:bg-slate-900 transition-colors"
          >
            View Product
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-200 fill-slate-200'
                  }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 ml-1">({product.reviewCount})</span>
        </div>

        <Link to={`/products/${product.slug}`}>
          <h3 className="font-medium text-sm text-slate-800 mb-2 line-clamp-2 group-hover:text-violet-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-400 mb-3">{product.brand}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-slate-900">
              {formatCurrency(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
          >
            <div className="absolute inset-0">
              <img src={slide.image} alt="" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-sm text-white/80 mb-6 animate-fade-in-up">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>New Collection 2026</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight whitespace-pre-line animate-fade-in-up" style={{ fontFamily: 'var(--font-display)', animationDelay: '0.1s' }}>
                  {slide.title}
                </h1>
                <p className="text-lg text-white/70 mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <Link to={slide.ctaLink}>
                    <button className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl hover:bg-slate-100 transition-all shadow-xl shadow-black/20 flex items-center gap-2 text-sm">
                      {slide.cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <Link to="/categories/electronics">
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-semibold rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2 text-sm">
                      Browse Categories
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentSlide(prev => (prev - 1 + 3) % 3)}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 hidden lg:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % 3)}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 hidden lg:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* ==================== TRUST BADGES ==================== */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
              { icon: Headphones, title: '24/7 Support', desc: 'Dedicated help' },
              { icon: Package, title: 'Easy Returns', desc: '30-day guarantee' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-5 px-4 lg:px-6 justify-center">
                <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-violet-600" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-semibold text-sm text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 text-violet-600 rounded-full text-sm font-medium mb-4">
              <Award className="h-4 w-4" /> Popular Categories
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Shop by Category
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Discover our curated collections across different categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {CATEGORIES.map((category, i) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden hover-card border border-slate-100"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <p className="text-2xl mb-1">{category.icon}</p>
                  <h3 className="font-semibold text-white text-sm">{category.name}</h3>
                  <p className="text-white/60 text-xs">{category.productCount} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FLASH SALE ==================== */}
      {flashSaleProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                    Flash Sale
                  </h2>
                </div>
                <p className="text-slate-500">Don't miss these limited time deals</p>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-rose-500" />
                <span className="text-sm font-medium text-slate-600 mr-1">Ends in:</span>
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hrs' },
                  { value: countdown.minutes, label: 'Min' },
                  { value: countdown.seconds, label: 'Sec' },
                ].map((unit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-slate-900 text-white px-3 py-2 rounded-xl min-w-[48px] text-center">
                      <span className="font-bold text-lg font-mono">{String(unit.value).padStart(2, '0')}</span>
                      <p className="text-[10px] text-slate-400 uppercase">{unit.label}</p>
                    </div>
                    {i < 3 && <span className="text-slate-300 font-bold">:</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 text-violet-600 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="h-4 w-4" /> Trending Now
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                Featured Products
              </h2>
            </div>
            <Link to="/products" className="hidden sm:flex">
              <button className="px-5 py-2.5 text-sm font-medium text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100 transition-all flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/products">
              <button className="px-6 py-3 text-sm font-medium text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100 transition-all flex items-center gap-2 mx-auto">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PROMO BANNER ==================== */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden gradient-mesh p-12 lg:p-20">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-sm font-medium mb-6 border border-white/10">
                <Sparkles className="h-4 w-4 text-amber-400" /> Premium Quality
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Build Your Dream Store with EcomSaaS
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                The ultimate eCommerce platform for modern businesses. Fully customizable, scalable, and ready to grow with you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <button className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl hover:bg-slate-100 transition-all shadow-xl shadow-black/20 flex items-center gap-2 text-sm">
                    Start Shopping
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BEST SELLERS ==================== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-sm font-medium mb-4">
              <Award className="h-4 w-4" /> Best Sellers
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Most Popular Products
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Our customers' top picks — loved by thousands
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              What Our Customers Say
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DUMMY_REVIEWS.slice(0, 3).map((review, i) => (
              <div
                key={review.id}
                className="p-6 lg:p-8 bg-slate-50 rounded-2xl border border-slate-100 hover-card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">"{review.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{review.user}</p>
                    <p className="text-xs text-slate-400">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEW ARRIVALS ==================== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" /> Just Arrived
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                New Arrivals
              </h2>
            </div>
            <Link to="/products">
              <button className="hidden sm:flex px-5 py-2.5 text-sm font-medium text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100 transition-all items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to Get Started?
            </h2>
            <p className="text-slate-500 mb-8">
              Join thousands of businesses already using EcomSaaS to power their online stores
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login">
                <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 flex items-center gap-2 text-sm">
                  Create Your Store
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-4 bg-slate-100 text-slate-800 font-semibold rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2 text-sm">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;