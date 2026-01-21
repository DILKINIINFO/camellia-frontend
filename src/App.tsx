
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/tourist/LandingPage';
import Plantations from './features/tourist/Plantations';
import PlantationDetail from './features/tourist/PlantationDetail';
import PlantationReviews from './features/tourist/PlantationReviews';
import BookingsPage from './features/tourist/BookingsPage';
import About from './features/tourist/About';
import Contact from './features/tourist/Contact';
import Dashboard from './features/tourist/Dashboard';
import PaymentPage from './features/tourist/PaymentPage'; // Import the new PaymentPage
import BookingConfirmationPage from './features/tourist/BookingConfirmationPage'; // Import the new BookingConfirmationPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plantations" element={<Plantations />} />
        <Route path="/plantation/:id" element={<PlantationDetail />} />
        <Route path="/plantation/:id/reviews" element={<PlantationReviews />} />
        <Route path="/plantation/:id/booking" element={<BookingsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<PaymentPage />} /> {/* Add PaymentPage route */}
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} /> {/* Add BookingConfirmationPage route */}
      </Routes>
    </Router>
  );
}

export default App;
