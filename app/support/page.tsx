export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 min-h-[50vh]">
      <h1 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: "var(--font-display)" }}>Customer Support</h1>
      <p className="text-[#6E675C] mb-4">We are here to help you with any questions about your order, products, or account.</p>

      <div className="flex flex-col gap-3 mb-6">
        <p className="text-[#6E675C]">Email: rslbdshop@gmail.com</p>

        <a href="https://wa.me/8801409000421" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#6E675C] hover:text-[#9C7A44] transition-colors w-fit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2m0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.27-4.38c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.25 8.24m4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07.89 2.4 1.02 2.57c.12.16 1.75 2.68 4.25 3.75.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29"/></svg>
          <span>WhatsApp: +880 1409 000421</span>
        </a>

        <a href="https://www.facebook.com/share/18S865vmAM/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#6E675C] hover:text-[#9C7A44] transition-colors w-fit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94"/></svg>
          <span>Follow us on Facebook</span>
        </a>
      </div>

      <p className="text-[#6E675C]">You can also reach out to us through our social media pages for a faster response.</p>
    </div>
  );
}
