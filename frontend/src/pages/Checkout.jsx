import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { API_BASE_URL, isNetworkError } from '../config/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const SHIPPING_FEE = 30;
  const totalWithShipping = totalPrice + SHIPPING_FEE;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) return;
    if (cart.length === 0) {
      setErrors({ cart: 'Your cart is empty' });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare order payload
      const orderPayload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        total: totalWithShipping,
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        })),
      };

      // Send to backend API
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const data = await response.json();
      console.log('Order placed successfully:', data);

      // Show success message
      setOrderSuccess(true);

      // Clear cart after 1.5 seconds
      setTimeout(() => {
        clearCart();
        // Redirect to home page after clearing cart
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }, 1500);
    } catch (error) {
      console.error('Order error:', error);
      const fallbackMessage = isNetworkError(error)
        ? 'Cannot reach API server. Ensure backend runs at http://127.0.0.1:5000 and CORS is enabled.'
        : 'Failed to place order. Please try again.';

      setErrors({ submit: error.message || fallbackMessage });
      setIsLoading(false);
    }
  };

  // If cart is empty at start
  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center py-12 px-4 font-mono">
        <h2 className="text-4xl font-black mb-6 uppercase">Your Cart is Empty</h2>
        <p className="mb-8 text-lg">Add items before checking out.</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-[#FFDE42] border-4 border-black py-3 px-8 font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Success state
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center py-12 px-4 font-mono">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-4xl font-black mb-4 uppercase text-center">Order Placed!</h2>
        <p className="text-xl mb-2">Thank you for your purchase, {formData.name}.</p>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Order confirmation has been sent to your details.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] px-4 py-10 text-[#111] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate('/cart')}
          className="mb-6 inline-flex items-center text-sm font-semibold text-zinc-600 transition-colors hover:text-[#111]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </button>

        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#FFDE42]">Checkout</p>
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">Billing & Shipping</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            Complete your purchase with a fast, clean checkout experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="rounded-2xl bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:p-8" noValidate>
              <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-5">
                <div>
                  <h2 className="text-2xl font-black text-[#111]">Billing Details</h2>
                  <p className="mt-1 text-sm text-zinc-500">Enter the shipping information for this order.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[15px] text-[#111] outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-[#FFDE42] focus:ring-4 focus:ring-[#FFDE42]/15 ${
                      errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[15px] text-[#111] outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-[#FFDE42] focus:ring-4 focus:ring-[#FFDE42]/15 ${
                      errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                    }`}
                    placeholder="+212 6 00 00 00 00"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[15px] text-[#111] outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-[#FFDE42] focus:ring-4 focus:ring-[#FFDE42]/15 ${
                      errors.address ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                    }`}
                    placeholder="123 Skate Street"
                  />
                  {errors.address && <p className="mt-2 text-sm text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[15px] text-[#111] outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-[#FFDE42] focus:ring-4 focus:ring-[#FFDE42]/15 ${
                      errors.city ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                    }`}
                    placeholder="Casablanca"
                  />
                  {errors.city && <p className="mt-2 text-sm text-red-500">{errors.city}</p>}
                </div>
              </div>

              {errors.submit && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FFDE42] px-6 py-4 text-base font-black text-black transition-all duration-200 ${
                  isLoading
                    ? 'cursor-not-allowed opacity-60'
                    : 'shadow-[0_14px_30px_rgba(255,222,66,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,222,66,0.28)] active:translate-y-0'
                }`}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-[#f2f2ef] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)] ring-1 ring-black/5 lg:sticky lg:top-24">
              <div className="mb-5 border-b border-black/10 pb-4">
                <h2 className="text-2xl font-black text-[#111]">Order Summary</h2>
                <p className="mt-1 text-sm text-zinc-600">Review your items before placing the order.</p>
              </div>

              <div className="mb-6 max-h-72 space-y-4 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold uppercase text-[#111]">{item.name}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-zinc-500">
                          <span className="rounded-full bg-zinc-100 px-2.5 py-1">Size: {item.size}</span>
                          <span className="rounded-full bg-zinc-100 px-2.5 py-1">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <p className="whitespace-nowrap text-sm font-black text-[#111]">{item.price * item.quantity} MAD</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-black/10 pt-5 text-sm text-zinc-700">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111]">{totalPrice} MAD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#111]">{SHIPPING_FEE} MAD</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 text-base">
                  <span className="font-black uppercase tracking-wide text-[#111]">Total</span>
                  <span className="text-xl font-black text-[#FFDE42]">{totalWithShipping} MAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;