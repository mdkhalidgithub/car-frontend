import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/bookings/my-bookings`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch bookings');
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to cancel booking');
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">My Bookings</h1>
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-lg mb-1">User Information</div>
            <div className="text-gray-700 text-sm mb-1">Name: <span className="font-medium">{user?.name || 'N/A'}</span></div>
            <div className="text-gray-700 text-sm mb-1">Email: <span className="font-medium">{user?.email || 'N/A'}</span></div>
            {user?.username && (
              <div className="text-gray-700 text-sm mb-1">Username: <span className="font-medium">{user.username}</span></div>
            )}
            <div className="text-gray-700 text-sm">User ID: <span className="font-medium">{user?.id || user?._id || 'N/A'}</span></div>
          </div>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">{success}</div>}
        {loading ? (
          <div className="text-center text-lg">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-600">No bookings found.</div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-lg mb-2">{booking.car?.brand} {booking.car?.model} ({booking.car?.year})</div>
                  <div className="text-gray-600 text-sm mb-1">From: <span className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</span> To: <span className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</span></div>
                  <div className="text-gray-600 text-sm mb-1">Pickup: {booking.pickupLocation || 'N/A'} | Return: {booking.returnLocation || 'N/A'}</div>
                  <div className="text-gray-600 text-sm mb-1">Total Price: <span className="font-medium">${booking.totalPrice}</span></div>
                  <div className="text-gray-600 text-sm mb-1">Status: <span className={booking.status === 'cancelled' ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>{booking.status || 'active'}</span></div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
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