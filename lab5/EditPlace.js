import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPlace = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the place details for editing
    fetch(`/api/places/${placeId}`)
      .then((response) => response.json())
      .then((data) => {
        setPlace(data);
        setName(data.name);
        setLocation(data.location);
        setImage(data.image);
        setDescription(data.description);
      })
      .catch((err) => setError('Failed to load place data.'));
  }, [placeId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    fetch(`/api/places/${placeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location, image, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Place updated successfully') {
          navigate(`/user-places/${place.userId}`);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => setError('Failed to update place.'));
  };

  if (!place) return <p>Loading place details...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Place</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Place Name"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Location"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Image URL"
        />
        <div className="my-4">
          {image && (
            <img
              src={image}
              alt="Place preview"
              className="w-full h-40 object-cover rounded"
            />
          )}
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Description"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Place
        </button>
      </form>
    </div>
  );
};

export default EditPlace;
