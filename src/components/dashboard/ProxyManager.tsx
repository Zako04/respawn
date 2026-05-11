import { useState } from 'react';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { 
  Globe, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';

const mockProxies = [
  { id: 1, type: 'Residential', location: 'USA, New York', ip: '192.168.1.42', status: 'active', speed: '42ms', rotation: '15m' },
  { id: 2, type: 'Mobile (4G)', location: 'UK, London', ip: '10.0.0.12', status: 'active', speed: '128ms', rotation: 'Disabled' },
  { id: 3, type: 'Datacenter', location: 'Germany, Frankfurt', ip: '212.45.1.2', status: 'error', speed: '0ms', rotation: 'Instant' },
  { id: 4, type: 'Residential', location: 'Japan, Tokyo', ip: '64.12.98.4', status: 'warning', speed: '240ms', rotation: '1h' },
  { id: 5, type: 'Residential', location: 'USA, Los Angeles', ip: '192.168.4.15', status: 'active', speed: '38ms', rotation: '30m' },
];

export function ProxyManager() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-display">Proxy Management</h1>
          <p className="text-sm text-white/40 font-mono tracking-tight text-glow">GLOBAL NETWORK INFRASTRUCTURE</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export All</Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Import Proxies
          </Button>
        </div>
      </div>

      <GlassCard className="border-white/5 bg-white/[0.02]" hover={false}>
        <div className="p-4 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Search by IP, location, or type..." 
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-primary/50 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] border-b border-white/5 text-white/40 font-mono text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Lat</th>
                <th className="px-6 py-4 font-medium">Rotation</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockProxies.map((proxy) => (
                <tr key={proxy.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-medium">{proxy.type}</td>
                  <td className="px-6 py-4 text-white/60">{proxy.location}</td>
                  <td className="px-6 py-4 font-mono text-brand-primary">{proxy.ip}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono uppercase border ${
                      proxy.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      proxy.status === 'warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {proxy.status === 'active' && <CheckCircle2 className="w-3 h-3" />}
                      {proxy.status === 'warning' && <AlertCircle className="w-3 h-3" />}
                      {proxy.status === 'error' && <XCircle className="w-3 h-3" />}
                      {proxy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/40 font-mono">{proxy.speed}</td>
                  <td className="px-6 py-4 text-white/40 font-mono">{proxy.rotation}</td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
                      <MoreVertical className="w-4 h-4 text-white/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/20 uppercase tracking-tight">
          <div>Showing 5 of 1,240 Proxies</div>
          <div className="flex gap-4">
            <button className="hover:text-brand-primary transition-colors disabled:opacity-30">Previous</button>
            <button className="hover:text-brand-primary transition-colors font-bold text-white">Next</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
