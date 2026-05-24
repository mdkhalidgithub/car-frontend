import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { carAPI, bookingAPI } from '../../services/api';

const Booking = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [bookingData, setBookingData] = useState({
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
    additionalServices: [],
    mobileNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch available cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carAPI.getAll();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service) => {
    setBookingData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      setError('Please login to book a car');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (!selectedCar) {
      setError('Please select a car');
      return;
    }

    if (!bookingData.pickupDate || !bookingData.returnDate) {
      setError('Please select pickup and return dates');
      return;
    }

    if (new Date(bookingData.pickupDate) >= new Date(bookingData.returnDate)) {
      setError('Return date must be after pickup date');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Calculate total price
      const selectedCarData = cars.find(car => car._id === selectedCar);
      if (!selectedCarData) {
        throw new Error('Selected car not found');
      }

      const startDate = new Date(bookingData.pickupDate);
      const endDate = new Date(bookingData.returnDate);
      const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = daysDiff * selectedCarData.pricePerDay;

      const data = await bookingAPI.create({
        user: user.id || user._id, // Support different user ID formats
        car: selectedCar,
        startDate: bookingData.pickupDate,
        endDate: bookingData.returnDate,
        totalPrice: totalPrice,
        pickupLocation: bookingData.pickupLocation,
        returnLocation: bookingData.returnLocation,
        additionalServices: bookingData.additionalServices,
        mobileNumber: bookingData.mobileNumber
      });

      setSuccess(`Booking created successfully! Total price: $${totalPrice} for ${daysDiff} day(s). Confirmation emails have been sent to your email and our admin team.`);
      setBookingData({
        pickupDate: '',
        returnDate: '',
        pickupLocation: '',
        returnLocation: '',
        additionalServices: [],
        mobileNumber: ''
      });
      setSelectedCar('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedCar || !bookingData.pickupDate || !bookingData.returnDate) {
      return 0;
    }

    const selectedCarData = cars.find(car => car._id === selectedCar);
    if (!selectedCarData) return 0;

    const startDate = new Date(bookingData.pickupDate);
    const endDate = new Date(bookingData.returnDate);
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 0) return 0;
    
    return daysDiff * selectedCarData.pricePerDay;
  };

  const totalPrice = calculateTotalPrice();
  const daysDiff = bookingData.pickupDate && bookingData.returnDate 
    ? Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24))
    : 0;
  const selectedCarData = cars.find(car => car._id === selectedCar);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white font-serif">Book Your Car</h1>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-950/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 dark:bg-green-950/50 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 border dark:border-gray-800 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Car Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Car *
                </label>
                <select
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                  required
                >
                  <option value="" className="bg-white dark:bg-gray-900">Choose a car</option>
                  {cars.map((car) => (
                    <option key={car._id} value={car._id} className="bg-white dark:bg-gray-900">
                      {car.brand} {car.model} ({car.year}) - ${car.pricePerDay}/day
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={bookingData.pickupDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-white [color-scheme:light_dark]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={bookingData.returnDate}
                    onChange={handleInputChange}
                    min={bookingData.pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-white [color-scheme:light_dark]"
                    required
                  />
                </div>
              </div>

              {/* Location Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={bookingData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Enter pickup location"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Return Location
                  </label>
                  <input
                    type="text"
                    name="returnLocation"
                    value={bookingData.returnLocation}
                    onChange={handleInputChange}
                    placeholder="Enter return location"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Additional Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Additional Services
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['GPS Navigation', 'Child Seat', 'Insurance', 'Fuel Service'].map((service) => (
                    <label key={service} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingData.additionalServices.includes(service)}
                        onChange={() => handleServiceChange(service)}
                        className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={bookingData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                {/* Price Calculation Display */}
                {selectedCarData && totalPrice > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Price Calculation</h3>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Car:</span>
                        <span className="font-medium text-gray-800 dark:text-white">{selectedCarData.brand} {selectedCarData.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Rate:</span>
                        <span className="font-medium text-gray-800 dark:text-white">${selectedCarData.pricePerDay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium text-gray-800 dark:text-white">{daysDiff} day(s)</span>
                      </div>
                      <div className="border-t dark:border-gray-700 pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold text-blue-600 dark:text-blue-400">
                          <span>Total Price:</span>
                          <span>${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !selectedCar || !bookingData.pickupDate || !bookingData.returnDate}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition duration-200 font-medium"
                >
                  {loading ? 'Creating Booking...' : 'Book Now'}
                </button>
              </div>
            </form>
          </div>

          {/* Available Cars Preview */}
          {cars.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white font-serif">Available Cars</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <div key={car._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md border dark:border-gray-800 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-950 transition-shadow duration-300">
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative">
                      {car.image ? (
                        <img 
                          src={car.image} 
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="hidden absolute inset-0 items-center justify-center text-gray-500 dark:text-gray-300 text-lg font-medium bg-gray-200 dark:bg-gray-800">
                        {car.brand} {car.model}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{car.year}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">${car.pricePerDay}/day</p>
                      <p className="text-gray-500 dark:text-gray-300 text-sm mb-3 line-clamp-2">{car.description}</p>
                      {car.features && car.features.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {car.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                          {car.features.length > 3 && (
                            <span className="text-gray-500 dark:text-gray-400 text-xs">+{car.features.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;