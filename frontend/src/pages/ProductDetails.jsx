import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));
  
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <h2 className="text-2xl font-bold font-mono">Product not found.</h2>
      </div>
    );
  }

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center text-sm font-bold text-zinc-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Image column */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl overflow-hidden rounded-2xl shadow-lg">
              <div className="relative overflow-hidden rounded-2xl bg-black">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[560px] w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-md bg-black/60 px-3 py-1 text-xs font-semibold uppercase text-[#FFDE42]">
                  {product.category}
                </div>
              </div>
            </div>
          </div>

          {/* Info column */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white">{product.name}</h1>
            <p className="mb-6 text-2xl font-black text-[#FFDE42]">{product.price} MAD</p>

            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold text-zinc-300">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-bold transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-[#FFDE42] text-black shadow-md'
                        : 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="mt-2 text-sm italic text-red-400">Please select a size</p>
              )}
            </div>

            <div className="mb-6 flex items-center gap-4">
              <p className="text-sm font-semibold text-zinc-300">Quantity</p>
              <div className="inline-flex items-center rounded-lg bg-zinc-900 py-1 px-2">
                <button
                  onClick={handleDecrease}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-zinc-200 hover:bg-zinc-800"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="mx-3 w-12 text-center text-lg font-bold text-white">{quantity}</div>
                <button
                  onClick={handleIncrease}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-zinc-200 hover:bg-zinc-800"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full rounded-lg bg-[#FFDE42] px-6 py-4 text-center font-black text-black transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  added ? 'ring-4 ring-green-300' : 'hover:shadow-[0_18px_40px_rgba(255,222,66,0.18)]'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <span>{added ? 'Added to cart' : 'Add to cart'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;