import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// import components
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Itinerary from './components/TravelPlanner';
import ItineraryList from './components/SavedItinerarys'

// import usecontext
import { useAuth } from './context/AuthContext';

function App() {
  return (
    <div className="App">
    
    <Router>
      <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/saved" element={<ItineraryList />} />

        </Routes>
    </Router>
    </div>

  );
}

export default App;
