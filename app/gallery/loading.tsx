import { LottieLoader } from "@/components/interactive/LottieLoader";
import { GallerySkeleton } from "@/components/skeletons/GallerySkeleton";
import { MICROCOPY } from "@/lib/constants/company";

export default function GalleryLoading() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-28 text-white">
        <div className="absolute inset-0 bg-grid-lines-dark" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <LottieLoader kind="loader" size={72} />
          <p className="mt-4 text-sm font-medium uppercase tracking-wider text-white/50">
            {MICROCOPY.loading}
          </p>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <GallerySkeleton />
        </div>
      </section>
    </>
  );
}
