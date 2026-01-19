import { Compass, Heart, Users } from 'lucide-react';

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-6 p-8 bg-[#B7E4C7] rounded-lg">
      <div className="w-12 h-12 bg-[#2D6A4F] rounded-full flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <p className="text-gray-700 text-lg">{desc}</p>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      icon: <Compass className="text-white" />,
      title: "Explore Tea Plantations",
      desc: "Discover the finest Ceylon tea estates with guided tours, factory visits, and immersive cultural experiences"
    },
    {
      icon: <Heart className="text-white" />,
      title: "Promote Plantations",
      desc: "Help tea estates reach a global audience and showcase their unique heritage, products, and experiences"
    },
    {
      icon: <Users className="text-white" />,
      title: "Support Tourism & Culture",
      desc: "Contribute to sustainable tourism while preserving the rich cultural heritage of Ceylon tea traditions"
    }
  ];

  return (
    <section className="py-20 px-12 bg-white">
      <h2 className="text-center text-4xl font-bold mb-2">Our Services</h2>
      <p className="text-center text-lg text-gray-500 mb-12">We connect tea enthusiasts with authentic plantation experiences across this beautiful island</p>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {services.map((service, index) => (
          <ServiceCard 
            key={index}
            icon={service.icon} 
            title={service.title} 
            desc={service.desc} 
          />
        ))}
      </div>
    </section>
  );
}
