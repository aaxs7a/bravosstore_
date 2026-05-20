import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#050506] py-10 text-zinc-600 text-[17px] font-mono">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 BRAVOS's STORE. POWERED BY NEXT.JS 15 & TAILWIND v4.</p>
        <div className="w-6 h-6 rounded-full border border-zinc-900 bg-zinc-950 flex items-center justify-center text-white text-[9px] font-black select-none">N</div>
      </div>
    </footer>
  );
}