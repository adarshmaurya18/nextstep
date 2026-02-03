import { motion } from "framer-motion";

const HeroSection = ({ onExplore, onTest }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white">
      
      {/* BACKGROUND GLOW / ILLUSTRATION */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 text-center">
        
        {/* SLOGAN */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
        >
          Know your skills <span className="text-yellow-300">Shape your future</span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10"
        >
          Instant career clarity — test, learn, and grow and build a future
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <button
            onClick={onExplore}
            className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:scale-105 transition"
          >
            Explore Roles
          </button>

          <button
            onClick={onTest}
            className="px-6 py-3 border border-white/70 text-white font-bold rounded-xl hover:bg-white/10 transition"
          >
            Take Skill Test
          </button>
        </motion.div>

        {/* SCROLL HINT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-sm text-indigo-200"
        >
          ↓ Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
