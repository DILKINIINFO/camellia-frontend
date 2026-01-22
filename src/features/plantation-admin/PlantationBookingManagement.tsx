import { useState, useEffect } from 'react';
import { CalendarCheck, User, Package, DollarSign, Filter } from 'lucide-react';

// Mock booking data (similar to what's used in Dashboard, but we'll filter by plantationId)
interface Booking {
  id: string;
  bookingReference: string;
  plantationName: string;
  plantationId: string; // Added to easily filter
  date: string;
  time: string;
  guests: string; // e.g., "2 Adults, 1 Child"
  experiences: string[];
  totalPaid: string; // e.g., "$50" or "Rs 16500"
  status: 'upcoming' | 'completed' | 'cancelled'; // Added cancelled status for management
  touristDetails: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
  };
}

// Mock ALL bookings for demonstration
const MOCK_ALL_BOOKINGS: Booking[] = [
  {
    id: 'CAM-556',
    bookingReference: 'CAM-556',
    plantationName: 'Pedro Tea Estate',
    plantationId: '1',
    date: '2025-11-17', // Use standard date format for sorting
    time: '11:00 AM',
    guests: '1 Adult',
    experiences: ['Tea Factory Tour', 'Tea Tasting'],
    totalPaid: '$25',
    status: 'upcoming',
    touristDetails: { fullName: 'Alice Wonderland', email: 'alice@example.com', phone: '123-456-7890', country: 'United States' }
  },
  {
    id: 'CAM-557',
    bookingReference: 'CAM-557',
    plantationName: 'Pedro Tea Estate',
    plantationId: '1',
    date: '2025-11-18',
    time: '09:00 AM',
    guests: '2 Adults, 2 Children',
    experiences: ['Tea Leaf Picking', 'Picnic Lunch'],
    totalPaid: 'Rs 33000',
    status: 'upcoming',
    touristDetails: { fullName: 'Nimal Perera', email: 'nimal@example.lk', phone: '077-123-4567', country: 'Sri Lanka' }
  },
  {
    id: 'CAM-456',
    bookingReference: 'CAM-456',
    plantationName: 'Pedro Tea Estate',
    plantationId: '1',
    date: '2024-10-15',
    time: '09:00 AM',
    guests: '2 Adults',
    experiences: ['Tea Factory Tour'],
    totalPaid: '$35',
    status: 'completed',
    touristDetails: { fullName: 'Bob Johnson', email: 'bob@example.com', phone: '987-654-3210', country: 'Canada' }
  },
  {
    id: 'CAM-457',
    bookingReference: 'CAM-457',
    plantationName: 'Bluefield Tea Garden',
    plantationId: '2',
    date: '2024-09-10',
    time: '01:00 PM',
    guests: '1 Adult, 1 Child',
    experiences: ['Waterfall Trek'],
    totalPaid: '$62',
    status: 'completed',
    touristDetails: { fullName: 'Charlie Green', email: 'charlie@example.com', phone: '555-123-4567', country: 'Australia' }
  },
  {
    id: 'CAM-458',
    bookingReference: 'CAM-458',
    plantationName: 'Haputale Estate',
    plantationId: '3',
    date: '2024-08-21',
    time: '10:00 AM',
    guests: '2 Adults',
    experiences: ['Heritage Tour'],
    totalPaid: '$76',
    status: 'completed',
    touristDetails: { fullName: 'David Lee', email: 'david@example.com', phone: '111-222-3333', country: 'Germany' }
  },
  {
    id: 'CAM-558',
    bookingReference: 'CAM-558',
    plantationName: 'Pedro Tea Estate',
    plantationId: '1',
    date: '2025-12-01',
    time: '10:00 AM',
    guests: '3 Adults',
    experiences: ['Hiking'],
    totalPaid: '$150',
    status: 'upcoming',
    touristDetails: { fullName: 'Eva Brown', email: 'eva@example.com', phone: '444-555-6666', country: 'United Kingdom' }
  },
  {
    id: 'CAM-459',
    bookingReference: 'CAM-459',
    plantationName: 'Pedro Tea Estate',
    plantationId: '1',
    date: '2024-07-05',
    time: '02:00 PM',
    guests: '1 Adult',
    experiences: ['Tea Tasting'],
    totalPaid: '$25',
    status: 'completed',
    touristDetails: { fullName: 'Frank White', email: 'frank@example.com', phone: '777-888-9999', country: 'France' }
  },
  {
    id: 'CAM-460',
    bookingReference: 'CAM-460',
    plantationName: 'Pedro Tea Estate',
    plantationId: '1',
    date: '2024-06-20',
    time: '10:00 AM',
    guests: '2 Adults',
    experiences: ['Tea Factory Tour'],
    totalPaid: '$70',
    status: 'cancelled',
    touristDetails: { fullName: 'Grace Black', email: 'grace@example.com', phone: '000-111-2222', country: 'Spain' }
  },
];


interface PlantationBookingManagementProps {
  plantationId: string;
}

// Helper to format date for display
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error("Invalid date string:", dateString);
    return dateString; // Fallback
  }
};

export default function PlantationBookingManagement({ plantationId }: PlantationBookingManagementProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sort by date
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulate fetching bookings for the specific plantation
    setIsLoading(true);
    setMessage('');
    setTimeout(() => {
      const filteredBookings = MOCK_ALL_BOOKINGS.filter(
        (booking) => booking.plantationId === plantationId
      );
      setBookings(filteredBookings);
      setIsLoading(false);
    }, 1000);
  }, [plantationId]);

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    setIsLoading(true);
    setMessage('');
    // Simulate API call to update booking status
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    setMessage(`Booking ${bookingId} status updated to ${newStatus}.`);
    setIsLoading(false);
  };

  const getFilteredAndSortedBookings = () => {
    let filtered = bookings;
    if (filterStatus !== 'all') {
      filtered = bookings.filter((b) => b.status === filterStatus);
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const displayedBookings = getFilteredAndSortedBookings();

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Manage Bookings</h2>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6">
          {message}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading bookings...</p>
        </div>
      ) : (
        <>
          {/* Filters and Sorting */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <label htmlFor="statusFilter" className="font-semibold text-gray-700">Filter by Status:</label>
              <select
                id="statusFilter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              >
                <option value="all">All</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sortOrder" className="font-semibold text-gray-700">Sort by Date:</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              >
                <option value="asc">Oldest First</option>
                <option value="desc">Newest First</option>
              </select>
            </div>
          </div>

          {displayedBookings.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">No bookings found for this plantation with the current filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBookings.map((booking) => (
                <div key={booking.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#2D6A4F]">{booking.bookingReference}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center gap-2"><CalendarCheck size={18} className="text-gray-500" />
                      <span className="font-semibold">{formatDate(booking.date)} at {booking.time}</span>
                    </p>
                    <p className="flex items-center gap-2"><User size={18} className="text-gray-500" />
                      <span className="font-semibold">{booking.guests}</span>
                    </p>
                    <p className="flex items-center gap-2"><Package size={18} className="text-gray-500" />
                      <span className="text-sm">{booking.experiences.join(', ')}</span>
                    </p>
                    <p className="flex items-center gap-2"><DollarSign size={18} className="text-gray-500" />
                      <span className="font-bold text-[#1B4332]">{booking.totalPaid}</span>
                    </p>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <p className="font-semibold text-sm">Tourist: {booking.touristDetails.fullName}</p>
                      <p className="text-xs text-gray-500">{booking.touristDetails.email}</p>
                      <p className="text-xs text-gray-500">{booking.touristDetails.phone}</p>
                      <p className="text-xs text-gray-500">{booking.touristDetails.country}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {booking.status === 'upcoming' && (
                      <button
                        onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg transition"
                      >
                        Mark Completed
                      </button>
                    )}
                    {(booking.status === 'upcoming' || booking.status === 'completed') && (
                       <button
                       onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                       className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition"
                     >
                       Cancel Booking
                     </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}