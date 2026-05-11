import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { 
  MessageSquare, 
  Send, 
  Inbox, 
  History, 
  Users, 
  Bot,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';

export function MessageCenter() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-display">Message Center</h1>
          <p className="text-sm text-white/40 font-mono tracking-tight text-glow">DIRECT OUTREACH UPLINK</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gap-2">
            <Send className="w-4 h-4" /> New Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)]">
        {/* Sidebar / Conversation List */}
        <GlassCard className="lg:col-span-1 border-white/5 bg-white/[0.02] flex flex-col" hover={false}>
          <div className="p-4 border-b border-white/5 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-8 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] focus:outline-none focus:border-brand-primary/50"
              />
            </div>
            <Button variant="secondary" size="icon" className="w-9 h-9"><Filter className="w-3 h-3" /></Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${i === 1 ? 'bg-brand-primary/5 border-l-2 border-l-brand-primary' : 'hover:bg-white/[0.02]'}`}>
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs font-bold text-white/90 truncate">Campaign #{(1000 + i).toString(16).toUpperCase()}</div>
                  <div className="text-[9px] font-mono text-white/20">2m ago</div>
                </div>
                <div className="text-[10px] text-white/40 truncate">Successful outreach to @dev_ninja...</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[8px] font-mono bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded">SENT</span>
                  <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter">via @acc_0{i}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto">
          {/* Active Campaign Status */}
          <GlassCard className="p-6 border-brand-primary/20 bg-brand-primary/[0.02]" hover={false}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Inbound Growth Sequence</h3>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">ACTIVE CAMPAIGN • AGENT ID: RX-99</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Modify Logic</Button>
                <Button size="sm">Pause Agent</Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Delivered</div>
                <div className="text-2xl font-bold">14,204</div>
                <div className="text-[10px] text-green-500 font-mono mt-1">+12% vs avg</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Open Rate</div>
                <div className="text-2xl font-bold">58.2%</div>
                <div className="text-[10px] text-brand-primary font-mono mt-1">High Intent</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Replies</div>
                <div className="text-2xl font-bold">842</div>
                <div className="text-[10px] text-brand-primary font-mono mt-1">Requiring Review</div>
              </div>
            </div>
          </GlassCard>

          {/* Activity Log */}
          <GlassCard className="flex-1 p-6 border-white/5 bg-white/[0.02]" hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold">Live Transmission Feed</div>
              <div className="text-[10px] font-mono text-white/20">UPLINK STABLE</div>
            </div>
            <div className="space-y-3 font-mono text-[11px]">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex gap-4 p-2 rounded-lg bg-white/[0.01] border border-white/5">
                  <span className="text-white/20">[14:23:{i}0]</span>
                  <span className="text-brand-primary">TX:</span>
                  <span className="text-white/60">Message delivered to <span className="text-brand-primary">@user_hfx{i}</span> via account <span className="text-brand-secondary">@respawn_bot_{i}</span></span>
                  <span className="ml-auto flex items-center gap-1 text-green-500/50"><CheckCircle2 className="w-3 h-3" /> OK</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
