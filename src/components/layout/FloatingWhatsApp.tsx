'use client';

import { MessageCircle } from 'lucide-react';

interface Props {
  message?: string;
}

export default function FloatingWhatsApp({ message = "Hi Bhasko, I'd like to know more about solar." }: Props) {
  const encoded = encodeURIComponent(message);
  return (
    <a
      href={`https://wa.me/919999999999?text=${encoded}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] items-center justify-center hover:scale-110 transition-transform pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
