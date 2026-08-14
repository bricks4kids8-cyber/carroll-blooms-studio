import dragon from "@/assets/carroll-dragon.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            src={dragon.url}
            alt="Carroll ISD Dragons logo"
            loading="lazy"
            width={36}
            height={36}
            className="size-9 object-contain"
          />
          <p>Carroll High School Floral Design · Carroll ISD, Southlake TX</p>
        </div>
        <p>Go Dragons.</p>
      </div>
    </footer>
  );
}
