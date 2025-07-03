import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Use environment variable for API URL, fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cars`);
        const data = await response.json();
        if (response.ok) {
          setCars(data);
        } else {
          setError('Failed to fetch cars');
        }
      } catch (error) {
        setError('Error loading cars');
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className='pb-24 pt-12 bg-white dark:bg-dark dark:text-white'>
        <div className="container">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading cars...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='pb-24 pt-12 bg-white dark:bg-dark dark:text-white'>
        <div className="container">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='pb-24 pt-12 bg-white dark:bg-dark dark:text-white'>
      <div className="container">
        {/*heading*/}
        <h1 className='text-3xl sm:text-4xl font-semibold font-serif mb-3'>
          Our Premium Car Collection
        </h1>
        <p
          data-aos="right"
          className='text-sm pb-10'>
          Choose from our wide selection of premium vehicles for your perfect journey
        </p>
        
        {/*CarListing cards*/}
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {cars.map((car, index) => (
              <div
                key={car._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className='space-y-3 border-2 border-gray-300 hover:border-primary p-4 rounded-xl relative group bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <div className='w-full h-[160px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden'>
                  {car.image ? (
                    <img
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="hidden items-center justify-center text-gray-500 text-lg font-medium">
                    {car.brand} {car.model}
                  </div>
                </div>
                
                <div className='space-y-2'>
                  <h1 className='text-primary font-semibold text-lg'>
                    {car.brand} {car.model}
                  </h1>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    {car.year} • {car.description?.substring(0, 50)}...
                  </p>
                  
                  <div className='flex justify-between items-center text-xl font-semibold'>
                    <p className='text-green-600'>${car.pricePerDay}/Day</p>
                    <Link 
                      to="/booking" 
                      className='text-blue-600 hover:text-blue-800 transition-colors duration-200'
                    >
                      Book Now
                    </Link>
                  </div>
                  
                  {car.features && car.features.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {car.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'>
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {car.available ? (
                  <span className='absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded'>
                    Available
                  </span>
                ) : (
                  <span className='absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded'>
                    Booked
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* end of car listing cards */}
        <div className='grid place-content-center mt-12'>
          <Link to="/booking">
            <button 
              data-aos="right" 
              className="button-outline hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Book Your Car Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarList;