import { motion } from 'motion/react';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { 
  Users, 
  FileText, 
  Flame, 
  MessageSquare, 
  UserPlus, 
  Search, 
  Send, 
  ShieldCheck 
} from 'lucide-react';

const features = [
  {
    title: 'Unlimited Account Management',
    description: 'Add, import, and export unlimited accounts. Assign dedicated proxies per account through a centralized dashboard.',
    icon: Users,
  },
  {
    title: 'Content Management',
    description: 'Bulk upload text, images, and videos. Use automatic content spinning and categorization for maximum reach.',
    icon: FileText,
  },
  {
    title: 'Account Warm-Up',
    description: 'Auto interact with feeds, followers, and username lists. Choose from preset scenarios to season your accounts.',
    icon: Flame,
  },
  {
    title: 'Bulk Messaging',
    description: 'Automated outreach campaigns via DMs to followers, followings, or custom username lists.',
    icon: MessageSquare,
  },
  {
    title: 'Follow / Unfollow Automation',
    description: 'Smart systems to follow by keyword, follow back, or unfollow inactive users safely.',
    icon: UserPlus,
  },
  {
    title: 'Data Scraping',
    description: 'Extract valuable data from tweets, profiles, and interactions. Perform deep analysis on keywords and growth.',
    icon: Search,
  },
  {
    title: 'Posting System',
    description: 'Schedule multi-account posts, repost by ID, and automate community interactions seamlessly.',
    icon: Send,
  },
  {
    title: 'Extra Automation',
    description: 'Bulk profile editing, automated likes/comments, and mass bio/banner updates in seconds.',
    icon: ShieldCheck,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Engineered for <span className="text-brand-primary">Growth</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Everything you need to dominate the X ecosystem at any scale. 
            From solo creators to massive media agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-8 h-full flex flex-col gap-4 border-white/5 hover:border-brand-primary/20">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2">
                  <feature.icon className="w-6 h-6 border-brand-primary/20" />
                </div>
                <h3 className="text-xl font-bold font-display">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
