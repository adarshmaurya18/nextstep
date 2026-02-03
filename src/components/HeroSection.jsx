import { motion } from "framer-motion";

const HeroSection = ({ onExplore, onTest }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white">
      
      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-pink-400/20 rounded-full blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                      min-h-[85vh] flex flex-col justify-center text-center">

        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                     font-extrabold leading-tight mb-4"
        >
          Know your skills.
          <br />
          <span className="text-yellow-300">Shape your future.</span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl 
                     text-indigo-100 max-w-2xl mx-auto mb-10"
        >
          Instant career clarity — test your skills, learn what matters,
          and build a future aligned with the tech market.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="px-7 py-3 bg-white text-indigo-700 font-bold 
                       rounded-xl shadow-lg
                       hover:scale-105 hover:shadow-xl transition"
          >
            Explore Roles
          </button>

          <button
            onClick={onTest}
            className="px-7 py-3 border border-white/70 text-white 
                       font-bold rounded-xl
                       hover:bg-white/10 hover:scale-105 transition"
          >
            Take Skill Test
          </button>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-14 text-sm text-indigo-200"
        >
          ↓ Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;