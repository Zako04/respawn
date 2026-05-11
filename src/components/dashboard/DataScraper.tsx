import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { 
  Search, 
  Terminal, 
  Play, 
  Pause, 
  Download, 
  Cpu, 
  Database,
  Layers,
  ChevronRight,
  Monitor
} from 'lucide-react';

const activeScrapers = [
  { id: 1, name: 'Market Intelligence - AI', targets: '1,240 Profiles', status: 'Running', yield: '12,400 Tweets', progress: 68 },
  { id: 2, name: 'Competitor Analysis - @X', targets: 'Current Followers', status: 'Completed', yield: '450,000 IDs', progress: 100 },
  { id: 3, name: 'Keyword Cluster: "SaaS"', targets: 'Live Stream', status: 'Running', yield: '1,200 Hits/hr', progress: 42 },
];

export function DataScraper() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-display">Data Scraper</h1>
          <p className="text-sm text-white/40 font-mono tracking-tight text-glow">HIGH-DENSITY INFORMATION EXTRACTION</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gap-2">
            <Play className="w-4 h-4" /> New Scraper Node
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {activeScrapers.map(scraper => (
            <GlassCard key={scraper.id} className="p-6 border-white/5 bg-white/[0.02]" hover={false}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{scraper.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase">Targets: {scraper.targets}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] font-mono text-brand-primary uppercase">Yield: {scraper.yield}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="w-9 h-9"><Download className="w-4 h-4" /></Button>
                  <Button variant="secondary" size="icon" className="w-9 h-9"><Pause className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/40">
                  <span>Extraction Progress</span>
                  <span className="text-brand-primary">{scraper.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${scraper.progress}%` }}
                    className="h-full bg-brand-primary glow"
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 border-brand-primary/20 bg-brand-primary/[0.02]" hover={false}>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-5 h-5 text-brand-primary" />
              <h3 className="font-bold">Scraper Config</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Query Targets</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-[11px] font-mono text-white/80 focus:outline-none focus:border-brand-primary/50 min-h-[100px]"
                  placeholder="Enter usernames, keywords, or profile IDs (one per line)..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Global Filters</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 flex items-center justify-between cursor-pointer hover:border-brand-primary/20 transition-all">
                    <span>Verified Only</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 flex items-center justify-between cursor-pointer hover:border-brand-primary/20 transition-all">
                    <span>Min 1k Followers</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
              <Button className="w-full h-11 gap-2">
                <Cpu className="w-4 h-4" /> Start Cluster
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-[#0d0d0e]/50" hover={false}>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-brand-secondary" />
              <h3 className="font-bold">System Health</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-white/40 font-sans">Scraper Up-time</span>
                <span className="text-white/80">99.98%</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-white/40 font-sans">API Quota Used</span>
                <span className="text-yellow-500">42.4%</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-white/40 font-sans">IP Rotation Rate</span>
                <span className="text-brand-primary">12/min</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

import { motion } from 'motion/react';
