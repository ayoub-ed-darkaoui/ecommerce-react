import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Collections = () => {
  const collections = [
    {
      id: 'skate',
      title: 'Skateboards',
      subtitle: 'Pro Decks & Hardware',
      image: 'https://images.unsplash.com/photo-1542261777448-23d2a287091c?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 'clothing',
      title: 'Apparel',
      subtitle: 'Streetwear Essentials',
      image: 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 'shoes',
      title: 'Footwear',
      subtitle: 'Urban Kicks',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=1200',
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Collections</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
            Discover our raw, authentic gear categorized for your daily grind
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full min-h-[600px]">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative group rounded-2xl overflow-hidden shadow-2xl h-full min-h-[400px] flex-1 flex flex-col cursor-pointer"
            >
              <Link to="/products" state={{ filter: collection.id }} className="block w-full h-full">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10 transition-transform duration-500 max-h-full">
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 group-hover:text-[#FFDE42] transition-colors">{collection.title}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-6">{collection.subtitle}</p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 rounded-full bg-[#FFDE42] text-black flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(255,222,66,0.6)] transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;