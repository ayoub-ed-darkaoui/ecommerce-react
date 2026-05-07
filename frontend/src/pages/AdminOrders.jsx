import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, MapPin, Phone, User, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { API_BASE_URL, isNetworkError } from '../config/api';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('admin_token');

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Fetch orders error:', err);
      const fallbackMessage = isNetworkError(err)
        ? 'Cannot reach API server. Ensure backend runs on http://127.0.0.1:5000 and CORS allows requests.'
        : 'Failed to fetch orders';

      setError(err.message || fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('admin_token');

    if (token) {
      try {
        await fetch(`${API_BASE_URL}/admin/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (_error) {
      }
    }

    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#111]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[28px] border border-black/5 bg-white px-6 py-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#FFDE42]">Dashboard</p>
              <h1 className="text-4xl font-black uppercase tracking-tight md:text-5xl">Orders</h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600">Manage all customer orders with a clear, modern admin view.</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#111] hover:text-[#FFDE42] hover:shadow-[0_14px_30px_rgba(0,0,0,0.14)]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#f7f7f4] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">Orders</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-black text-[#111]">{orders.length}</span>
                <Package className="h-5 w-5 text-[#FFDE42]" />
              </div>
            </div>
            <div className="rounded-2xl bg-[#f7f7f4] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">Revenue</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-black text-[#111]">{totalRevenue.toFixed(2)} MAD</span>
                <ShoppingBag className="h-5 w-5 text-[#FFDE42]" />
              </div>
            </div>
            <div className="rounded-2xl bg-[#f7f7f4] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">Latest access</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-black text-[#111]">Live</span>
                <ArrowUpRight className="h-5 w-5 text-[#FFDE42]" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center rounded-[28px] bg-white py-16 shadow-[0_12px_35px_rgba(0,0,0,0.06)]">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-[#FFDE42]" />
              <p className="text-lg font-semibold text-zinc-600">Loading orders...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-medium text-red-700">
            Error: {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && orders.length === 0 && (
          <div className="rounded-[28px] bg-white p-12 text-center shadow-[0_12px_35px_rgba(0,0,0,0.06)]">
            <Package className="mx-auto mb-4 h-16 w-16 text-zinc-300" />
            <p className="text-lg font-semibold text-zinc-600">No orders yet</p>
            <p className="mt-2 text-sm text-zinc-500">Orders will appear here when customers place them</p>
          </div>
        )}

        {/* Orders Grid */}
        {!isLoading && orders.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group rounded-[24px] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
              >
                {/* Order Header */}
                <div className="mb-5 border-b border-black/10 pb-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Order</p>
                  <div className="mt-2 flex items-baseline justify-between">
                    <p className="text-2xl font-black text-[#111]">#{order.id}</p>
                    <p className="text-xs text-zinc-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="mt-1 h-4 w-4 flex-shrink-0 text-[#FFDE42]" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Customer</p>
                      <p className="font-semibold text-[#111]">{order.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-[#FFDE42]" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Phone</p>
                      <p className="font-semibold text-[#111]">{order.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#FFDE42]" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Location</p>
                      <p className="font-semibold text-[#111]">{order.address}, {order.city}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-5 border-b border-black/10 pb-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-500">Items</p>
                  <div className="space-y-2">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-3 rounded-xl bg-zinc-50 p-3 text-sm">
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold uppercase text-xs text-[#111]">{item.product_name}</p>
                            <p className="mt-1 text-xs text-zinc-600">Size {item.size} × Qty {item.quantity}</p>
                          </div>
                          <p className="whitespace-nowrap font-bold text-[#111]">{item.price * item.quantity} MAD</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-600">No items</p>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between border-t border-black/10 pt-4">
                  <span className="text-sm font-bold uppercase tracking-wide text-zinc-600">Total</span>
                  <span className="text-2xl font-black text-[#FFDE42]">{order.total} MAD</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
