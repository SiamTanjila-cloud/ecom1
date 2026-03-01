import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Store,
  Heart
} from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* Gradient overlay at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      {/* Mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 pb-8">
        {/* Newsletter Section */}
        <div className="relative mb-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-white/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Stay in the Loop
              </h3>
              <p className="text-slate-400 text-sm md:text-base">
                Get exclusive deals, new product launches, and insider tips delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-72">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 outline-none transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all flex items-center gap-2 text-sm whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                {!subscribed && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Store className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                EcomSaaS
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              The ultimate eCommerce platform for modern businesses.
              Build, customize, and scale your store with ease.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/30 transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300">Shop</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/products', label: 'All Products' },
                { to: '/categories/electronics', label: 'Electronics' },
                { to: '/categories/fashion', label: 'Fashion' },
                { to: '/search?q=sale', label: 'Deals & Offers' },
                { to: '/products?sort=created-desc', label: 'New Arrivals' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300">Account</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/profile', label: 'My Profile' },
                { to: '/orders', label: 'Order History' },
                { to: '/wishlist', label: 'Wishlist' },
                { to: '/cart', label: 'Shopping Cart' },
                { to: '/login', label: 'Sign In' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300">Support</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/help', label: 'Help Center' },
                { to: '/shipping', label: 'Shipping Info' },
                { to: '/returns', label: 'Returns' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span>support@ecomsaas.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 shrink-0">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span>123 Innovation Drive<br />San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            © 2026 EcomSaaS. Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" /> All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Service' },
              { to: '/cookies', label: 'Cookie Policy' },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="text-slate-500 hover:text-white text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;