import { MapPin } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// MOCK DATA - Replace with actual data from API
const ALL_PLANTATIONS = [
  {
    id: '1',
    name: 'Pedro Tea Estate',
    address: 'Nuwara Eliya, Sri Lanka',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbJISbGQn4noP42c9q4Sha96Z4OKv_kpKeg&s',
    description: 'Experience the charm of Pedro Tea Estate with breathtaking views of tea plantations.'
  },
  {
    id: '2',
    name: 'Bluefield Tea Garden',
    address: 'Ramboda, Sri Lanka',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800',
    description: 'Discover the tranquility and beauty of Bluefield Tea Garden.'
  },
  {
    id: '3',
    name: 'Haputale Estate',
    address: 'Haputale, Sri Lanka',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800',
    description: 'Explore the historic Haputale Estate with stunning mountain views.'
  },
  {
    id: '4',
    name: 'Uda Pussellawa',
    address: 'Kandy, Sri Lanka',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbJISbGQn4noP42c9q4Sha96Z4OKv_kpKeg&s',
    description: 'Visit the lush green plantations of Uda Pussellawa.'
  },
  {
    id: '5',
    name: 'Dambulla Tea Valley',
    address: 'Dambulla, Sri Lanka',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800',
    description: 'Immerse yourself in the scenic Dambulla Tea Valley with traditional tea-making experiences.'
  },
  {
    id: '6',
    name: 'Ella Ridge Plantation',
    address: 'Ella, Sri Lanka',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbJISbGQn4noP42c9q4Sha96Z4OKv_kpKeg&s',
    description: 'Enjoy panoramic views and authentic Ceylon tea at Ella Ridge Plantation.'
  }
];

export default function Plantations() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1B4332]">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center px-12 text-white">
        <img 
          src="/images/landing.jpg" 
          className="absolute inset-0 w-full h-full object-cover brightness-75" 
          alt="Tea Background"
        />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Tea Plantations</h1>
          <p className="text-lg">Explore all our premium Ceylon tea estates</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16 px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1B4332] mb-4 font-serif">Our Tea Plantations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of premium tea estates across Sri Lanka's finest tea-growing regions.
          </p>
        </div>

        {/* Plantations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ALL_PLANTATIONS.map((plantation) => (
            <div 
              key={plantation.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img 
                src={plantation.image} 
                className="h-48 w-full object-cover" 
                alt={plantation.name} 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#1B4332]">{plantation.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 mb-3">
                  <MapPin size={16} />
                  <span className="text-sm">{plantation.address}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{plantation.description}</p>
                <button className="w-full bg-[#52B788] text-white py-2 rounded-md font-medium hover:bg-[#40916c] transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
