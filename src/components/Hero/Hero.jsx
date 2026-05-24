import React from 'react'
import { useNavigate } from 'react-router-dom';
import carPng from "../../assets/car/car1.png"
import yellowCarPng from "../../assets/car/yellowCar.png"

const Hero = ({ theme }) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/booking');
  };

  return (
    <div className='dark:bg-black dark:text-white duration-300 relative z-10'>
      <div className='container min-h-[620px] flex mx-auto px-4'>
        <div className='grid place-items-center grid-cols-1 sm:grid-cols-2 w-full'>
          <div data-aos="zoom-in" data-aos-duration='1500' className='order-1 sm:order-2'>
            <img 
              src={theme === "dark" ? carPng : yellowCarPng} 
              alt='car1' 
              className='relative -z-10 max-h-[300px] sm:max-h-[600px] sm:scale-125 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]'
            />
          </div>
          <div className='order-2 sm:order-1 space-y-5 sm:pr-32'>
            <p data-aos="fade-up" className='text-primary text-2xl font-serif'>Effortless</p>
            <h1 data-aos="fade-up" data-aos-delay="600" className='text-5xl lg:text-7xl font-semibold font-serif'>Car Rental</h1>
            <p data-aos="fade-up" className='text-1xl font-serif'>Your Ride, Your Way – Anytime, Anywhere.</p>
            <p data-aos="fade-up" className='text-primary text-2xl font-serif'>Looking for a hassle-free way to rent a car?.</p>
            <div data-aos="fade-up" data-aos-delay="900" className="text-gray-600 dark:text-gray-300">
              We offer a seamless car rental experience with a wide range of luxury, economy, and family vehicles at unbeatable prices.
              <ul className="mt-2 space-y-1">
                <li>✔️ Instant booking confirmation</li>
                <li>✔️ 24/7 customer support</li>
                <li>✔️ Flexible rental plans</li>
                <li>✔️ Well-maintained, sanitized cars</li>
              </ul>
            </div>
            <button 
              data-aos="fade-up"
              data-aos-duration="1500"
              className='btn bg-primary text-black px-6 py-2 rounded-md hover:bg-primary/80 duration-300 cursor-pointer font-medium' 
              onClick={handleGetStarted}
              type="button"
              style={{ zIndex: 9999, position: 'relative' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero