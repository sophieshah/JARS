import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

// Add food entry
router.post('/add', async (req, res) => {
  const { date, time, calories, description, username } = req.body;

  if (!date || !time || !calories || !description || !username) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const collection = await db.collection('foodEntries');
    const result = await collection.insertOne({ date, time, calories, description, username });
    res.status(201).json({ message: 'Food entry added successfully', result });
  } catch (err) {
    console.error('Error adding food entry:', err);
    res.status(500).json({ message: 'Failed to add food entry', error: err });
  }
});

// Get food entries for today
router.get('/today', async (req, res) => {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
    try {
      const collection = await db.collection('foodEntries');
      const todaysEntries = await collection.find({ username, date: today }).toArray();
      res.status(200).json(todaysEntries);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch food entries', error: err });
    }
  });

export default router;