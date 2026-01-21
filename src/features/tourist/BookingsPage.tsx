import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TouristDetailsModal, { type TouristDetails } from './TouristDetailsModal'; // Import the new modal and type
import { PLANTATION_DATA } from './PlantationDetail';
const USD_TO_LKR = 330;

interface Booking {
  adults: number;
  children: number;
  experiences: string[];
  date: string;
  time: string;
}

type Step = 'country' | 'category' | 'datetime' | 'guests' | 'payment'; // Removed 'details' step

export default function BookingsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plantation = id ? PLANTATION_DATA[id] : null;

  const [step, setStep] = useState<Step>('country');
  const [country, setCountry] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [booking, setBooking] = useState<Booking>({
    adults: 1,
    children: 0,
    experiences: [],
    date: '',
    time: '',
  });
  const [capacityExceeded, setCapacityExceeded] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // New state for modal
  const [touristDetails, setTouristDetails] = useState<TouristDetails | null>(null); // New state for tourist details

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
      </div>
    );
  }

  const isLocalSriLankan = country === 'Sri Lanka';
  const currency = isLocalSriLankan ? 'LKR' : 'USD';

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setStep('category');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const getCommonTimeSlots = () => {
    if (!selectedCategories || selectedCategories.length === 0) return [];

    const exps = plantation.experiences.filter((e: any) => selectedCategories.includes(e.category));
    if (exps.length === 0) return [];

    const slotMap: Record<string, { date: string; time: string; capacity: number; booked: number }> = {};

    exps.forEach((exp: any) => {
      (exp.timeSlots || []).forEach((s: any) => {
        const key = `${s.date}||${s.time}`;
        if (!slotMap[key]) {
          slotMap[key] = { date: s.date, time: s.time, capacity: s.capacity || 0, booked: s.booked || 0 };
        } else {
          slotMap[key].capacity += s.capacity || 0;
          slotMap[key].booked += s.booked || 0;
        }
      });
    });

    const slots = Object.values(slotMap);
    slots.sort((a, b) => (a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)));
    return slots;
  };

  const handleTimeSlotSelect = (slot: any) => {
    const availableSlots = slot.capacity - slot.booked;
    if (availableSlots <= 0) {
      setCapacityExceeded(true);
      setTimeout(() => setCapacityExceeded(false), 3000);
      return;
    }
    setBooking({
      ...booking,
      date: slot.date,
      time: slot.time,
    });
    setStep('guests');
  };

  const handleGuestChange = (type: 'adults' | 'children', delta: number) => {
    const newValue = Math.max(0, booking[type] + delta);
    if (type === 'adults' && newValue === 0 && booking.children === 0) return;
    setBooking({ ...booking, [type]: newValue });
  };

  const handleConfirmBooking = () => {
    setIsDetailsModalOpen(true); // Open the details modal
  };

  // Handler for when tourist details are submitted from the modal
  const handleTouristDetailsSubmit = (details: TouristDetails) => {
    setTouristDetails(details);
    setIsDetailsModalOpen(false);
    setStep('payment'); // Move to the payment step after details are captured
    // In a real application, you would now send this booking and tourist data to a backend
    console.log("Booking confirmed with details:", { booking, details });
  };

  // Step 1: Country Selection
  if (step === 'country') {
    return (
      <div className="min-h-screen bg-white font-sans text-[#1B4332]">
        <Navbar />
        <main className="py-16 px-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => navigate(`/plantation/${id}`)}
                className="text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-lg underline mb-4"
              >
                ← Back to {plantation.name}
              </button>
              <h1 className="text-4xl font-bold font-serif mb-2">Book Experience</h1>
              <p className="text-lg text-gray-600">Step 1 of 4: Select Your Country</p>
            </div>

            <div className="bg-gradient-to-r from-[#E8F5E9] to-[#D4EDDA] p-8 rounded-lg border-2 border-[#B7E4C7] mb-8">
              <p className="text-lg font-semibold text-gray-700 mb-6">
                Where are you from?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Sri Lanka', 'USA', 'UK', 'Australia', 'Canada', 'Other Countries'].map(
                  (countryOption) => (
                    <button
                      key={countryOption}
                      onClick={() => handleCountrySelect(countryOption)}
                      className="bg-white border-2 border-[#B7E4C7] text-[#2D6A4F] hover:bg-[#B7E4C7] hover:text-white font-semibold py-4 px-6 rounded-lg transition text-lg flex items-center justify-between"
                    >
                      {countryOption}
                      <ChevronRight size={20} />
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                {isLocalSriLankan
                  ? 'Local Tourist - Prices in LKR'
                  : 'Foreign Tourist - Prices in USD'}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Step 2: Category Selection
  if (step === 'category') {
    const categories = ['Tea Factory Tour & Tasting', 'Hiking & Tea Plucking'];

    return (
      <div className="min-h-screen bg-white font-sans text-[#1B4332]">
        <Navbar />
        <main className="py-16 px-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => {
                  setStep('country');
                  setSelectedCategories([]);
                }}
                className="text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-lg underline mb-4"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold font-serif mb-2">Book Experience</h1>
              <p className="text-lg text-gray-600">Step 2 of 4: Select Categories</p>
              <div className="mt-4 p-4 bg-[#E8F5E9] rounded-lg">
                <p className="text-sm text-gray-600">Country: <span className="font-bold text-[#2D6A4F]">{country}</span></p>
                <p className="text-sm text-gray-600">Currency: <span className="font-bold text-[#2D6A4F]">{currency}</span></p>
              </div>
            </div>

            <p className="text-lg font-semibold text-gray-700 mb-4">
              Select one or both categories:
            </p>

            <div className="space-y-3 mb-8">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                const categoryExperiences = plantation.experiences.filter((exp: any) => exp.category === category);

                return (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full p-6 rounded-lg border-2 transition text-left flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#B7E4C7] border-[#2D6A4F]'
                        : 'bg-[#E8F5E9] border-[#B7E4C7] hover:bg-[#D4EDDA]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategorySelect(category)}
                      className="w-5 h-5 mt-1 accent-[#2D6A4F] cursor-pointer"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{category}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {categoryExperiences.length} experience{categoryExperiences.length !== 1 ? 's' : ''} available
                      </p>
                      <div className="text-sm text-[#2D6A4F]">
                        {categoryExperiences.map((exp: any) => exp.name).join(', ')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedCategories.length > 0 && (
              <div className="bg-gradient-to-r from-[#2D6A4F] to-[#52B788] text-white p-6 rounded-lg mb-8">
                <p className="text-lg font-semibold mb-2">
                  Selected: {selectedCategories.length} categor{selectedCategories.length !== 1 ? 'ies' : 'y'}
                </p>
                <p className="text-sm opacity-90 mb-4">{selectedCategories.join(', ')}</p>
                <button
                  onClick={() => {
                    const exps = plantation.experiences.filter((e: any) => selectedCategories.includes(e.category));
                    setBooking((prev) => ({ ...prev, experiences: exps.map((e: any) => e.name) }));
                    setStep('datetime');
                  }}
                  className="w-full bg-white text-[#2D6A4F] hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition text-lg"
                >
                  Continue to Date & Time →
                </button>
              </div>
            )}

            {selectedCategories.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">
                  Select at least one category to proceed
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Step 3: Date & Time Selection
  if (step === 'datetime') {
    const timeSlots = getCommonTimeSlots();

    return (
      <div className="min-h-screen bg-white font-sans text-[#1B4332]">
        <Navbar />
        <main className="py-16 px-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => setStep('category')}
                className="text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-lg underline mb-4"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold font-serif mb-2">Book Experience</h1>
              <p className="text-lg text-gray-600">Step 3 of 4: Select Date & Time</p>
              <div className="mt-4 p-4 bg-[#E8F5E9] rounded-lg">
                <p className="text-sm text-gray-600">Experiences: <span className="font-bold text-[#2D6A4F]">{booking.experiences.join(', ')}</span></p>
                <p className="text-sm text-gray-600 mt-2">Showing available time slots for all selected experiences</p>
              </div>
            </div>

            {capacityExceeded && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg mb-4">
                ⚠️ This time slot has reached its capacity limit. Please select another slot.
              </div>
            )}

            {timeSlots.length > 0 ? (
              <div className="space-y-3 mb-8">
                {timeSlots.map((slot: any, idx: number) => {
                  const remainingSlots = slot.capacity - slot.booked;
                  const isAvailable = remainingSlots > 0;

                  return (
                    <button
                      key={idx}
                      onClick={() => isAvailable && handleTimeSlotSelect(slot)}
                      disabled={!isAvailable}
                      className={`w-full p-4 rounded-lg border-2 transition text-left ${
                        isAvailable
                          ? 'bg-[#E8F5E9] border-[#B7E4C7] hover:bg-[#D4EDDA]'
                          : 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
                      } ${
                        booking.date === slot.date && booking.time === slot.time
                          ? 'border-[#2D6A4F] bg-[#B7E4C7]'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-lg">{slot.date} at {slot.time}</p>
                          <p className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {isAvailable
                              ? `${remainingSlots} slot${remainingSlots !== 1 ? 's' : ''} available`
                              : 'Fully Booked'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Booked</p>
                          <p className="font-semibold">{slot.booked}/{slot.capacity}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg mb-8">
                <p className="text-gray-600 text-lg">
                  No common time slots available for all selected experiences.
                </p>
                <p className="text-sm text-gray-500 mt-2">Please select different experiences.</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Step 4: Guests Selection
  if (step === 'guests') {
    let totalDisplayPrice = 0;
    const experiencePrices: { name: string; adultPrice: number; childPrice: number; displayAdultPrice: number; displayChildPrice: number }[] = [];

    booking.experiences.forEach((expName) => {
      const exp = plantation.experiences.find((e: any) => e.name === expName);
      if (exp) {
        const adultPrice = exp.priceUSD.adult;
        const childPrice = exp.priceUSD.child;
        const displayAdultPrice = isLocalSriLankan ? adultPrice * USD_TO_LKR : adultPrice;
        const displayChildPrice = isLocalSriLankan ? childPrice * USD_TO_LKR : childPrice;

        experiencePrices.push({
          name: expName,
          adultPrice,
          childPrice,
          displayAdultPrice,
          displayChildPrice,
        });

        totalDisplayPrice += displayAdultPrice * booking.adults + displayChildPrice * booking.children;
      }
    });

    return (
      <div className="min-h-screen bg-white font-sans text-[#1B4332]">
        <Navbar />
        <main className="py-16 px-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => setStep('datetime')}
                className="text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-lg underline mb-4"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold font-serif mb-2">Book Experience</h1>
              <p className="text-lg text-gray-600">Step 4 of 4: Select Guests</p>
            </div>

            <div className="bg-[#E8F5E9] border-2 border-[#B7E4C7] rounded-lg p-8 mb-8">
              {/* Adults */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Adults</h3>
                    <p className="text-sm text-gray-600">
                      {experiencePrices.length === 1
                        ? `${currency === 'LKR' ? 'Rs' : '$'} ${experiencePrices[0].displayAdultPrice.toLocaleString()} each`
                        : `${currency === 'LKR' ? 'Rs' : '$'} ${experiencePrices
                            .reduce((sum, e) => sum + e.displayAdultPrice, 0)
                            .toLocaleString()} total per adult`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleGuestChange('adults', -1)}
                      className="bg-white border-2 border-[#2D6A4F] text-[#2D6A4F] w-10 h-10 rounded-full hover:bg-[#f0f0f0] transition"
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold w-8 text-center">{booking.adults}</span>
                    <button
                      onClick={() => handleGuestChange('adults', 1)}
                      className="bg-[#52B788] text-white w-10 h-10 rounded-full hover:bg-[#40916c] transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Children */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Children</h3>
                    <p className="text-sm text-gray-600">
                      {experiencePrices.length === 1
                        ? `${currency === 'LKR' ? 'Rs' : '$'} ${experiencePrices[0].displayChildPrice.toLocaleString()} each`
                        : `${currency === 'LKR' ? 'Rs' : '$'} ${experiencePrices
                            .reduce((sum, e) => sum + e.displayChildPrice, 0)
                            .toLocaleString()} total per child`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleGuestChange('children', -1)}
                      className="bg-white border-2 border-[#2D6A4F] text-[#2D6A4F] w-10 h-10 rounded-full hover:bg-[#f0f0f0] transition"
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold w-8 text-center">{booking.children}</span>
                    <button
                      onClick={() => handleGuestChange('children', 1)}
                      className="bg-[#52B788] text-white w-10 h-10 rounded-full hover:bg-[#40916c] transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Breakdown */}
            <div className="bg-white border-2 border-[#B7E4C7] rounded-lg p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 text-[#2D6A4F]">Selected Experiences Pricing</h3>
              <div className="space-y-4">
                {experiencePrices.map((exp, idx) => {
                  const expTotal = exp.displayAdultPrice * booking.adults + exp.displayChildPrice * booking.children;
                  return (
                    <div key={idx} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-gray-800">{exp.name}</p>
                        <p className="font-bold text-[#2D6A4F]">
                          {currency === 'LKR' ? 'Rs' : '$'} {expTotal.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-xs text-gray-600 flex gap-4">
                        <span>Adults ({booking.adults}): ${(exp.displayAdultPrice * booking.adults).toLocaleString()}</span>
                        {booking.children > 0 && (
                          <span>Children ({booking.children}): ${(exp.displayChildPrice * booking.children).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-[#2D6A4F] to-[#52B788] text-white p-8 rounded-lg mb-8">
              <h3 className="font-bold text-xl mb-6">Booking Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Plantation:</span>
                  <span className="font-semibold">{plantation.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experiences:</span>
                  <span className="font-semibold">{booking.experiences.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-semibold">{booking.date} at {booking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-semibold">
                    {booking.adults} Adult{booking.adults !== 1 ? 's' : ''}, {booking.children} Child{booking.children !== 1 ? 'ren' : ''}
                  </span>
                </div>
              </div>
              <div className="border-t border-white pt-4">
                <div className="flex justify-between items-end">
                  <span className="text-lg">Total Price:</span>
                  <span className="text-4xl font-bold">
                    {currency === 'LKR' ? 'Rs' : '$'} {totalDisplayPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('datetime')}
                className="flex-1 border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#f0f0f0] font-semibold py-3 px-6 rounded-lg transition text-lg"
              >
                Back
              </button>
              <button
                onClick={handleConfirmBooking} // This will now open the modal
                className="flex-1 bg-[#52B788] hover:bg-[#40916c] text-white font-semibold py-3 px-6 rounded-lg transition text-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </main>
        <Footer />

        {/* Tourist Details Modal */}
        <TouristDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onSubmit={handleTouristDetailsSubmit}
        />
      </div>
    );
  }

  // New: Payment Step (or final confirmation)
  if (step === 'payment') {
    if (!touristDetails) {
      // Should not happen if flow is correct, but as a safeguard
      return <p>Error: Tourist details not available. Please go back.</p>;
    }

    // Calculate total price for all selected experiences again for display
    let totalDisplayPrice = 0;
    booking.experiences.forEach((expName) => {
      const exp = plantation.experiences.find((e: any) => e.name === expName);
      if (exp) {
        const adultPrice = exp.priceUSD.adult;
        const childPrice = exp.priceUSD.child;
        const displayAdultPrice = isLocalSriLankan ? adultPrice * USD_TO_LKR : adultPrice;
        const displayChildPrice = isLocalSriLankan ? childPrice * USD_TO_LKR : childPrice;
        totalDisplayPrice += displayAdultPrice * booking.adults + displayChildPrice * booking.children;
      }
    });

    return (
      <div className="min-h-screen bg-white font-sans text-[#1B4332]">
        <Navbar />
        <main className="py-16 px-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold font-serif mb-2">Booking Confirmation & Payment</h1>
            <p className="text-lg text-gray-600 mb-8">Final step: Review your details and proceed to payment.</p>

            {/* Booking Summary */}
            <div className="bg-[#E8F5E9] border-2 border-[#B7E4C7] rounded-lg p-8 mb-8">
              <h3 className="font-bold text-xl mb-4 text-[#2D6A4F]">Your Booking</h3>
              <div className="space-y-3">
                <p><strong>Plantation:</strong> {plantation.name}</p>
                <p><strong>Experiences:</strong> {booking.experiences.join(', ')}</p>
                <p><strong>Date & Time:</strong> {booking.date} at {booking.time}</p>
                <p><strong>Guests:</strong> {booking.adults} Adults, {booking.children} Children</p>
                <p><strong>Total Price:</strong> {currency === 'LKR' ? 'Rs' : '$'} {totalDisplayPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Tourist Details Summary */}
            <div className="bg-gradient-to-r from-[#2D6A4F] to-[#52B788] text-white p-8 rounded-lg mb-8">
              <h3 className="font-bold text-xl mb-4">Your Details</h3>
              <div className="space-y-3">
                <p><strong>Full Name:</strong> {touristDetails.fullName}</p>
                <p><strong>Email:</strong> {touristDetails.email}</p>
                <p><strong>Phone:</strong> {touristDetails.phone}</p>
                <p><strong>NIC/Passport:</strong> {touristDetails.nicPassportNumber}</p>
                <p><strong>Country:</strong> {touristDetails.country}</p>
                <p><strong>City:</strong> {touristDetails.city}</p>
              </div>
            </div>

            {/* Payment Section (Placeholder) */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-8 text-center">
              <h3 className="font-bold text-2xl mb-4 text-[#1B4332]">Proceed to Secure Payment</h3>
              <p className="text-gray-700 mb-6">
                You will be redirected to our secure payment gateway to complete your booking.
              </p>
              <button
                onClick={() => alert("Redirecting to payment gateway...")} // Placeholder for actual payment logic
                className="bg-[#52B788] hover:bg-[#40916c] text-white font-semibold py-3 px-10 rounded-lg transition text-lg"
              >
                Pay Now
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep('guests')} // Allow going back to edit guest count
                className="text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-lg underline"
              >
                ← Back to Edit Booking
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null; // Should not reach here
}