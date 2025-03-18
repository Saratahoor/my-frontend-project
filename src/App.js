import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage"; // Create this later
import About from "./pages/About";
import UserDashboard from "./pages/UserDashboard"; 
import MediatorDashboard from "./pages/MediatorDashboard";
function App() {
  return (
    <Router>
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<About />} />  {/* New About Page Route */}
          <Route path="/user-dashboard" element={<UserDashboard />} /> 
          <Route path="/mediator-dashboard" element={<MediatorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
