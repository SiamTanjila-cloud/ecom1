import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, ChevronRight, Truck, Check, Clock, XCircle, Search } from 'lucide-react';
import { formatCurrency } from '../../utils';
import { DUMMY_ORDERS } from '../../data/products';

const OrdersPage = () => {
  const [filter, setFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const orders = DUMMY_ORDERS;
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status.toLowerCase() === filter);

  const statusConfig = {
    Delivered: { color: 'bg-emerald-50 text-emerald-700', icon: Check },
    Shipped: { color: 'bg-blue-50 text-blue-700', icon: Truck },
    Processing: { color: 'bg-amber-50 text-amber-700', icon: Clock },
    Cancelled: { color: 'bg-red-50 text-red-700', icon: XCircle },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>My Orders</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {['all', 'delivered', 'shipped', 'processing', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${filter === f ? 'bg-violet-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
            >
              {f === 'all' ? 'All Orders' : f}
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {filtered.map((order) => {
            const config = statusConfig[order.status] || statusConfig.Processing;
            const StatusIcon = config.icon;
            const isExpanded = expandedOrder === order.id;

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="flex items-center justify-between p-5 lg:p-6 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Package className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{order.id}</p>
                      <p className="text-sm text-slate-500">{order.date} • {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`badge ${config.color} flex items-center gap-1`}>
                      <StatusIcon className="h-3.5 w-3.5" /> {order.status}
                    </span>
                    <span className="font-bold text-slate-900 hidden sm:block">{formatCurrency(order.total)}</span>
                    <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 lg:p-6 animate-slide-down">
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                          <img src={item.product.images[0]} alt="" className="h-16 w-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <Link to={`/products/${item.product.slug}`} className="font-medium text-sm text-slate-900 hover:text-violet-600">{item.product.name}</Link>
                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-semibold text-sm">{formatCurrency(item.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-slate-100">
                      <div className="text-sm text-slate-500 space-y-1">
                        <p>Tracking: <span className="font-medium text-slate-700">{order.tracking}</span></p>
                        {order.deliveryDate && <p>Delivery: <span className="font-medium text-slate-700">{order.deliveryDate}</span></p>}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors">Track Order</button>
                        <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">View Invoice</button>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 text-right">
                      <p className="text-sm text-slate-500">Order Total: <span className="text-lg font-bold text-slate-900">{formatCurrency(order.total)}</span></p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Orders Found</h3>
            <p className="text-slate-500 mb-6">You haven't placed any orders yet.</p>
            <Link to="/products">
              <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors text-sm">Start Shopping</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;