import { motion } from 'motion/react';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { cn } from '@/src/lib/utils';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { name: 'Jan', followers: 4000, interactions: 2400 },
  { name: 'Feb', followers: 3000, interactions: 1398 },
  { name: 'Mar', followers: 2000, interactions: 9800 },
  { name: 'Apr', followers: 2780, interactions: 3908 },
  { name: 'May', followers: 1890, interactions: 4800 },
  { name: 'Jun', followers: 2390, interactions: 3800 },
  { name: 'Jul', followers: 3490, interactions: 4300 },
];

const stats = [
  { label: 'Active Accounts', value: '1,248', trend: '+12%', up: true, icon: Users },
  { label: 'Total Reach', value: '4.2M', trend: '+18%', up: true, icon: TrendingUp },
  { label: 'Engagement Rate', value: '5.8%', trend: '-2%', up: false, icon: Activity },
  { label: 'DMs Sent', value: '48.2k', trend: '+24%', up: true, icon: MessageSquare },
];

export function Overview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-display">System Overview</h1>
        <p className="text-sm text-white/40 font-mono tracking-tight">REAL-TIME TELEMETRY DATA FEED</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <stat.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full",
                  stat.up ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                )}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 tracking-tight">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-medium">{stat.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6 border-white/5 bg-white/[0.02]" hover={false}>
          <div className="flex items-center justify-between mb-8">
            <div className="font-bold text-lg">Growth Analytics</div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
                <div className="w-2 h-2 rounded-full bg-brand-primary" /> Followers
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
                <div className="w-2 h-2 rounded-full bg-brand-secondary" /> Interactions
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7000ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7000ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff20', fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff20', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13131a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#00f2ff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorFollowers)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="#7000ff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorInteractions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-white/5 bg-white/[0.02]" hover={false}>
          <div className="font-bold text-lg mb-8">Interaction Burst</div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff20', fontSize: 10 }}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#13131a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="interactions" fill="#00f2ff" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6 border-white/5" hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div className="font-bold">Recent Tasks</div>
            <button className="text-xs text-brand-primary font-mono uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Bulk DM Campaign #{(i * 123).toString(16).toUpperCase()}</div>
                    <div className="text-[10px] text-white/30 uppercase font-mono tracking-tighter">Status: Processing • 4,200/10,000 sent</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-brand-primary">42%</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-white/5" hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div className="font-bold">Security Alerts</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] text-green-500 font-mono uppercase">All Clear</span>
            </div>
          </div>
          <div className="space-y-4 font-mono text-[11px]">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/50">
              <span className="text-brand-primary">[INFO]</span> SYSTEM KERNEL v4.2.0 INITIALIZED SUCCESSFULLY.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/50">
              <span className="text-brand-primary">[INFO]</span> 142 PROXIES RE-ROUTED VIA EUROPE-CENTRAL.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-yellow-500/70 bg-yellow-500/[0.02] border-yellow-500/[0.1]">
              <span className="text-yellow-500">[WARN]</span> ACCOUNT @CRYPTO_NODE DETECTED SHADOWBAN FLAG. AUTO-WARMING ACTIVATED.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/50">
              <span className="text-brand-primary">[INFO]</span> SCRAPER FINISHED: 12,400 PROFILES EXTRACTED FROM KEYWORD: "AI SAAS".
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// Helper needed inside Overview
