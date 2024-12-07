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

router.get('/today', async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Get current date and time
  const now = new Date();

  // Adjust to Eastern Time (UTC-5 or UTC-4 during Daylight Saving Time)
  const easternOffset = -5; // Standard time offset
  const isDST = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }).includes('PM');
  const offsetHours = isDST ? easternOffset - 1 : easternOffset;

  const easternDate = new Date(now.getTime() + offsetHours * 60 * 60 * 1000);
  const today = easternDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  console.log('Today (Eastern Time):', today); // Debug log

  try {
    const collection = await db.collection('foodEntries');
    const todaysEntries = await collection.find({ username, date: today }).toArray(); // Filter by username and date
    console.log('Food entries for today:', todaysEntries); // Debug log
    res.status(200).json(todaysEntries);
  } catch (err) {
    console.error('Error fetching food entries:', err);
    res.status(500).json({ message: 'Failed to fetch food entries', error: err });
  }
});

router.get('/week', async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const collection = await db.collection('foodEntries');
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of the week (Sunday)
    const weekStartStr = weekStart.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    const foodEntries = await collection
      .find({ username, date: { $gte: weekStartStr } })
      .toArray();
    res.status(200).json(foodEntries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch weekly food data', error: err });
  }
});

export default router;