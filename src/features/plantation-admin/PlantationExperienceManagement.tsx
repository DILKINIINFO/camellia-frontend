import { useState } from 'react';
import { PlusCircle, Edit3, Trash2, Clock, X, DollarSign, Wallet } from 'lucide-react'; // Added Wallet icon

// Re-using types from PlantationDetail.tsx and BookExperienceModal.tsx
interface TimeSlot {
  date: string;
  time: string;
  capacity: number;
  booked: number;
}

interface Experience {
  name: string;
  category: string;
  priceUSD: { adult: number; child: number };
  priceLKR: { adult: number; child: number }; // Added LKR pricing
  timeSlots: TimeSlot[];
}

interface Plantation {
  id: string;
  name: string;
  experiences: Experience[];
}

interface PlantationExperienceManagementProps {
  plantation: Plantation;
}

// Modal for adding/editing an experience
interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (experience: Experience) => void;
  initialExperience?: Experience; // For editing
}

function ExperienceModal({ isOpen, onClose, onSubmit, initialExperience }: ExperienceModalProps) {
  const [formData, setFormData] = useState<Experience>(
    initialExperience || {
      name: '',
      category: '',
      priceUSD: { adult: 0, child: 0 },
      priceLKR: { adult: 0, child: 0 }, // Initialize LKR pricing
      timeSlots: [],
    }
  );
  const [newTimeSlot, setNewTimeSlot] = useState({ date: '', time: '', capacity: 1, booked: 0 });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'adultPriceUSD') {
      setFormData((prev) => ({ ...prev, priceUSD: { ...prev.priceUSD, adult: parseFloat(value) || 0 } }));
    } else if (name === 'childPriceUSD') {
      setFormData((prev) => ({ ...prev, priceUSD: { ...prev.priceUSD, child: parseFloat(value) || 0 } }));
    } else if (name === 'adultPriceLKR') {
      setFormData((prev) => ({ ...prev, priceLKR: { ...prev.priceLKR, adult: parseFloat(value) || 0 } }));
    } else if (name === 'childPriceLKR') {
      setFormData((prev) => ({ ...prev, priceLKR: { ...prev.priceLKR, child: parseFloat(value) || 0 } }));
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTimeSlot((prev) => ({ ...prev, [name]: name === 'capacity' || name === 'booked' ? parseInt(value) || 0 : value }));
  };

  const handleAddTimeSlot = () => {
    if (newTimeSlot.date && newTimeSlot.time && newTimeSlot.capacity > 0) {
      setFormData((prev) => ({
        ...prev,
        timeSlots: [...prev.timeSlots, newTimeSlot],
      }));
      setNewTimeSlot({ date: '', time: '', capacity: 1, booked: 0 }); // Reset form
    }
  };

  const handleRemoveTimeSlot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2D6A4F]">{initialExperience ? 'Edit Experience' : 'Add New Experience'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
              Experience Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-semibold mb-2 text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              required
            >
              <option value="">Select a Category</option>
              <option value="Tea Factory Tour & Tasting">Tea Factory Tour & Tasting</option>
              <option value="Hiking & Tea Plucking">Hiking & Tea Plucking</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          {/* Foreigner Pricing (USD) */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-[#2D6A4F] mb-4 flex items-center gap-2">
              <DollarSign size={20} /> Foreigner Pricing (USD)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="adultPriceUSD" className="block text-sm font-semibold mb-2 text-gray-700">
                  Adult Price (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="adultPriceUSD"
                  name="adultPriceUSD"
                  value={formData.priceUSD.adult}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  required
                />
              </div>
              <div>
                <label htmlFor="childPriceUSD" className="block text-sm font-semibold mb-2 text-gray-700">
                  Child Price (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="childPriceUSD"
                  name="childPriceUSD"
                  value={formData.priceUSD.child}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Local Pricing (LKR) */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-[#2D6A4F] mb-4 flex items-center gap-2">
              <Wallet size={20} /> Local Pricing (LKR)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="adultPriceLKR" className="block text-sm font-semibold mb-2 text-gray-700">
                  Adult Price (LKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="adultPriceLKR"
                  name="adultPriceLKR"
                  value={formData.priceLKR.adult}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  required
                />
              </div>
              <div>
                <label htmlFor="childPriceLKR" className="block text-sm font-semibold mb-2 text-gray-700">
                  Child Price (LKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="childPriceLKR"
                  name="childPriceLKR"
                  value={formData.priceLKR.child}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52B788]"
                  required
                />
              </div>
            </div>
          </div>


          {/* Time Slots Management */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-[#2D6A4F] mb-4 flex items-center gap-2">
              <Clock size={20} /> Manage Time Slots
            </h3>
            <div className="space-y-3 mb-6">
              {formData.timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border">
                  <span className="flex-1 font-medium">{slot.date} at {slot.time}</span>
                  <span className="text-sm text-gray-600">Capacity: {slot.capacity}</span>
                  <span className="text-sm text-gray-600">Booked: {slot.booked}</span>
                  <button type="button" onClick={() => handleRemoveTimeSlot(index)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="newDate" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="newDate"
                  name="date"
                  value={newTimeSlot.date}
                  onChange={handleTimeSlotChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="newTime" className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  id="newTime"
                  name="time"
                  value={newTimeSlot.time}
                  onChange={handleTimeSlotChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="newCapacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  id="newCapacity"
                  name="capacity"
                  value={newTimeSlot.capacity}
                  onChange={handleTimeSlotChange}
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddTimeSlot}
                  className="w-full bg-[#52B788] hover:bg-[#40916c] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <PlusCircle size={18} /> Add Slot
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              {initialExperience ? 'Save Changes' : 'Add Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default function PlantationExperienceManagement({ plantation }: PlantationExperienceManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Experience | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Local state for experiences to allow real-time editing before actual API call
  const [localExperiences, setLocalExperiences] = useState<Experience[]>(plantation.experiences);

  const handleAddExperience = () => {
    setCurrentExperience(undefined); // Clear for new addition
    setIsModalOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setCurrentExperience(experience);
    setIsModalOpen(true);
  };

  const handleSaveExperience = async (experience: Experience) => {
    setIsLoading(true);
    setMessage('');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (currentExperience) {
      // Editing existing experience
      setLocalExperiences((prev) =>
        prev.map((exp) => (exp.name === currentExperience.name ? experience : exp))
      );
      setMessage('Experience updated successfully!');
      console.log('Updated experience:', experience);
    } else {
      // Adding new experience
      setLocalExperiences((prev) => [...prev, experience]);
      setMessage('Experience added successfully!');
      console.log('Added new experience:', experience);
    }
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleDeleteExperience = async (experienceName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${experienceName}"?`)) {
      return;
    }
    setIsLoading(true);
    setMessage('');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLocalExperiences((prev) => prev.filter((exp) => exp.name !== experienceName));
    setMessage('Experience deleted successfully!');
    setIsLoading(false);
    console.log('Deleted experience:', experienceName);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#1B4332]">Manage Experiences</h2>
        <button
          onClick={handleAddExperience}
          className="bg-[#52B788] hover:bg-[#40916c] text-white font-semibold py-2 px-6 rounded-lg transition flex items-center gap-2"
        >
          <PlusCircle size={20} /> Add New Experience
        </button>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6">
          {message}
        </div>
      )}

      {localExperiences.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">No experiences added yet.</p>
          <p className="text-gray-500">Click "Add New Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {localExperiences.map((experience, index) => (
            <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[#2D6A4F]">{experience.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Category: {experience.category}</p>
                <p className="text-sm text-gray-600">Adult Price: ${experience.priceUSD.adult} (USD) / Rs {experience.priceLKR.adult} (LKR)</p>
                <p className="text-sm text-gray-600">Child Price: ${experience.priceUSD.child} (USD) / Rs {experience.priceLKR.child} (LKR)</p>
                <p className="text-sm text-gray-500">{experience.timeSlots.length} Time Slots</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEditExperience(experience)}
                  className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  title="Edit Experience"
                  disabled={isLoading}
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => handleDeleteExperience(experience.name)}
                  className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                  title="Delete Experience"
                  disabled={isLoading}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveExperience}
        initialExperience={currentExperience}
      />
    </div>
  );
}