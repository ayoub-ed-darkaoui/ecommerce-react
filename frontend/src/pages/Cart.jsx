import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleUpdate = (id, size, currentQuantity, change) => {
    updateQuantity(id, size, currentQuantity + change);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f7f4] flex flex-col items-center justify-center py-12 px-4">
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tight text-[#111]">Your Cart is Empty</h2>
        <p className="mb-8 text-lg text-zinc-600">Looks like you haven't added any gear yet.</p>
        <Link 
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FFDE42] px-8 py-3 text-lg font-black text-black shadow-[0_14px_30px_rgba(255,222,66,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,222,66,0.28)]"
        >
          START SHOPPING <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] py-12 px-4 sm:px-6 lg:px-8 text-[#111]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#FFDE42]">Shopping Bag</p>
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-5xl">Your Cart</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-5 lg:col-span-2">
            {cart.map((item) => (
              <div 
                key={`${item.id}-${item.size}`} 
                className="group flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:gap-6 sm:p-5"
              >
                <div className="relative h-28 w-full flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-28 sm:w-28">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                
                <div className="flex w-full flex-1 flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-black uppercase tracking-tight text-[#111]">{item.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-zinc-500">
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1">Size: {item.size}</span>
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <p className="whitespace-nowrap text-lg font-black text-[#111]">{item.price} MAD</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center rounded-xl bg-zinc-100 p-1">
                      <button 
                        onClick={() => handleUpdate(item.id, item.size, item.quantity, -1)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-all duration-200 hover:bg-[#FFDE42] hover:text-black"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-[#111]">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdate(item.id, item.size, item.quantity, 1)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-all duration-200 hover:bg-[#FFDE42] hover:text-black"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-100 hover:text-red-700"
                      title="Remove Item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] ring-1 ring-black/5 lg:sticky lg:top-24">
              <h2 className="mb-5 text-2xl font-black uppercase tracking-tight text-[#111]">Order Summary</h2>
              
              <div className="space-y-4 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111]">{totalPrice} MAD</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#111]">Free</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                <span className="text-base font-black uppercase tracking-wide text-[#111]">Total</span>
                <span className="text-2xl font-black text-[#FFDE42]">{totalPrice} MAD</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="mt-6 w-full rounded-xl bg-[#FFDE42] px-6 py-4 text-lg font-black text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,222,66,0.28)]"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;