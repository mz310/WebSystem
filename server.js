const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());
let users = [
  { id: 1, username: 'zorigt', password: '123' },
];

let places = [];

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});
// User signup
app.post('/api/users/signup', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// User login
app.post('/api/users/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get places for a specific user
app.get('/api/places/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userPlaces = places.filter((place) => place.userId === userId);
  res.json(userPlaces);
});


app.post('/api/places', (req, res) => {
    const { userId, name, location, image, description } = req.body;
    const newPlace = { id: Date.now(), userId, name, location, image, description };
    places.push(newPlace);
    console.log('New place added:', newPlace); 
    res.status(201).json({ message: 'Place added successfully', place: newPlace });
  });
app.get('/api/places/:placeId', (req, res) => {
  const placeId = parseInt(req.params.placeId);
  const place = places.find((p) => p.id === placeId);

  if (place) {
    res.json(place);
  } else {
    res.status(404).json({ message: 'Place not found' });
  }
});

// Update a specific place
app.put('/api/places/:placeId', (req, res) => {
  const placeId = parseInt(req.params.placeId);
  const { name, location, image, description } = req.body;
  const place = places.find((p) => p.id === placeId);

  if (place) {
    place.name = name || place.name;
    place.location = location || place.location;
    place.image = image || place.image; // Update image if provided
    place.description = description || place.description;
    res.json({ message: 'Place updated successfully', place });
  } else {
    res.status(404).json({ message: 'Place not found' });
  }
});

// Delete a specific place
app.delete('/api/places/:placeId', (req, res) => {
  const placeId = parseInt(req.params.placeId);
  const placeIndex = places.findIndex((p) => p.id === placeId);
  
  if (placeIndex !== -1) {
    places.splice(placeIndex, 1);
    res.json({ message: 'Place deleted successfully' });
  } else {
    res.status(404).json({ message: 'Place not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
