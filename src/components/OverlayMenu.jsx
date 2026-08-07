import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 1024;

  const origin = isMobile ? "95% 8%" : "center";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{
            clipPath: `circle(0% at ${origin})`,
          }}
          animate={{
            clipPath: `circle(100% at ${origin})`,
          }}
          exit={{
            clipPath: `circle(0% at ${origin})`,
          }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.95)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-3xl text-white"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          {/* Menu items */}
          <ul className="space-y-6 text-center">
            {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map(
              (item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                  }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    className="text-4xl font-semibold text-white transition-colors duration-300 hover:text-pink-400"
                  >
                    {item}
                  </a>
                </motion.li>
              )
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}