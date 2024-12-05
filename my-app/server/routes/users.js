import express from "express";
import db from "../db/connection.js";

const router = express.Router();


router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    console.log('Request received:', { username, password });
  
    if (!username || !password) {
      console.error('Missing username or password');
      return res.status(400).json({ message: 'Username and password are required.' });
    }
  
    try {
      const collection = await db.collection('users');
  
      // Check if the username already exists
      const existingUser = await collection.findOne({ username });
      if (existingUser) {
        console.error('Username already exists:', username);
        return res.status(409).json({ message: 'Username already exists.' });
      }
  
      // Insert the user into the database
      const result = await collection.insertOne({ username, password });
      console.log('User created successfully:', result);
      res.status(201).json({ message: 'User created successfully', result });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ message: 'Failed to create user', error: err });
    }
  });

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during login" });
  }
});

// Endpoint to update user data
router.post('/edit', async (req, res) => {
  const { height, weight, goals } = req.body;

  if (!height || !weight || !goals) {
    return res.status(400).json({ message: 'Height, weight, and goals are required.' });
  }

  try {
    const collection = await db.collection('users');
    
    // Example: Update the current user's data (you might use a user identifier in a real app)
    const result = await collection.updateOne(
      { username: req.body.username }, // Use a unique identifier like username or user ID
      { $set: { height, weight, goals } },
      { upsert: true } // Creates a document if it doesn't exist
    );

    res.status(200).json({ message: 'User data updated successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user data', error: err });
  }
});

// Get user data (goals)
router.get('/goals', async (req, res) => {
  try {
    const{username} = req.query;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    const collection = await db.collection('users');
    const user = await collection.findOne({username}); // Retrieve user (you might need a more specific query)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user ? user.goals : []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user goals', error: err });
  }
});



export default router;