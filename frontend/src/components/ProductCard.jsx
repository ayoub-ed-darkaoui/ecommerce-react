import { motion } from 'framer-motion';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
    >
      <Link to={`/product/${product.id}`} className="contents">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-zinc-900 to-black">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFDE42] backdrop-blur-sm">
            {product.category}
          </div>

          {/* Quick visual CTA layer, no logic changes */}
          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm font-bold text-white backdrop-blur-md">
              <span className="flex items-center gap-2 uppercase tracking-wider">
                <ShoppingCart size={16} className="text-[#FFDE42]" />
                View Details
              </span>
              <ArrowUpRight size={16} className="text-[#FFDE42]" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 text-white">
          <div className="space-y-2">
            <h3 className="line-clamp-2 min-h-[3rem] text-lg font-black uppercase leading-tight tracking-tight text-white">
              {product.name}
            </h3>
            <p className="text-sm leading-6 text-zinc-400">
              Clean streetwear essentials with a sharp fit and everyday comfort.
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
            <p className="text-2xl font-black text-[#FFDE42]">{product.price} MAD</p>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-300">
              Premium
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;