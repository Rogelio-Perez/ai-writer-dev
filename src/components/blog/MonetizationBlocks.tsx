import { ExternalLink, BookOpen, Package, Megaphone } from "lucide-react";

export function AffiliateBlock({ title, description, link, cta }: { title: string; description: string; link: string; cta: string }) {
  return (
    <div className="my-8 p-5 rounded-lg border border-primary/20 bg-accent/30 flex flex-col sm:flex-row gap-4 items-start">
      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
        <ExternalLink className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="font-display font-semibold text-foreground text-sm">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-2 hover:underline">
          {cta} <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export function CoursePromoBlock({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <div className="my-8 p-5 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <h4 className="font-display font-semibold text-foreground text-sm">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <a href={link} className="inline-block mt-3 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
        Learn More
      </a>
    </div>
  );
}

export function AdBlock() {
  return (
    <div className="my-8 p-4 rounded-lg border border-dashed border-border bg-muted/30 flex items-center justify-center min-h-[100px]">
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        <Megaphone className="w-4 h-4" />
        <span>Ad Space</span>
      </div>
    </div>
  );
}

export function DigitalProductBlock({ title, description, price, link }: { title: string; description: string; price: string; link: string }) {
  return (
    <div className="my-8 p-5 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 mb-2">
        <Package className="w-5 h-5 text-primary" />
        <h4 className="font-display font-semibold text-foreground text-sm">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex items-center gap-3 mt-3">
        <span className="font-mono font-bold text-foreground">{price}</span>
        <a href={link} className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          Get It
        </a>
      </div>
    </div>
  );
}
