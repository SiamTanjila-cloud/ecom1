import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings, TrendingUp,
  DollarSign, Eye, ArrowUpRight, ArrowDownRight, BarChart3, PieChart,
  Bell, Search, Menu, ChevronRight, Store, Star, Activity
} from 'lucide-react';
import { formatCurrency } from '../../utils';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { label: 'Total Revenue', value: '$48,352', change: '+12.5%', up: true, icon: DollarSign, color: 'from-violet-500 to-indigo-500' },
    { label: 'Total Orders', value: '1,423', change: '+8.2%', up: true, icon: ShoppingCart, color: 'from-emerald-500 to-teal-500' },
    { label: 'Total Customers', value: '3,841', change: '+23.1%', up: true, icon: Users, color: 'from-amber-500 to-orange-500' },
    { label: 'Conversion Rate', value: '3.24%', change: '-0.4%', up: false, icon: TrendingUp, color: 'from-rose-500 to-pink-500' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Sarah Mitchell', amount: 299.99, status: 'Completed', date: '2026-03-01' },
    { id: 'ORD-002', customer: 'James Wilson', amount: 189.99, status: 'Processing', date: '2026-03-01' },
    { id: 'ORD-003', customer: 'Emily Chen', amount: 459.98, status: 'Shipped', date: '2026-02-28' },
    { id: 'ORD-004', customer: 'Michael Brown', amount: 79.99, status: 'Completed', date: '2026-02-28' },
    { id: 'ORD-005', customer: 'Lisa Anderson', amount: 349.97, status: 'Pending', date: '2026-02-27' },
  ];

  const topProducts = [
    { name: 'Premium Wireless Headphones', sold: 342, revenue: 102258, trend: '+15%' },
    { name: 'Ultra-Slim Laptop 15"', sold: 89, revenue: 169099, trend: '+8%' },
    { name: 'Ergonomic Office Chair', sold: 156, revenue: 93599, trend: '+22%' },
    { name: 'Premium Running Shoes', sold: 267, revenue: 48057, trend: '+11%' },
  ];

  const sidebarLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/admin', active: true },
    { icon: Package, label: 'Products', to: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', to: '/admin/orders' },
    { icon: Users, label: 'Customers', to: '/admin/customers' },
    { icon: BarChart3, label: 'Analytics', to: '/admin' },
    { icon: Settings, label: 'Settings', to: '/admin/settings' },
  ];

  const statusColors = {
    Completed: 'bg-emerald-50 text-emerald-700',
    Processing: 'bg-amber-50 text-amber-700',
    Shipped: 'bg-blue-50 text-blue-700',
    Pending: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white flex-shrink-0 transition-all duration-300 hidden lg:flex flex-col`}>
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Store className="h-5 w-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>Admin</span>}
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${link.active ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors">
            <Eye className="h-4 w-4" />
            {sidebarOpen && <span>View Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-100 px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input placeholder="Search..." className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none w-64 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400" />
              </div>
              <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full" />
              </button>
              <div className="h-9 w-9 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-sm font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 hover-card">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stat.up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart Placeholder */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Revenue Overview</h3>
                <select className="text-sm px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              {/* Simulated chart bars */}
              <div className="flex items-end gap-3 h-48">
                {[65, 45, 75, 60, 85, 50, 90, 70, 55, 80, 65, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-lg transition-all duration-500 hover:from-violet-700 hover:to-violet-500"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] text-slate-400">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Top Products</h3>
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-500">
                      #{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.sold} sold</p>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{product.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Recent Orders</h3>
              <Link to="/admin/orders" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Order ID</th>
                    <th className="pb-3 pr-4">Customer</th>
                    <th className="pb-3 pr-4">Amount</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="text-sm">
                      <td className="py-3 pr-4 font-medium text-slate-900">{order.id}</td>
                      <td className="py-3 pr-4 text-slate-600">{order.customer}</td>
                      <td className="py-3 pr-4 font-medium text-slate-900">{formatCurrency(order.amount)}</td>
                      <td className="py-3 pr-4">
                        <span className={`badge ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}>{order.status}</span>
                      </td>
                      <td className="py-3 text-slate-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;