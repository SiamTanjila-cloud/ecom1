import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Search, Edit, Trash2, Eye, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils';
import PRODUCTS from '../../data/products';

export const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const products = PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Products</h1>
        <button className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 text-sm flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="px-4 py-3">Product</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Rating</th><th className="px-4 py-3">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {products.slice(0, 15).map(product => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <div><p className="text-sm font-medium text-slate-900 truncate max-w-48">{product.name}</p><p className="text-xs text-slate-400">{product.sku}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3"><span className={`badge ${product.stock > 50 ? 'badge-success' : product.stock > 10 ? 'badge-warning' : 'badge-danger'}`}>{product.stock}</span></td>
                  <td className="px-4 py-3 text-sm text-slate-600">{product.category}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">⭐ {product.rating}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg"><Eye className="h-4 w-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="h-4 w-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminOrders = () => {
  const orders = [
    { id: 'ORD-001', customer: 'Sarah M.', email: 'sarah@email.com', total: 299.99, status: 'Completed', date: '2026-03-01', items: 2 },
    { id: 'ORD-002', customer: 'James W.', email: 'james@email.com', total: 189.99, status: 'Processing', date: '2026-03-01', items: 1 },
    { id: 'ORD-003', customer: 'Emily C.', email: 'emily@email.com', total: 459.98, status: 'Shipped', date: '2026-02-28', items: 3 },
    { id: 'ORD-004', customer: 'Michael B.', email: 'michael@email.com', total: 79.99, status: 'Completed', date: '2026-02-28', items: 1 },
    { id: 'ORD-005', customer: 'Lisa A.', email: 'lisa@email.com', total: 349.97, status: 'Pending', date: '2026-02-27', items: 4 },
    { id: 'ORD-006', customer: 'David K.', email: 'david@email.com', total: 599.99, status: 'Refunded', date: '2026-02-26', items: 1 },
  ];
  const statusColors = {
    Completed: 'badge-success', Processing: 'badge-warning', Shipped: 'badge-info', Pending: 'badge-primary', Refunded: 'badge-danger',
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>Orders</h1>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="px-6 py-3">Order ID</th><th className="px-6 py-3">Customer</th><th className="px-6 py-3">Items</th><th className="px-6 py-3">Total</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Date</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4"><p className="text-sm font-medium text-slate-900">{order.customer}</p><p className="text-xs text-slate-400">{order.email}</p></td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{formatCurrency(order.total)}</td>
                  <td className="px-6 py-4"><span className={`badge ${statusColors[order.status]}`}>{order.status}</span></td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminCustomers = () => {
  const customers = [
    { name: 'Sarah Mitchell', email: 'sarah@email.com', orders: 12, spent: 2340, joined: '2025-06-15' },
    { name: 'James Wilson', email: 'james@email.com', orders: 8, spent: 1560, joined: '2025-07-22' },
    { name: 'Emily Chen', email: 'emily@email.com', orders: 23, spent: 4890, joined: '2025-03-10' },
    { name: 'Michael Brown', email: 'michael@email.com', orders: 5, spent: 890, joined: '2025-09-01' },
    { name: 'Lisa Anderson', email: 'lisa@email.com', orders: 15, spent: 3210, joined: '2025-04-18' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>Customers</h1>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="px-6 py-3">Customer</th><th className="px-6 py-3">Orders</th><th className="px-6 py-3">Total Spent</th><th className="px-6 py-3">Joined</th><th className="px-6 py-3">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div><p className="text-sm font-medium text-slate-900">{c.name}</p><p className="text-xs text-slate-400">{c.email}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{formatCurrency(c.spent)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{c.joined}</td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg"><Eye className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminSettings = () => (
  <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
    <h1 className="text-2xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>Settings</h1>
    <div className="max-w-3xl space-y-6">
      {[
        { title: 'Store Information', fields: [{ label: 'Store Name', value: 'EcomSaaS Store' }, { label: 'Store URL', value: 'https://store.ecomsaas.com' }, { label: 'Contact Email', value: 'admin@ecomsaas.com' }] },
        { title: 'Tax Configuration', fields: [{ label: 'Tax Rate (%)', value: '10' }, { label: 'Tax Inclusive Pricing', value: 'No' }] },
        { title: 'Shipping Settings', fields: [{ label: 'Free Shipping Threshold ($)', value: '100' }, { label: 'Default Shipping Rate ($)', value: '9.99' }] },
      ].map((section) => (
        <div key={section.title} className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.fields.map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                <input defaultValue={f.value} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 text-sm">
        Save Settings
      </button>
    </div>
  </div>
);