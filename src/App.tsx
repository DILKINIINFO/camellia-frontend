import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/tourist/LandingPage';
import Plantations from './features/tourist/Plantations';
import PlantationDetail from './features/tourist/PlantationDetail';
import PlantationReviews from './features/tourist/PlantationReviews';
import About from './features/tourist/About';
import Contact from './features/tourist/Contact';
import Dashboard from './features/tourist/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plantations" element={<Plantations />} />
        <Route path="/plantation/:id" element={<PlantationDetail />} />
        <Route path="/plantation/:id/reviews" element={<PlantationReviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;