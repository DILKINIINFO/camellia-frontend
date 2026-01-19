import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Users, Clock, MapPinIcon, Phone, Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Mock plantation data with full details
const PLANTATION_DATA: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Pedro Tea Estate',
    address: 'Nuwara Eliya, Sri Lanka',
    mainImage: '/images/about.png',
    galleryImages: [
      '/images/about.png',
      '/images/about.png',
      '/images/about.png',
      '/images/about.png'
    ],
    description: 'Experience the charm of Pedro Tea Estate with breathtaking views of tea plantations.',
    detailedDescription: 'Pedro Tea Estate is one of Sri Lanka\'s most prestigious tea plantations, nestled in the misty highlands of Nuwara Eliya. With over 150 years of tea-making excellence, this estate combines traditional methods with modern sustainability practices.',
    features: [
      {
        title: 'Tea Picking Experience',
        description: 'Learn traditional tea picking methods from our expert guides'
      },
      {
        title: 'Factory Tour',
        description: 'Witness the complete tea processing and packaging process'
      },
      {
        title: 'Tea Tasting',
        description: 'Sample premium Ceylon teas with expert-led tasting sessions'
      }
    ],
    highlights: {
      altitude: '2,200m above sea level',
      area: '500 hectares',
      visitors: '10,000+ per year',
      established: '1872'
    },
    rating: 4.8,
    reviews: 245,
    price: '$45 per person',
    duration: '4 hours',
    bestTime: 'December to March',
    contact: {
      phone: '+94 (0) 52 222 2345',
      email: 'info@pedroestate.com'
    },
    activities: [
      'Tea Leaf Picking',
      'Factory Tour',
      'Tea Tasting',
      'Traditional Photography',
      'Picnic Lunch',
      'Hiking'
    ]
  },
  '2': {
    id: '2',
    name: 'Bluefield Tea Garden',
    address: 'Ramboda, Sri Lanka',
    mainImage: '/images/about.png',
    galleryImages: ['/images/about.png', '/images/about.png', '/images/about.png', '/images/about.png'],
    description: 'Discover the tranquility and beauty of Bluefield Tea Garden.',
    detailedDescription: 'Bluefield Tea Garden offers a serene experience amidst lush green landscapes and cascading waterfalls. This family-owned estate is known for its exceptional quality teas and warm hospitality.',
    features: [
      { title: 'Waterfall Trekking', description: 'Explore scenic trails with beautiful waterfall views' },
      { title: 'Tea Blending Workshop', description: 'Create your own custom tea blend' },
      { title: 'Farm Fresh Meals', description: 'Enjoy organic meals prepared with estate-grown ingredients' }
    ],
    highlights: {
      altitude: '1,800m above sea level',
      area: '300 hectares',
      visitors: '8,000+ per year',
      established: '1920'
    },
    rating: 4.7,
    reviews: 198,
    price: '$40 per person',
    duration: '3.5 hours',
    bestTime: 'January to April',
    contact: {
      phone: '+94 (0) 52 234 5678',
      email: 'info@bluefieldgarden.com'
    },
    activities: ['Waterfall Trek', 'Tea Blending', 'Cooking Class', 'Photography', 'Nature Walk']
  },
  '3': {
    id: '3',
    name: 'Haputale Estate',
    address: 'Haputale, Sri Lanka',
    mainImage: '/images/about.png',
    galleryImages: ['/images/about.png', '/images/about.png', '/images/about.png', '/images/about.png'],
    description: 'Explore the historic Haputale Estate with stunning mountain views.',
    detailedDescription: 'Haputale Estate is renowned for its panoramic views and historic significance in Ceylon tea production. The estate offers authentic experiences and educational tours.',
    features: [
      { title: 'Panoramic Views', description: 'Stunning vistas of surrounding tea plantations' },
      { title: 'Heritage Tour', description: 'Learn about the estate\'s 150+ year history' },
      { title: 'Local Cuisine', description: 'Authentic Sri Lankan meals' }
    ],
    highlights: {
      altitude: '1,900m above sea level',
      area: '450 hectares',
      visitors: '7,500+ per year',
      established: '1889'
    },
    rating: 4.6,
    reviews: 176,
    price: '$38 per person',
    duration: '4 hours',
    bestTime: 'February to May',
    contact: {
      phone: '+94 (0) 52 245 6789',
      email: 'info@haputale-estate.com'
    },
    activities: ['Heritage Tour', 'Tea Processing', 'Bird Watching', 'Sunset Viewing', 'Cultural Show']
  },
  '4': {
    id: '4',
    name: 'Uda Pussellawa',
    address: 'Kandy, Sri Lanka',
    mainImage: '/images/about.png',
    galleryImages: ['/images/about.png', '/images/about.png', '/images/about.png', '/images/about.png'],
    description: 'Visit the lush green plantations of Uda Pussellawa.',
    detailedDescription: 'Uda Pussellawa is a premier tea estate offering immersive tea tourism experiences in the heart of Kandy\'s tea country.',
    features: [
      { title: 'Tea Picking', description: 'Hand-pick tea leaves with local farmers' },
      { title: 'Processing Facility', description: 'Modern tea processing technology tour' },
      { title: 'Accommodation', description: 'Stay overnight in estate cottages' }
    ],
    highlights: {
      altitude: '1,700m above sea level',
      area: '380 hectares',
      visitors: '6,000+ per year',
      established: '1895'
    },
    rating: 4.5,
    reviews: 152,
    price: '$42 per person',
    duration: '5 hours',
    bestTime: 'March to June',
    contact: {
      phone: '+94 (0) 81 234 5678',
      email: 'info@udapussellawa.com'
    },
    activities: ['Tea Picking', 'Factory Tour', 'Overnight Stay', 'Traditional Cooking', 'Meditation']
  },
  '5': {
    id: '5',
    name: 'Dambulla Tea Valley',
    address: 'Dambulla, Sri Lanka',
    mainImage: '/images/about.png',
    galleryImages: ['/images/about.png', '/images/about.png', '/images/about.png', '/images/about.png'],
    description: 'Immerse yourself in the scenic Dambulla Tea Valley with traditional tea-making experiences.',
    detailedDescription: 'Dambulla Tea Valley offers unique cultural experiences combined with traditional tea-making practices.',
    features: [
      { title: 'Traditional Methods', description: 'Learn ancestral tea-making techniques' },
      { title: 'Cultural Show', description: 'Experience local music and dance' },
      { title: 'Market Visit', description: 'Browse local markets and crafts' }
    ],
    highlights: {
      altitude: '1,500m above sea level',
      area: '320 hectares',
      visitors: '5,500+ per year',
      established: '1910'
    },
    rating: 4.4,
    reviews: 128,
    price: '$35 per person',
    duration: '4 hours',
    bestTime: 'April to September',
    contact: {
      phone: '+94 (0) 66 234 5678',
      email: 'info@dambullateavalley.com'
    },
    activities: ['Traditional Tea Making', 'Cultural Show', 'Market Tour', 'Meditation', 'Photography']
  },
  '6': {
    id: '6',
    name: 'Ella Ridge Plantation',
    address: 'Ella, Sri Lanka',
    mainImage: '/images/about.png',
    galleryImages: ['/images/about.png', '/images/about.png', '/images/about.png', '/images/about.png'],
    description: 'Enjoy panoramic views and authentic Ceylon tea at Ella Ridge Plantation.',
    detailedDescription: 'Ella Ridge Plantation combines adventure and relaxation with breathtaking vistas and premium tea experiences.',
    features: [
      { title: 'Panoramic Hikes', description: 'Guided hikes with stunning ridge views' },
      { title: 'Tea Spa', description: 'Relaxing treatments with tea extracts' },
      { title: 'Gourmet Dining', description: 'Tea-paired meals with mountain views' }
    ],
    highlights: {
      altitude: '2,050m above sea level',
      area: '420 hectares',
      visitors: '9,000+ per year',
      established: '1901'
    },
    rating: 4.9,
    reviews: 267,
    price: '$50 per person',
    duration: '5 hours',
    bestTime: 'November to April',
    contact: {
      phone: '+94 (0) 57 234 5678',
      email: 'info@ellaridge.com'
    },
    activities: ['Hiking', 'Tea Spa', 'Gourmet Dining', 'Tea Tasting', 'Photography Tours']
  }
};

export default function PlantationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plantation = id ? PLANTATION_DATA[id] : null;

  if (!plantation) {
    return (
      <div className="min-h-screen bg-white font-sans text-[#1B4332]">
        <Navbar />
        <main className="py-16 px-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Plantation not found</h1>
          <button
            onClick={() => navigate('/plantations')}
            className="bg-[#2D6A4F] text-white px-6 py-3 rounded-lg hover:bg-[#1B4332] transition"
          >
            Back to Plantations
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B4332]">
      {/* Header */}
      <Navbar />

      {/* Main Image */}
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src={plantation.mainImage}
          alt={plantation.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20"></div>
      </div>

      {/* Main Content */}
      <main className="py-16 px-12">
        <div className="max-w-5xl mx-auto">
          {/* Title and Location */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold font-serif mb-4">{plantation.name}</h1>
            <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
              <MapPin size={24} />
              <span>{plantation.address}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(plantation.rating) ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-lg font-semibold">{plantation.rating}</span>
              <span className="text-gray-600">({plantation.reviews} reviews)</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">{plantation.detailedDescription}</p>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {plantation.galleryImages.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition"
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Experience Highlights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {plantation.features.map((feature, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-[#2D6A4F]">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Info */}
          <div className="mb-16 bg-gradient-to-r from-[#2D6A4F] to-[#52B788] text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8">Estate Information</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm opacity-90">Altitude</p>
                <p className="text-2xl font-bold">{plantation.highlights.altitude}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Area</p>
                <p className="text-2xl font-bold">{plantation.highlights.area}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Annual Visitors</p>
                <p className="text-2xl font-bold">{plantation.highlights.visitors}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Established</p>
                <p className="text-2xl font-bold">{plantation.highlights.established}</p>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Available Activities</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {plantation.activities.map((activity, idx) => (
                <div key={idx} className="bg-[#B7E4C7] text-[#1B4332] px-6 py-3 rounded-full text-center font-semibold">
                  {activity}
                </div>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-[#2D6A4F]" />
              <p className="text-sm text-gray-600 mb-2">Duration</p>
              <p className="text-2xl font-bold">{plantation.duration}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-[#2D6A4F]" />
              <p className="text-sm text-gray-600 mb-2">Best Time to Visit</p>
              <p className="text-2xl font-bold">{plantation.bestTime}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-[#2D6A4F]" />
              <p className="text-sm text-gray-600 mb-2">Price</p>
              <p className="text-2xl font-bold">{plantation.price}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-[#52B788] to-[#40916c] text-white p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm opacity-90">Telephone</p>
                  <p className="text-lg font-semibold">{plantation.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm opacity-90">Email</p>
                  <p className="text-lg font-semibold">{plantation.contact.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 justify-center">
            <button className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold py-3 px-10 rounded-lg transition text-lg">
              Book Now
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white font-semibold py-3 px-10 rounded-lg transition text-lg"
            >
              Contact Us
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/plantations')}
              className="text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-lg underline"
            >
              ← Back to All Plantations
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
