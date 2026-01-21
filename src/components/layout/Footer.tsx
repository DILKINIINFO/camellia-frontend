import { Facebook, Youtube, Instagram, Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2D6A4F] text-white py-16 px-12 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/20 pb-12">
        {/* Company Info - Column 1 */}
        <div>
          <div className="w-10 h-10 bg-white mb-2"></div> {/* Placeholder for logo */}
          <h2 className="text-2xl font-bold mb-1">Camellia</h2>
          <p className="text-sm opacity-80">Ceylon Tea Tourism</p>
        </div>

        {/* Promote Plantations - Column 2 */}
        <div className="md:col-span-2"> {/* Span 2 columns on medium and larger screens */}
          <h4 className="font-bold mb-4">Promote Plantations</h4>
          <p className="text-sm opacity-70">Help tea estates reach a global audience and showcase their unique heritage, products, and experiences</p>
        </div>

        {/* Legal Links - Column 3 */}
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="text-sm opacity-70 space-y-2">
            <li><a href="#" className="hover:opacity-100 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:opacity-100 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:opacity-100 transition">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      {/* Follow Us and Copyright */}
      <div className="max-w-6xl mx-auto pt-8">
        <h4 className="font-bold mb-6 text-center">Follow Us</h4>
        <div className="flex justify-center gap-8 mb-8">
          <a href="#" className="opacity-70 hover:opacity-100 transition"><Facebook size={24} /></a>
          <a href="#" className="opacity-70 hover:opacity-100 transition"><Youtube size={24} /></a>
          <a href="#" className="opacity-70 hover:opacity-100 transition"><Instagram size={24} /></a>
          <a href="#" className="opacity-70 hover:opacity-100 transition"><Music size={24} /></a>
        </div>
        {/* Copyright */}
        <p className="text-sm opacity-50 text-center">© 2025 Camellia - Ceylon Tea Tourism. All rights reserved.</p>
      </div>
    </footer>
  );
}