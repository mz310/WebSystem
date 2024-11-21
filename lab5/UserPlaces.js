import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const UserPlaces = () => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { uid: userIdParam } = useParams();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentUserId = userIdParam || userId;

  useEffect(() => {
    if (!currentUserId) {
      navigate('/login');
      return;
    }

    fetch(`/api/places/user/${currentUserId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch places');
        return response.json();
      })
      .then((data) => {
        console.log('Fetched places:', data); // Log the fetched data for debugging
        setPlaces(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [currentUserId, navigate]);

  const handleEdit = (placeId) => {
    navigate(`/edit-place/${currentUserId}/${placeId}`);
  };

  const handleDelete = async (placeId) => {
    try {
      const response = await fetch(`/api/places/${placeId}`, { method: 'DELETE' });
      if (response.ok) {
        setPlaces(places.filter((place) => place.id !== placeId));
      } else {
        throw new Error('Failed to delete place');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">User's Places</h2>
      {places.length === 0 ? (
        <p className="text-center text-gray-500">No places available. Add your first place!</p>
      ) : (
        <ul className="space-y-4">
          {places.map((place) => (
            <li key={place.id} className="p-4 border border-gray-200 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">{place.name}</h3>
              <p className="text-gray-600">{place.location}</p>
              <img
                src={place.image || 'https://via.placeholder.com/150'} // Fallback image URL if missing
                alt={place.name}
                className="w-full h-40 object-cover my-2 rounded"
                onError={(e) => {
                  e.target.onerror = null; // Prevents looping on error
                  e.target.src = 'https://via.placeholder.com/150'; // Placeholder image on error
                  console.log('Image failed to load:', place.image); // Log if image fails
                }}
                onLoad={() => console.log('Image loaded successfully:', place.image)} // Log if image loads
              />
              <p className="text-gray-700">{place.description}</p>
              {isAuthenticated && (
                <div className="mt-4 space-x-4">
                  <button
                    onClick={() => handleEdit(place.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(place.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {isAuthenticated && (
        <button
          onClick={() => navigate('/add-place')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Place
        </button>
      )}
    </div>
  );
};

export default UserPlaces;
