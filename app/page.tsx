import { Atlas } from "@/components/Atlas";
import { Hero } from "@/components/Hero";
import { LiveCounter } from "@/components/LiveCounter";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b-4 border-ink bg-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="font-display text-lg uppercase sm:text-2xl">
            Epic Atlas
          </a>
          <LiveCounter />
        </div>
      </header>

      <main id="top">
        <Hero />
        <Atlas />
      </main>

      <footer className="border-t-4 border-ink bg-ink px-4 py-8 text-paper sm:px-6">
        <div className="mx-auto max-w-7xl space-y-2 text-sm">
          <p>
            <strong>Sources:</strong> Homer&rsquo;s <em>Iliad</em> and <em>Odyssey</em>, Valmiki&rsquo;s{" "}
            <em>Ramayana</em>, and Vyasa&rsquo;s <em>Mahabharata</em>, summarised in our own words.
          </p>
          <p>
            These stories exist in many versions and details vary between them. The maps are stylised
            and not to scale, and many traditional locations are uncertain or disputed.
          </p>
        </div>
      </footer>
    </>
  );
}
