import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Cpu } from 'lucide-react';

export function Navbar({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center glow">
          <Cpu className="text-black w-6 h-6" />
        </div>
        <span className="font-display text-2xl font-bold tracking-tight text-white">respawn</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#automation" className="hover:text-white transition-colors">Automation</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="#docs" className="hover:text-white transition-colors">Docs</a>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="hidden sm:inline-flex" onClick={onEnterApp}>Log in</Button>
        <Button onClick={onEnterApp}>Get Started</Button>
      </div>
    </motion.nav>
  );
}
