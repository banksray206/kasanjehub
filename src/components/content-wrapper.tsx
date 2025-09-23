import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContentWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("relative group animate-fade-in py-12 md:py-20", className)}>
      <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:left-2 opacity-0 group-hover:opacity-50 transition-opacity cursor-move" aria-hidden="true">
        <GripVertical className="text-muted-foreground" />
      </div>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
