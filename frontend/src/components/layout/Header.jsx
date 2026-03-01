import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Store,
  LayoutDashboard
} from 'lucide-react';
import { useAuthStore, useCartStore, useUIStore, useWishlistStore } from '../../store';
import { Button } from '../ui';
import { cn } from '../../utils';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { mobileMenuOpen, setMobileMenuOpen, toggleCart } = useUIStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuOpen && !e.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = wishlistItems.length;

  const navLinks = [
    { to: '/products', label: 'Products' },
    { to: '/categories/electronics', label: 'Categories' },
    { to: '/search?q=sale', label: 'Deals' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full transition-all duration-300',
      scrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] border-b border-slate-200/50'
        : 'bg-white/60 backdrop-blur-md border-b border-transparent'
    )}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              <Store className="h-5 w-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Ecom<span className="gradient-text">SaaS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive(link.to)
                    ? 'text-violet-700 bg-violet-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md">
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all outline-none placeholder:text-slate-400"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2.5 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all">
              <Heart className="h-5 w-5" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 min-w-[18px] bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 min-w-[18px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-1.5 pr-3 hover:bg-slate-50 rounded-xl transition-all"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-semibold">
                      {user?.firstName?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <ChevronDown className={cn(
                    "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
                    userMenuOpen && "rotate-180"
                  )} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-black/[0.08] border border-slate-100 py-2 animate-scale-in origin-top-right">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Package className="h-4 w-4" />
                        My Orders
                      </Link>

                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="!text-slate-600 hover:!text-slate-900">
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate('/login')} className="!bg-gradient-to-r !from-violet-600 !to-indigo-600 hover:!from-violet-700 hover:!to-indigo-700 !shadow-lg !shadow-violet-500/25 !rounded-xl">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-4 animate-slide-down">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all outline-none"
              />
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "block py-2.5 px-3 text-sm font-medium rounded-lg transition-all",
                    isActive(link.to)
                      ? 'text-violet-700 bg-violet-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {!isAuthenticated && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                  Sign In
                </Button>
                <Button size="sm" className="flex-1 !bg-gradient-to-r !from-violet-600 !to-indigo-600" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;