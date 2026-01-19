import { Facebook, Youtube, Instagram, Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2D6A4F] text-white py-16 px-12 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 border-b border-white/20 pb-12">
        <div>
          <h2 className="text-2xl font-bold mb-2">Camellia</h2>
          <p className="text-sm opacity-80">Ceylon Tea Tourism</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Promote Plantations</h4>
          <p className="text-sm opacity-70">Help tea estates reach a global audience and showcase their unique heritage, products, and experiences</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="text-sm opacity-70 space-y-2">
            <li><a href="#" className="hover:opacity-100 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:opacity-100 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:opacity-100 transition">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto flex justify-between items-center mt-8">
        <p className="text-sm opacity-50">© 2025 Camellia - Ceylon Tea Tourism. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="opacity-70 hover:opacity-100 transition"><Facebook size={20} /></a>
          <a href="#" className="opacity-70 hover:opacity-100 transition"><Youtube size={20} /></a>
          <a href="#" className="opacity-70 hover:opacity-100 transition"><Instagram size={20} /></a>
          <a href="#" className="opacity-70 hover:opacity-100 transition"><Music size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
