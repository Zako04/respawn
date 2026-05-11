import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Twitter, Zap, Target, BarChart3 } from 'lucide-react';

import { useState, useEffect } from 'react';
import { getSystemStatus } from '@/src/services/api';

export function Hero({ onEnterApp }: { onEnterApp: () => void }) {
  const [status, setStatus] = useState({ status: 'OFFLINE', version: '---' });

  useEffect(() => {
    getSystemStatus().then(data => {
      if (data.status === 'online') {
        setStatus({ status: 'ONLINE', version: data.version });
      }
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px]" />
      
      <div className="container px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-primary text-xs font-mono mb-8">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.status === 'ONLINE' ? 'bg-brand-primary' : 'bg-red-500'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status.status === 'ONLINE' ? 'bg-brand-primary' : 'bg-red-500'}`}></span>
            </span>
            SYSTEM {status.status}: v{status.version} DEPLOYED
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Manage and Scale <br />
            <span className="text-brand-primary text-glow">Unlimited X Accounts</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-10 leading-relaxed">
            Manage thousands of X accounts, automate engagement, publish content, scrape data, 
            and streamline your growth with the most advanced automation suite ever built.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-10 text-lg group" onClick={onEnterApp}>
              Start Scaling Now
              <Zap className="ml-2 w-5 h-5 group-hover:fill-current" />
            </Button>
            <Button variant="secondary" size="lg" className="h-14 px-10 text-lg">
              View Showcase
            </Button>
          </div>
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute top-1/2 -left-4 md:left-20 animate-bounce transition-all duration-1000 delay-150">
          <div className="glass p-4 rounded-2xl rotate-[-12deg]">
            <Twitter className="text-brand-primary w-8 h-8" />
          </div>
        </div>
        <div className="absolute top-1/3 -right-4 md:right-20 animate-bounce transition-all duration-1000 delay-300">
          <div className="glass p-4 rounded-2xl rotate-[12deg]">
            <BarChart3 className="text-brand-secondary w-8 h-8" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-bounce transition-all duration-1000">
          <div className="glass p-3 rounded-2xl rotate-[5deg]">
            <Target className="text-brand-primary/50 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />
    </section>
  );
}
