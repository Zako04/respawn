import { useState, useMemo } from 'react';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Twitter, 
  Shield, 
  Zap,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronRight,
  Filter
} from 'lucide-react';

const mockAccounts = [
  { id: 1, handle: '@tech_nexus', followers: '12.4k', status: 'Optimal', health: 98, lastAction: '2m ago', tags: ['tech', 'news'] },
  { id: 2, handle: '@crypto_pulse', followers: '45.2k', status: 'Warming', health: 72, lastAction: '15m ago', tags: ['crypto', 'finance'] },
  { id: 3, handle: '@ai_insider', followers: '8.1k', status: 'Optimal', health: 95, lastAction: '5m ago', tags: ['ai', 'tech'] },
  { id: 4, handle: '@saas_growth', followers: '2.3k', status: 'Flagged', health: 34, lastAction: '1h ago', tags: ['saas', 'business'] },
  { id: 5, handle: '@web3_vibes', followers: '15.9k', status: 'Optimal', health: 100, lastAction: 'Just now', tags: ['web3', 'crypto'] },
  { id: 6, handle: '@dev_ninja', followers: '5.2k', status: 'Warming', health: 65, lastAction: '10m ago', tags: ['dev', 'tech'] },
];

type GroupBy = 'none' | 'status' | 'followers' | 'tags';

export function AccountsTable() {
  const [groupBy, setGroupBy] = useState<GroupBy>('none');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const parseFollowers = (val: string) => {
    const num = parseFloat(val.replace(/[kM]/g, ''));
    if (val.includes('k')) return num * 1000;
    if (val.includes('M')) return num * 1000000;
    return num;
  };

  const getFollowerRange = (count: number) => {
    if (count < 5000) return '< 5k';
    if (count < 15000) return '5k - 15k';
    if (count < 50000) return '15k - 50k';
    return '> 50k';
  };

  const filteredAccounts = useMemo(() => {
    return mockAccounts.filter(acc => 
      acc.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const groupedAccounts = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Accounts': filteredAccounts };
    }

    const groups: Record<string, typeof mockAccounts> = {};

    filteredAccounts.forEach(acc => {
      let groupKey = '';
      if (groupBy === 'status') {
        groupKey = acc.status;
      } else if (groupBy === 'followers') {
        groupKey = getFollowerRange(parseFollowers(acc.followers));
      } else if (groupBy === 'tags') {
        // For tags, we might put an account in multiple groups or just the first tag
        groupKey = acc.tags[0] || 'No Tags';
      }

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(acc);
    });

    return groups;
  }, [filteredAccounts, groupBy]);

  const toggleGroup = (group: string) => {
    const next = new Set(collapsedGroups);
    if (next.has(group)) {
      next.delete(group);
    } else {
      next.add(group);
    }
    setCollapsedGroups(next);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-display">Account Fleet</h1>
          <p className="text-sm text-white/40 font-mono tracking-tight text-glow">MANAGED ASSET REPOSITORY</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <LayoutGrid className="w-4 h-4" /> Grid View
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Import Accounts
          </Button>
        </div>
      </div>

      <GlassCard className="border-white/5 bg-white/[0.02]" hover={false}>
        <div className="p-4 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Filter by handle, status, or tag..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-primary/50 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mr-2">Group By:</span>
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              {(['none', 'status', 'followers', 'tags'] as GroupBy[]).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setGroupBy(option);
                    setCollapsedGroups(new Set());
                  }}
                  className={`px-3 py-1 text-[10px] uppercase font-mono rounded-md transition-all ${
                    groupBy === option 
                      ? 'bg-brand-primary text-black font-bold' 
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-white/[0.02] border-b border-white/5 text-white/40 font-mono text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Handle</th>
                <th className="px-6 py-4 font-medium">Followers</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tags</th>
                <th className="px-6 py-4 font-medium">Health %</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Object.entries(groupedAccounts).map(([groupName, accounts]) => (
                <div key={groupName} className="contents">
                  {groupBy !== 'none' && (
                    <tr 
                      className="bg-white/[0.03] cursor-pointer hover:bg-white/[0.05] transition-colors"
                      onClick={() => toggleGroup(groupName)}
                    >
                      <td colSpan={6} className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {collapsedGroups.has(groupName) ? (
                            <ChevronRight className="w-4 h-4 text-brand-primary" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-brand-primary" />
                          )}
                          <span className="font-bold text-white/80 uppercase tracking-widest text-[11px] font-mono">
                            {groupName} <span className="text-white/20 ml-2">({accounts.length})</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                  
                  {!collapsedGroups.has(groupName) && accounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${acc.handle}`} alt="Av" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-white/80">{acc.handle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/60 font-mono">{acc.followers}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono uppercase border ${
                          acc.status === 'Optimal' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' : 
                          acc.status === 'Warming' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {acc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {acc.tags.map(tag => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${acc.health > 80 ? 'bg-brand-primary' : acc.health > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                              style={{ width: `${acc.health}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-white/40">{acc.health}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-white/20 hover:text-brand-primary"><Zap className="w-4 h-4" /></button>
                          <button className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-white/20 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
