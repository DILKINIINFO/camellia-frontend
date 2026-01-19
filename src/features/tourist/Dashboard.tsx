import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

interface Experience {
  id: number;
  plantationName: string;
  visitDate: string;
  image: string;
  description: string;
}

interface Review {
  id: number;
  plantationName: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  image?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'experiences' | 'reviews'>('experiences');

  const pastExperiences: Experience[] = [
    {
      id: 1,
      plantationName: "Nuwara Eliya Tea Estate",
      visitDate: "December 15, 2025",
      image: "/images/about.png",
      description: "Had an amazing experience exploring the beautiful tea plantations in Nuwara Eliya. The guide was very knowledgeable and shared fascinating stories about tea production..."
    },
    {
      id: 2,
      plantationName: "Ella Tea Valley",
      visitDate: "November 28, 2025",
      image: "/images/about.png",
      description: "Wonderful journey through the Ella valley. Learned about sustainable tea farming practices and participated in tea picking. Absolutely breathtaking views!"
    },
    {
      id: 3,
      plantationName: "Kandy Highland Estate",
      visitDate: "October 10, 2025",
      image: "/images/about.png",
      description: "Experienced the traditional tea processing methods. The tea tasting session was memorable with excellent Ceylon tea varieties."
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      plantationName: "Nuwara Eliya Tea Estate",
      rating: 5,
      reviewText: "Absolutely fantastic experience! The staff was welcoming and the tea tasting was educational. Highly recommend this plantation tour.",
      reviewDate: "December 20, 2025",
      image: "/images/about.png"
    },
    {
      id: 2,
      plantationName: "Ella Tea Valley",
      rating: 4,
      reviewText: "Great location with stunning views. The tea picking activity was fun and engaging. Would have appreciated more time at the processing facility.",
      reviewDate: "December 2, 2025",
      image: "/images/about.png"
    },
    {
      id: 3,
      plantationName: "Kandy Highland Estate",
      rating: 5,
      reviewText: "Outstanding service and beautiful grounds. The guided tour was comprehensive and the tea quality was excellent. Worth every penny!",
      reviewDate: "October 15, 2025",
      image: "/images/about.png"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B4332]">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="py-16 px-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold font-serif text-center mb-4">My Dashboard</h1>
            <p className="text-gray-600 text-center">View your past experiences and reviews from Camellia plantations</p>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-4 mb-12 justify-center">
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                activeTab === 'experiences'
                  ? 'bg-[#52B788] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Past Plantations
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                activeTab === 'reviews'
                  ? 'bg-[#52B788] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              My Reviews
            </button>
          </div>

          {/* Content Sections */}
          {activeTab === 'experiences' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-8">Past Plantation Experiences</h2>
              {pastExperiences.length > 0 ? (
                pastExperiences.map((experience) => (
                  <div key={experience.id} className="border-l-4 border-[#2D6A4F] pl-6 py-4 bg-gray-50 rounded-r-lg shadow-sm hover:shadow-md transition">
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={experience.image}
                          alt={experience.plantationName}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1B4332] mb-2">{experience.plantationName}</h3>
                        <p className="text-sm text-gray-500 mb-3">📅 Visited: {experience.visitDate}</p>
                        <p className="text-gray-700 leading-relaxed">{experience.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-lg">No past experiences yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-8">My Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-6">
                    <div className="flex gap-6">
                      {/* Image */}
                      {review.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={review.image}
                            alt={review.plantationName}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-[#1B4332]">{review.plantationName}</h3>
                            <p className="text-sm text-gray-500">📅 {review.reviewDate}</p>
                          </div>
                          <div className="text-right">
                            {renderStars(review.rating)}
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed italic">"{review.reviewText}"</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-lg">No reviews yet</p>
                </div>
              )}
            </div>
          )}

          {/* Add New Review Section */}
          {activeTab === 'experiences' && pastExperiences.length > 0 && (
            <div className="mt-16 bg-gradient-to-r from-[#2D6A4F] to-[#52B788] rounded-lg shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
              <p className="mb-6">Have you visited any of these plantations? Share your review and help other travelers!</p>
              <button
                onClick={() => setActiveTab('reviews')}
                className="bg-white text-[#2D6A4F] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
              >
                Add a Review
              </button>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="mt-16 bg-gray-50 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#1B4332]">Write a Review</h2>
              <form className="space-y-6">
                {/* Plantation Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#1B4332]">
                    Select Plantation <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]">
                    <option value="">Choose a plantation you visited</option>
                    {pastExperiences.map((exp) => (
                      <option key={exp.id} value={exp.id}>{exp.plantationName}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#1B4332]">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-4xl hover:text-yellow-400 transition cursor-pointer text-gray-400"
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#1B4332]">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Share your experience and thoughts about this plantation..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold py-3 px-8 rounded-lg transition"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('reviews')}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-16 flex gap-6 justify-center">
            <button
              onClick={() => navigate('/plantations')}
              className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Explore More Plantations
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
