"use client";

import { useState } from "react";

export default function BannerCarousel({ banners }) {
  const [current, setCurrent] = useState(0);

  if (!banners || banners.length === 0) return null;

  const goPrev = function () {
    setCurrent(function (prev) {
      return prev === 0 ? banners.length - 1 : prev - 1;
    });
  };

  const goNext = function () {
    setCurrent(function (prev) {
      return prev === banners.length - 1 ? 0 : prev + 1;
    });
  };

  const banner = banners[current];

  return (
    <section className="relative w-full h-[70vh] md:h-[86vh] overflow-hidden">
      <img src={banner.image_url} alt={banner.title || "Banner"} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {banner.title ? (
          <h1 className="text-4xl md:text-6xl text-[#F7F4EF] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {banner.title}
          </h1>
        ) : null}

        {banner.subtitle ? (
          <p className="text-[#F7F4EF]/80 max-w-md mb-8" style={{ fontFamily: "var(--font-sans)" }}>
            {banner.subtitle}
          </p>
        ) : null}

        {banner.link_url ? (
          <a href={banner.link_url} className="bg-[#F7F4EF] text-[#14120F] px-8 py-3.5 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] hover:text-[#F7F4EF] transition-colors">
            SHOP NOW
          </a>
        ) : null}
      </div>

      {banners.length > 1 ? (
        <div>
          <button onClick={goPrev} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-[#F7F4EF]/80 hover:bg-[#F7F4EF] rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>

          <button onClick={goNext} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-[#F7F4EF]/80 hover:bg-[#F7F4EF] rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map(function (b, index) {
              return (
                <button
                  key={index}
                  onClick={function () { setCurrent(index); }}
                  aria-label={"Go to slide " + (index + 1)}
                  className={index === current ? "w-2 h-2 rounded-full bg-[#F7F4EF]" : "w-2 h-2 rounded-full bg-[#F7F4EF]/40"}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
