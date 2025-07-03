import { useEffect,  } from 'react'
import React from 'react'
import Navbar from './components/Navigation/Navbar'
import Hero from './components/Hero/Hero';
import AOS from 'aos';
import "aos/dist/aos.css";
import About from './components/About/About';
import Services from './components/Services/Services';
import CarList from './components/CarList/CarList.jsx';
import Testimonial from './components/Testimonial/Testimonial.jsx';
import AppStoreBanner from './components/AppStoreBanner/AppStoreBanner.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup';
import Booking from './components/Booking/Booking.jsx';
import { AuthProvider } from './context/AuthContext';
import ManageBookings from './components/Booking/ManageBookings.jsx';

const App = () => {

  //Dark-Mode Feature---
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme")?
  localStorage.getItem("theme"): "light"
); 

const element = document.documentElement;
useEffect(()=>{
  if(theme=== "dark"){
    element.classList.add("dark");
    localStorage.setItem("theme","dark");
  }else{
     element.classList.remove("dark");
    localStorage.setItem("theme","light");

  }
},[theme]);

//AOS Initialization
React.useEffect(()=>{
  AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
});
AOS.refresh();
},[]);
  return (
  <AuthProvider>
    <Router>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-bookings" element={<ManageBookings />} />
        <Route path="/" element={
          <>
            <Hero theme={theme}/>
            <About/>
            <Services/>
            <CarList/>
            <Testimonial/>
            <div className='dark:bg-black'>
              <AppStoreBanner/>
            </div>
            <Contact/>
          </>
        } />
      </Routes>
      <Footer/>
    </Router>
  </AuthProvider>
  )
}

export default App