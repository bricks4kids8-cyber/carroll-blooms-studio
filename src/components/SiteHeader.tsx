import { Link } from "@tanstack/react-router";
import dragon from "@/assets/carroll-dragon.png.asset.json";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={dragon.url}
            alt="Carroll ISD Dragons logo"
            width={44}
            height={44}
            className="size-11 object-contain"
          />
          <span className="text-sm leading-tight">
            <span className="block font-semibold text-foreground">
              Carroll Floral Design
            </span>
            <span className="block text-xs text-muted-foreground">
              Carroll ISD · Southlake, TX
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" hash="program" className="transition-colors hover:text-foreground">
            Program
          </Link>
          <Link to="/" hash="studio" className="transition-colors hover:text-foreground">
            Studio
          </Link>
          <Link to="/inquiries" className="transition-colors hover:text-foreground">
            Business inquiries
          </Link>
        </div>
        <Link
          to="/inquiries"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
        >
          Get a quote
        </Link>
      </nav>
    </header>
  );
}
