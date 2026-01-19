import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/tourist/LandingPage';
import Plantations from './features/tourist/Plantations';
import About from './features/tourist/About';
import Contact from './features/tourist/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plantations" element={<Plantations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;