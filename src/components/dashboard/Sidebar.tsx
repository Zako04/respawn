import { 
  Cpu, 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Search, 
  Settings, 
  Globe, 
  Database,
  BarChart3,
  Calendar,
  Shield,
  Zap
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Users, label: 'Accounts', id: 'accounts' },
  { icon: MessageSquare, label: 'Messages', id: 'messages' },
  { icon: Globe, label: 'Proxies', id: 'proxies' },
  { icon: Zap, label: 'Automation', id: 'automation' },
  { icon: Calendar, label: 'Schedule', id: 'schedule' },
  { icon: Search, label: 'Scraper', id: 'scraper' },
  { icon: Database, label: 'Content Lab', id: 'content' },
];

export function Sidebar({ activeTab, onTabChange }: { activeTab: string, onTabChange: (id: string) => void }) {
  return (
    <aside className="w-64 border-r border-white/5 flex flex-col h-screen sticky top-0 bg-[#0d0d0e]">
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center glow">
          <Cpu className="text-black w-5 h-5" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight">respawn</span>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
        <div className="text-[10px] font-mono text-white/30 px-2 mb-2 uppercase tracking-widest">Main Terminal</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group",
              activeTab === item.id 
                ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-brand-primary" : "text-white/20 group-hover:text-white/60")} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}

        <div className="mt-8 text-[10px] font-mono text-white/30 px-2 mb-2 uppercase tracking-widest">System</div>
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <Shield className="w-5 h-5 text-white/20" />
          <span className="text-sm font-medium">Security</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <BarChart3 className="w-5 h-5 text-white/20" />
          <span className="text-sm font-medium">Logs</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <Settings className="w-5 h-5 text-white/20" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0d0d0e] flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold truncate">Admin User</div>
            <div className="text-[10px] font-mono text-brand-primary uppercase">Elite Tier</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
