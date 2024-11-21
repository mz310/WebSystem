// src/components/Home.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/users')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/user-places/${userId}`);
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">User List</h1>
        {users.length > 0 ? (
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className="p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              >
                {user.username}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No users available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
