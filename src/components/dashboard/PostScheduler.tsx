import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  Twitter, 
  Image as ImageIcon,
  Video,
  FileText,
  MoreVertical
} from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = ['09:00', '12:00', '15:00', '18:00', '21:00'];

const scheduledPosts = [
  { id: 1, day: 'Mon', time: '12:00', type: 'text', content: 'The future of automation is here...', status: 'Ready' },
  { id: 2, day: 'Tue', time: '15:00', type: 'image', content: 'New dashboard preview!', status: 'Ready' },
  { id: 3, day: 'Wed', time: '09:00', type: 'video', content: 'Case study: 10k followers in 30 days', status: 'Draft' },
  { id: 4, day: 'Fri', time: '18:00', type: 'text', content: 'Why respawn is the #1 tool for agencies', status: 'Ready' },
];

export function PostScheduler() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-display">Post Scheduler</h1>
          <p className="text-sm text-white/40 font-mono tracking-tight text-glow">TEMPORAL CONTENT COORDINATION</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" /> View Month
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Schedule Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-1 border border-white/5 bg-white/5 rounded-2xl overflow-hidden p-1">
        {days.map(day => (
          <div key={day} className="bg-[#0d0d0e] p-4 min-h-[500px] flex flex-col gap-4">
            <div className="text-[10px] font-mono text-brand-primary uppercase tracking-[0.2em] mb-4 text-center">{day}</div>
            
            <div className="space-y-3">
              {scheduledPosts.filter(p => p.day === day).map(post => (
                <GlassCard key={post.id} className="p-3 border-white/5 bg-white/[0.02]" hover={true}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] font-mono text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.time}
                    </div>
                    <button className="text-white/20 hover:text-white transition-colors">
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-[11px] text-white/80 line-clamp-3 mb-3 leading-relaxed">
                    {post.content}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {post.type === 'image' && <ImageIcon className="w-3 h-3 text-brand-secondary" />}
                      {post.type === 'video' && <Video className="w-3 h-3 text-brand-primary" />}
                      {post.type === 'text' && <FileText className="w-3 h-3 text-white/20" />}
                    </div>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase border ${post.status === 'Ready' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/10 text-white/40 border-white/10'}`}>
                      {post.status}
                    </span>
                  </div>
                </GlassCard>
              ))}
              
              <button className="w-full py-3 rounded-lg border border-dashed border-white/5 hover:border-brand-primary/20 hover:bg-brand-primary/[0.02] flex items-center justify-center transition-all group">
                <Plus className="w-4 h-4 text-white/10 group-hover:text-brand-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
