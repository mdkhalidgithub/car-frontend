import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingAPI } from '../../services/api';

const ManageBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await bookingAPI.getMyBookings();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated()) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setError('');
    setSuccess('');
    try {
      await bookingAPI.cancel(bookingId);
      setSuccess('Booking cancelled successfully.');
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to manage your bookings.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white font-serif">My Bookings</h1>
        
        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-950/50 border dark:border-gray-800 p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-lg mb-2 text-gray-800 dark:text-white border-b dark:border-gray-800 pb-1">User Information</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">Name: <span className="font-medium text-gray-900 dark:text-white">{user?.name || 'N/A'}</span></div>
            <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">Email: <span className="font-medium text-gray-900 dark:text-white">{user?.email || 'N/A'}</span></div>
            {user?.username && (
              <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">Username: <span className="font-medium text-gray-900 dark:text-white">{user.username}</span></div>
            )}
            <div className="text-gray-700 dark:text-gray-300 text-sm">User ID: <span className="font-medium text-gray-900 dark:text-white">{user?.id || user?._id || 'N/A'}</span></div>
          </div>
        </div>

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
        
        {loading ? (
          <div className="text-center text-lg text-gray-600 dark:text-gray-400">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 font-medium text-lg py-12">No bookings found.</div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 border dark:border-gray-800 p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{booking.car?.brand} {booking.car?.model} ({booking.car?.year})</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">From: <span className="font-medium text-gray-900 dark:text-white">{new Date(booking.startDate).toLocaleDateString()}</span> To: <span className="font-medium text-gray-900 dark:text-white">{new Date(booking.endDate).toLocaleDateString()}</span></div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">Pickup: {booking.pickupLocation || 'N/A'} | Return: {booking.returnLocation || 'N/A'}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">Total Price: <span className="font-medium text-gray-900 dark:text-white">${booking.totalPrice}</span></div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">Status: <span className={booking.status === 'cancelled' ? 'text-red-500 font-bold' : 'text-green-600 dark:text-green-500 font-bold'}>{booking.status || 'active'}</span></div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition font-semibold"
                    onClick={() => handleCancel(booking._id)}
                    disabled={booking.status === 'cancelled'}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;