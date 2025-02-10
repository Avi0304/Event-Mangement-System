import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import EventList from './pages/EventList';
import Dashboard from './pages/DashBoard';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';

const AppContent = () => {
    const location = useLocation();
    const showFooter = location.pathname !== '/dashboard';

    useEffect(() => {
        const pageTitles = {
            "/": "Eventify - Home",
            "/about": "Eventify - About Us",
            "/contact": "Eventify - Contact",
            "/events": "Eventify - Events",
            "/dashboard": "Eventify - Dashboard",
            "/login": "Eventify - Login",
            "/register": "Eventify - Register",
        };

        document.title = pageTitles[location.pathname] || "Eventify";
    }, [location.pathname]);

    return (
        <>
            <NavBar />
            <ToastContainer position='top-right' autoClose={3000}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/events" element={<EventList />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
            {showFooter && <Footer />}
        </>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent /> 
            </Router>
        </AuthProvider>
    );
}

export default App;
