import { motion } from 'motion/react';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { 
  Zap, 
  Flame, 
  UserPlus, 
  MessageSquare, 
  Play, 
  Pause, 
  Settings2,
  Clock,
  Plus
} from 'lucide-react';

const scenarios = [
  { 
    title: 'Warm-Up Scenario v2', 
    icon: Flame, 
    status: 'Running', 
    color: 'text-orange-500', 
    description: 'Slow interaction increase to season new accounts.',
    stats: '142/500 actions today'
  },
  { 
    title: 'Smart Unfollow', 
    icon: UserPlus, 
    status: 'Paused', 
    color: 'text-blue-500', 
    description: 'Unfollow users who do not follow back within 72h.',
    stats: 'Last run: 4h ago'
  },
  { 
    title: 'Auto Engage (Feed)', 
    icon: Zap, 
    status: 'Running', 
    color: 'text-yellow-500', 
    description: 'Like and reply to trending tweets in your niche.',
    stats: '4.2k interactions/day'
  },
  { 
    title: 'Bulk Outreach', 
    icon: MessageSquare, 
    status: 'Scheduled', 
    color: 'text-brand-primary', 
    description: 'Personalized DM sequence to new followers.',
    stats: 'Next batch: 09:00 AM'
  },
];

export function AutomationPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-display">Automation Hub</h1>
          <p className="text-sm text-white/40 font-mono tracking-tight">ACTIVE SCENARIOS & ENGINE CONTROL</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Create New Scenario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <GlassCard key={scenario.title} className="p-6 border-white/5 bg-white/[0.02] flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-brand-primary/10 transition-colors">
                  <scenario.icon className={`w-6 h-6 ${scenario.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{scenario.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${scenario.status === 'Running' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-white/20'}`} />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{scenario.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Settings2 className="w-4 h-4 text-white/40" /></button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  {scenario.status === 'Running' ? <Pause className="w-4 h-4 text-white/40" /> : <Play className="w-4 h-4 text-white/40" />}
                </button>
              </div>
            </div>

            <p className="text-sm text-white/40 leading-relaxed font-sans -mt-2">
              {scenario.description}
            </p>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
                <Clock className="w-3 h-3" />
                {scenario.stats}
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0d0d0e] bg-white/10 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${scenario.title}${i}`} alt="Acc" />
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full border-2 border-[#0d0d0e] bg-brand-primary/10 flex items-center justify-center text-[8px] font-mono text-brand-primary">+85</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

