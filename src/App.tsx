import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { Features } from './components/landing/Features';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Overview } from './components/dashboard/Overview';
import { ProxyManager } from './components/dashboard/ProxyManager';
import { AutomationPanel } from './components/dashboard/AutomationPanel';
import { AccountsTable } from './components/dashboard/AccountsTable';
import { MessageCenter } from './components/dashboard/MessageCenter';
import { PostScheduler } from './components/dashboard/PostScheduler';
import { DataScraper } from './components/dashboard/DataScraper';
import { ContentLab } from './components/dashboard/ContentLab';
import { Button } from './components/ui/Button';
import { GlassCard } from './components/ui/GlassCard';
import { Zap, Shield, Rocket, Power } from 'lucide-react';

function LandingPage({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div className="relative">
      <Navbar onEnterApp={onEnterApp} />
      <Hero onEnterApp={onEnterApp} />
      <Features />
      
      {/* Footer-like section for landing */}
      <section id="pricing" className="py-24 bg-gradient-to-t from-brand-secondary/5 to-transparent">
        <div className="container px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto glass p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary animate-gradient-x" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">Ready to Initiate <span className="text-brand-primary">Growth?</span></h2>
            <p className="text-white/50 mb-10 text-lg">
              Join 5,400+ power users and agencies currently dominating the ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg" onClick={onEnterApp}>Go to Dashboard</Button>
              <Button size="lg" variant="secondary" className="h-14 px-12 text-lg">Contact Enterprise</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
        © 2026 RESPAWN TECHNOLOGIES. ALL RIGHTS RESERVED. SECURE TERMINAL ESTABLISHED.
      </footer>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
        <Zap className="w-10 h-10 text-brand-primary animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold font-display mb-2">{title} Module</h2>
      <p className="text-white/40 max-w-sm mb-8">
        This module is currently being optimized for peak performance. Check the system logs for deployment updates.
      </p>
      <Button variant="outline" className="gap-2">
        <Shield className="w-4 h-4" /> Run Diagnostics
      </Button>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Transition effect
  const handleEnterApp = () => {
    setLoading(true);
    setTimeout(() => {
      setView('dashboard');
      setLoading(false);
    }, 1200);
  };

  const handleExitApp = () => {
    setView('landing');
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0b] flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center glow animate-spin [animation-duration:3s]">
                <Rocket className="text-black w-6 h-6" />
              </div>
              <span className="font-display text-4xl font-bold tracking-tight">respawn</span>
            </div>
            <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 bottom-0 w-1/2 bg-brand-primary glow"
              />
            </div>
            <div className="mt-4 font-mono text-[10px] text-brand-primary uppercase tracking-widest animate-pulse">
              Initializing Core Modules...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen">
        {view === 'landing' ? (
          <LandingPage onEnterApp={handleEnterApp} />
        ) : (
          <DashboardLayout activeTab={dashboardTab} onTabChange={setDashboardTab}>
            {dashboardTab === 'overview' && <Overview />}
            {dashboardTab === 'accounts' && <AccountsTable />}
            {dashboardTab === 'messages' && <MessageCenter />}
            {dashboardTab === 'proxies' && <ProxyManager />}
            {dashboardTab === 'automation' && <AutomationPanel />}
            {dashboardTab === 'schedule' && <PostScheduler />}
            {dashboardTab === 'scraper' && <DataScraper />}
            {dashboardTab === 'content' && <ContentLab />}
            {dashboardTab !== 'overview' && 
             dashboardTab !== 'accounts' && 
             dashboardTab !== 'messages' && 
             dashboardTab !== 'proxies' && 
             dashboardTab !== 'automation' && 
             dashboardTab !== 'schedule' && 
             dashboardTab !== 'scraper' && 
             dashboardTab !== 'content' && (
              <PlaceholderPage title={dashboardTab.charAt(0).toUpperCase() + dashboardTab.slice(1)} />
            )}
            
            {/* Action Bar for Dashboard */}
            <div className="mt-12 flex justify-end">
              <Button variant="ghost" className="gap-2 text-white/40 hover:text-red-500" onClick={handleExitApp}>
                <Power className="w-4 h-4" /> Terminate Session
              </Button>
            </div>
          </DashboardLayout>
        )}
      </div>
    </>
  );
}
