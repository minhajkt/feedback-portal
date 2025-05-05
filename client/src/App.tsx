import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home';
import Singup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const {user } = useAuth()

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
                <Home />
            }
          />
          <Route path="/signup" element={<Singup />} />
          <Route
            path="/admin"
            element={
                  <AdminDashboard />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App
