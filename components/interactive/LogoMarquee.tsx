import Image from "next/image";

type Logo = { name: string; src: string };

export function LogoMarquee({ logos }: { logos: readonly Logo[] }) {
  const track = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track motion-reduce:animate-none">
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="mx-3 flex shrink-0 items-center justify-center rounded-xl border border-navy/10 bg-white px-6 py-3 shadow-premium grayscale opacity-80 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={130}
              height={52}
              className="h-11 w-auto object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
