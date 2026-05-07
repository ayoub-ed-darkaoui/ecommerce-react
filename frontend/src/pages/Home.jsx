import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full">
      <section className="relative min-h-screen w-full overflow-hidden bg-[#0b0b0b] text-white">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80"
            alt="Streetwear skateboarder"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,222,66,0.26),transparent_30%),linear-gradient(120deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.65)_55%,rgba(0,0,0,0.35)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </motion.div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={itemVariants} className="overflow-hidden">
              <p className="mb-4 flex items-center gap-4 text-sm font-bold uppercase tracking-[0.35em] text-[#FFDE42]">
                <span className="block h-px w-10 bg-[#FFDE42]" />
                Streetwear / Skate Culture
                <span className="block h-px w-10 bg-[#FFDE42]" />
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-6xl font-black uppercase leading-[0.88] tracking-tighter sm:text-7xl lg:text-8xl">
                Ride Your Style
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-zinc-300 sm:text-lg">
                Premium streetwear built for motion, attitude, and everyday expression. Discover bold essentials,
                clean silhouettes, and pieces designed to move with the street.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-10 inline-flex items-center gap-3 border-2 border-[#FFDE42] bg-[#FFDE42] px-8 py-4 font-black uppercase tracking-wider text-black transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(255,222,66,0.18)]"
                >
                  Shop Now
                  <ArrowRight size={20} className="stroke-[3]" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* spacer to scroll content for testing */}
      <section className="bg-[#FBF6F6] py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl font-black uppercase tracking-tight md:text-6xl">
            Trending <span className="bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">Now</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {products.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;