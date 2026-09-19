"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Banner {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  link_url: string | null;
}

export default function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  if (!banners || banners.length === 0) return null;

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goNext();
    } else if (distance < -minSwipeDistance) {
      goPrev();
    }
  };

  return (
    <section
      className="relative w-full min-h-[440px] h-[58vh] md:h-[68vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === current ? 1 : 0, pointerEvents: index === current ? "auto" : "none" }}
        >
          <Image
            src={banner.image_url}
            alt={banner.title || "RSL Fashion Store Banner"}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 pointer-events-none" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            {banner.title ? (
              <h2 className="max-w-4xl text-3xl sm:text-4xl md:text-6xl leading-[1.08] text-[#F7F5F0] mb-4 drop-shadow-md" style={{ fontFamily: "var(--font-display)" }}>
                {banner.title}
              </h2>
            ) : null}

            {banner.subtitle ? (
              <p className="text-[#F7F5F0]/90 max-w-xl mb-8 text-sm md:text-base drop-shadow" style={{ fontFamily: "var(--font-sans)" }}>
                {banner.subtitle}
              </p>
            ) : null}

            {banner.link_url ? (
              <a href={banner.link_url} className="bg-[#F7F5F0] text-[#14212B] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#B28B52] hover:text-[#F7F5F0] transition-colors">
                SHOP NOW
              </a>
            ) : null}
          </div>
        </div>
      ))}

      {banners.length > 1 ? (
        <div>
          <button onClick={goPrev} aria-label="Previous" className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-[#F7F5F0]/80 hover:bg-[#F7F5F0] rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>

          <button onClick={goNext} aria-label="Next" className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-[#F7F5F0]/80 hover:bg-[#F7F5F0] rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((b, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={"Go to slide " + (index + 1)}
                className={index === current ? "w-2.5 h-2.5 rounded-full bg-[#F7F5F0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F5F0]" : "w-2.5 h-2.5 rounded-full bg-[#F7F5F0]/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F5F0]"}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
