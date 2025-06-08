import { motion, AnimatePresence } from "framer-motion";
import Content from "./ui/Content";

function PageLoader({ message = "Loading..." }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[999] 
                   flex items-center justify-center"
      >
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-orange-400 border-t-green-400 
                          rounded-full animate-spin mb-4"
          />
          <p className="text-gray-700 font-medium">
            <Content>{message}</Content>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PageLoader;
