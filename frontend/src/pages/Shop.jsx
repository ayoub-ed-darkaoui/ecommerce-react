import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const location = useLocation();
  const initialFilter = location.state?.filter || 'all';
  const [filter, setFilter] = useState(initialFilter);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    if (location.state?.filter) {
      setFilter(location.state.filter);
    }
  }, [location.state]);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    if (filter !== 'all') {
      result = result.filter((p) => p.category === filter);
    }

    if (sort === 'low-to-high') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === 'high-to-low') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filter, sort]);

  return (
    <div className="pt-32 pb-24 bg-[#FBF6F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Shop All</h1>
            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">
              {filteredAndSortedProducts.length} Products
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            {/* Filters */}
            <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-md font-bold text-xs uppercase tracking-wider transition-colors ${
                    filter === cat
                      ? 'bg-[#FFDE42] text-black shadow-sm'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border-none shadow-sm rounded-lg px-4 py-2 font-bold text-xs uppercase tracking-wider text-gray-700 cursor-pointer focus:ring-2 focus:ring-[#FFDE42] outline-none"
            >
              <option value="default">Sort by</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredAndSortedProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-bold uppercase text-xl">
            No products found
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;