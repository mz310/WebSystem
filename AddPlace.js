import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const AddPlace = () => {
  const { userId } = useContext(AuthContext); 
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddPlace = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          name,
          location,
          image,
          description,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || 'Place added successfully!');
        setName('');
        setLocation('');
        setImage('');
        setDescription('');
        setTimeout(() => navigate('/'), 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to add place');
      }
    } catch (error) {
      setMessage('An error occurred while adding the place');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Add New Place
        </h2>
        <form onSubmit={handleAddPlace} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Place Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter place name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full p-3 h-32 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-medium p-3 rounded-lg hover:bg-blue-600 transition duration-200 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Adding Place...' : 'Add Place'}
          </button>

          {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddPlace;
