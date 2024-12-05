import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

// Add water entry
router.post('/add', async (req, res) => {
  const { date, time, ounces } = req.body;

  if (!date || !time || !ounces) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const collection = await db.collection('waterEntries');
    const result = await collection.insertOne({ date, time, ounces });
    res.status(201).json({ message: 'Water entry added successfully', result });
  } catch (err) {
    console.error('Error adding water entry:', err);
    res.status(500).json({ message: 'Failed to add water entry', error: err });
  }
});

// Get water entries for today
router.get('/today', async (req, res) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
    try {
      const collection = await db.collection('waterEntries');
      const todaysEntries = await collection.find({ date: today }).toArray();
      res.status(200).json(todaysEntries);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch water entries', error: err });
    }
  });

export default router;