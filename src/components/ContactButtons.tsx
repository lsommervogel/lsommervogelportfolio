import { Mail, FileText, Gamepad2 } from "lucide-react";
import { motion } from "motion/react";

export function ContactButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="flex items-center gap-3 sm:gap-4 flex-row"
    >
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="mailto:louis.sommervogel@gmail.com"
        className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white transition-colors"
      >
        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Email</span>
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="/Resume.pdf"
        download
        className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white transition-colors"
      >
        <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Resume</span>
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="#projects"
        rel="noopener noreferrer"
        className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white transition-colors"
      >
        <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Projects</span>
      </motion.a>
    </motion.div>
  );
}
