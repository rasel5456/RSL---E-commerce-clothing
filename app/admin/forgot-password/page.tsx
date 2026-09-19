import Link from "next/link";

export default function AdminForgotPasswordPage() {
  const subject = encodeURIComponent("RSL Admin Password Reset Request");
  const body = encodeURIComponent("Hello RSL team,\n\nI need help resetting the RSL Admin password.\n\nI am contacting you from the registered RSL support email.");

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 py-16 text-[#14212B]">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.25em] text-[#B28B52] mb-4">RSL / ADMIN ACCESS</p>
          <h1 className="text-3xl mb-3" style={{ fontFamily: "Georgia, serif" }}>Recover your access</h1>
          <p className="text-sm text-[#66727A] leading-relaxed">Password recovery is available only through the registered RSL support contacts below.</p>
        </div>

        <div className="bg-white border border-[#D7DDE0] p-7 md:p-8 shadow-sm">
          <div className="space-y-4">
            <a
              href={`mailto:rslbdshop@gmail.com?subject=${subject}&body=${body}`}
              className="flex items-center justify-between gap-4 border border-[#14212B] px-5 py-4 text-sm hover:bg-[#14212B] hover:text-[#F7F5F0] transition-colors"
            >
              <span>
                <strong className="block font-normal tracking-[0.08em]">EMAIL RSL SUPPORT</strong>
                <span className="text-xs opacity-70">rslbdshop@gmail.com</span>
              </span>
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="https://wa.me/8801409000421?text=Hello%20RSL%2C%20I%20need%20help%20resetting%20the%20Admin%20password."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 border border-[#D7DDE0] px-5 py-4 text-sm text-[#14212B] hover:border-[#B28B52] hover:text-[#B28B52] transition-colors"
            >
              <span>
                <strong className="block font-normal tracking-[0.08em]">CONTACT ON WHATSAPP</strong>
                <span className="text-xs text-[#66727A]">+880 1409 000421</span>
              </span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="mt-7 pt-6 border-t border-[#D7DDE0] text-xs text-[#66727A] leading-relaxed">
            For security, do not send your current or new password in chat. Requests from any other email address or phone number will not be accepted. RSL support will verify ownership before providing reset steps.
          </div>
        </div>

        <Link href="/admin/login" className="block text-center mt-6 text-sm text-[#66727A] hover:text-[#B28B52] transition-colors">
          ← Back to Admin Login
        </Link>
      </div>
    </div>
  );
}
