import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 bg-[#FBF6F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-20 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            The <span className="text-[#FFDE42] drop-shadow-sm">Raw</span> 
            <br/>Culture.
          </h1>
          <p className="text-xl md:text-3xl font-medium text-gray-500 leading-relaxed max-w-3xl mx-auto mb-10">
            Gotcha was born on the concrete, bridging the gap between raw street culture and premium design. We don't just make gear; we craft armor for the daily grind.
          </p>
        </motion.div>

        {/* Feature Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-32 shadow-2xl relative"
        >
          <img
            src="https://images.unsplash.com/photo-1543851508-3e4b78c8df63?auto=format&fit=crop&q=80&w=2000"
            alt="Skateboarders"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center mb-32">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
              Built To Last. Designed To Disrupt.
            </h2>
            <p className="text-lg text-gray-500 mb-6 font-medium leading-relaxed">
              Every seam, every deck, every graphic is infused with the rebellious spirit of the streets. We source the highest quality materials to ensure our products can handle whatever you throw at them.
            </p>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              From the bowls to the avenues, Gotcha is more than a brand—it's a movement. Stand out. Ride hard. Rule the streets.
            </p>
            
            <div className="mt-10 flex gap-10">
              <div>
                <span className="block text-4xl font-black text-[#FFDE42] mb-1">20+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Stores</span>
              </div>
              <div>
                <span className="block text-4xl font-black text-[#FFDE42] mb-1">500k</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Riders</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1490212717088-755490a0fc40?auto=format&fit=crop&q=80&w=800"
              alt="Skater Lifestyle"
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};

export default About;