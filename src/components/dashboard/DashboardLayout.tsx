import { useState, ReactNode, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, Settings, HelpCircle, Activity, Rocket, ArrowRight, X } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { cn } from '@/src/lib/utils';
import { getSystemStatus } from '@/src/services/api';

export function DashboardLayout({ children, activeTab, onTabChange }: { children: ReactNode, activeTab: string, onTabChange: (id: string) => void }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [systemStatus, setSystemStatus] = useState({ online: false, latency: '---' });

  useEffect(() => {
    const checkStatus = async () => {
      const start = Date.now();
      const data = await getSystemStatus();
      const latency = Date.now() - start;
      setSystemStatus({ online: data.status === 'online', latency: `${latency}ms` });
    };
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#070708] text-white">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0d0d0e]/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 text-sm text-white/40 font-mono">
            <span>NETWORK: {systemStatus.online ? 'OK' : 'OFFLINE'}</span>
            <span className={cn("w-1 h-1 rounded-full", systemStatus.online ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-red-500 shadow-[0_0_8px_#ef4444]")} />
            <span className="ml-4">LATENCY: {systemStatus.latency}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-brand-primary/50 transition-all">
              <Search className="w-4 h-4 text-white/20 group-focus-within:text-brand-primary" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none text-xs focus:ring-0 w-48 placeholder:text-white/20"
              />
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setShowOnboarding(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-mono text-brand-primary hover:bg-brand-primary/20 transition-all mr-2"
              >
                <Rocket className="w-3 h-3" /> LAUNCH_TUTORIAL
              </button>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 hover:bg-white/5 rounded-full relative transition-colors"
              >
                <Bell className="w-5 h-5 text-white/60 hover:text-brand-primary" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full glow" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <HelpCircle className="w-5 h-5 text-white/60 hover:text-brand-primary" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-white/60 hover:text-brand-primary" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8 pb-16 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global System Status Toast */}
        <div className="fixed bottom-6 right-6 z-50">
          <GlassCard className="p-4 flex items-center gap-4 border-brand-primary/20 bg-brand-primary/[0.02]" hover={false}>
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-brand-primary animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-brand-primary">Engine Status</div>
              <div className="text-[10px] font-mono text-white/40">ALL MODULES OPERATING WITHIN PARAMETERS</div>
            </div>
          </GlassCard>
        </div>
      </main>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-[90] flex items-center justify-center p-6"
            >
              <GlassCard className="max-w-lg w-full p-8 border-brand-primary/20 bg-[#0d0d0e]" hover={false}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <button onClick={() => setShowOnboarding(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/20 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {onboardingStep === 1 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <h3 className="text-2xl font-bold font-display mb-3 text-glow">Welcome to the Frontline</h3>
                    <p className="text-white/50 mb-8 leading-relaxed">
                      You are now controlling the most powerful X automation infrastructure ever built. 
                      Before we initiate your first campaign, let's configure your global uplink.
                    </p>
                    <Button className="w-full h-12 gap-2" onClick={() => setOnboardingStep(2)}>
                      Configure System <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {onboardingStep === 2 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <h3 className="text-2xl font-bold font-display mb-3">Proxy Rerouting</h3>
                    <p className="text-white/50 mb-8 leading-relaxed">
                      We've detected 14 active accounts. We recommend assigning residential proxies to 
                      ensure 99.9% uptime and prevent system flags.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="secondary" className="flex-1" onClick={() => setOnboardingStep(1)}>Back</Button>
                      <Button className="flex-1 gap-2" onClick={() => setShowOnboarding(false)}>Complete Setup <ArrowRight className="w-4 h-4" /></Button>
                    </div>
                  </motion.div>
                )}

                <div className="mt-8 flex justify-center gap-2">
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", onboardingStep === 1 ? "bg-brand-primary" : "bg-white/10")} />
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", onboardingStep === 2 ? "bg-brand-primary" : "bg-white/10")} />
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications Drawer */}
      <AnimatePresence>
        {notificationsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotificationsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[#0d0d0e] border-l border-white/5 z-[70] shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-lg">Notifications</h3>
                <span className="text-[10px] font-mono bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded uppercase">4 New</span>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-1">
                      <div className="text-xs font-bold font-mono text-brand-primary tracking-tighter">ALERT_SIGNAL_0{i}</div>
                      <div className="text-[9px] text-white/20 font-mono">12:3{i} PM</div>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed font-sans group-hover:text-white transition-colors">
                      Bulk operation for 542 accounts finished with 98.4% success rate.
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
