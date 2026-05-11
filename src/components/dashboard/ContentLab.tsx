import { useState } from 'react';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { 
  Database, 
  Upload, 
  Search, 
  Grid, 
  List, 
  Image as ImageIcon, 
  Video, 
  FileText,
  Plus,
  MoreVertical,
  Tags
} from 'lucide-react';

const mockAssets = [
  { id: 1, type: 'image', name: 'Product_Showcase_01.png', size: '2.4 MB', date: '2d ago' },
  { id: 2, type: 'video', name: 'User_Testimonial_Final.mp4', size: '14.2 MB', date: '5h ago' },
  { id: 3, type: 'text', name: 'Thread_V1_Growth_Hacks.txt', size: '12 KB', date: '1d ago' },
  { id: 4, type: 'image', name: 'Meme_Viral_Template.jpg', size: '420 KB', date: 'Just now' },
  { id: 5, type: 'text', name: 'Outreach_Scripts_V3.json', size: '5 KB', date: '3d ago' },
];

export function ContentLab() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-display">Content Lab</h1>
          <p className="text-sm text-white/40 font-mono tracking-tight text-glow">CONTENT REPOSITORY & ASSET FORGE</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
            {view === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
          <Button size="sm" className="gap-2">
            <Upload className="w-4 h-4" /> Bulk Upload
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6 border-white/5 bg-[#0d0d0e]" hover={false}>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Tags className="w-4 h-4 text-brand-primary" /> Categories
            </h3>
            <div className="space-y-1">
              {['All Assets', 'Viral Threads', 'Graphics', 'Outreach scripts', 'Video ADs', 'Memes'].map((cat, i) => (
                <button 
                  key={cat} 
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${i === 0 ? 'bg-brand-primary/10 text-brand-primary' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 border border-dashed border-white/5 text-[10px] uppercase font-mono tracking-widest text-white/20">
              <Plus className="w-3 h-3 mr-2" /> New Category
            </Button>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-brand-secondary/[0.02]" hover={false}>
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Storage Metrics</div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Capacity</span>
                  <span className="text-white/40">12.4 GB / 100 GB</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-secondary w-[12.4%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-mono text-white/20 uppercase">Images</div>
                  <div className="text-lg font-bold">1,242</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/20 uppercase">Videos</div>
                  <div className="text-lg font-bold">84</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-3">
          <GlassCard className="p-4 border-white/5 bg-white/[0.02] mb-6" hover={false}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search assets by name or tag..." 
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-primary/50 transition-colors"
              />
            </div>
          </GlassCard>

          <div className={view === 'grid' ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "flex flex-col gap-2"}>
            {mockAssets.map(asset => (
              view === 'grid' ? (
                <GlassCard key={asset.id} className="p-4 border-white/5 hover:border-brand-primary/20 aspect-square flex flex-col items-center justify-center text-center gap-3 relative group">
                  <button className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 rounded-md">
                    <MoreVertical className="w-4 h-4 text-white/40" />
                  </button>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                    {asset.type === 'image' && <ImageIcon className="w-8 h-8 text-brand-primary" />}
                    {asset.type === 'video' && <Video className="w-8 h-8 text-brand-secondary" />}
                    {asset.type === 'text' && <FileText className="w-8 h-8 text-white/40" />}
                  </div>
                  <div className="flex-1 w-full truncate">
                    <div className="text-sm font-medium truncate px-2">{asset.name}</div>
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">{asset.size} • {asset.date}</div>
                  </div>
                </GlassCard>
              ) : (
                <div key={asset.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between hover:bg-white/[0.05] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      {asset.type === 'image' && <ImageIcon className="w-5 h-5 text-brand-primary" />}
                      {asset.type === 'video' && <Video className="w-5 h-5 text-brand-secondary" />}
                      {asset.type === 'text' && <FileText className="w-5 h-5 text-white/40" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{asset.name}</div>
                      <div className="text-[10px] font-mono text-white/20 uppercase">{asset.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-[10px] font-mono text-white/40 uppercase">{asset.size}</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase">{asset.date}</div>
                    <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors">
                      <MoreVertical className="w-4 h-4 text-white/40" />
                    </button>
                  </div>
                </div>
              )
            ))}
            
            {/* Empty State / Add Slot */}
            {view === 'grid' && (
              <button className="aspect-square rounded-2xl border-2 border-dashed border-white/5 hover:border-brand-primary/20 hover:bg-brand-primary/[0.02] flex flex-col items-center justify-center text-center gap-2 transition-all group">
                <Plus className="w-8 h-8 text-white/10 group-hover:text-brand-primary" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-brand-primary">Import New Asset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
