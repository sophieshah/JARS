import React, {useState, useEffect} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

function Dashboard() {

  const [dailyCalories, setDailyCalories] = useState(0);

  useEffect(() => {
    // Retrieve food entries from localStorage
    const foodInfo = JSON.parse(localStorage.getItem('foodInfo')) || [];

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Filter and sum calories for the current day
    const caloriesForToday = foodInfo
      .filter((entry) => entry.date === today) // Match today's date
      .reduce((total, entry) => total + parseInt(entry.calories, 10), 0); // Sum up calories

    setDailyCalories(caloriesForToday); // Update state
  }, []);

  // Prepare the chart data
  const foodData = {
    labels: ['Food Consumed', 'Food Remaining'],
    datasets: [
      {
        label: 'Daily Food',
        data: [dailyCalories, Math.max(0, 2000 - dailyCalories)], // Assuming 2000-calorie daily goal
        backgroundColor: ['#5CA904', '#E0E0E0'],
        hoverOffset: 4,
      },
    ],
  };

  const [dailyOunces, setDailyOunces] = useState(0);

  useEffect(() => {
    // Retrieve food entries from localStorage
    const waterInfo = JSON.parse(localStorage.getItem('waterInfo')) || [];

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Filter and sum calories for the current day
    const ouncesForToday = waterInfo
      .filter((entry) => entry.date === today) // Match today's date
      .reduce((total, entry) => total + parseInt(entry.ounces, 10), 0); // Sum up calories

    setDailyOunces(ouncesForToday); // Update state
  }, []);

  // Prepare the chart data
  const waterData = {
    labels: ['Water Consumed', 'Water Remaining'],
    datasets: [
      {
        label: 'Daily Water',
        data: [dailyOunces, Math.max(0, 100 - dailyOunces)], // Assuming 2000-calorie daily goal
        backgroundColor: ['#36A2EB', '#E0E0E0'],
        hoverOffset: 4,
      },
    ],
  };

  const [weeklyFoodData, setWeeklyFoodData] = useState({
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Weekly Food Consumption',
        data: Array(7).fill(0), // Initialize with zeros
        borderColor: '#5CA904',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Fetch all food entries from localStorage
    const foodInfo = JSON.parse(localStorage.getItem('foodInfo')) || [];

    if (foodInfo.length > 0) {
      // Aggregate calories for each weekday
      const weeklyCalories = Array(7).fill(0); // [Mon, Tue, ..., Sun]
      foodInfo.forEach((entry) => {
        const date = new Date(entry.date);
        const dayIndex = (date.getDay()); // Adjust 0 (Sun) to 6 and so on for Mon-Sun
        weeklyCalories[dayIndex] += parseInt(entry.calories, 10);
      });

      // Update the chart data
      setWeeklyFoodData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: weeklyCalories,
          },
        ],
      }));
    }
  }, []);

  const [weeklyWaterData, setWeeklyWaterData] = useState({
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Weekly Water Consumption',
        data: Array(7).fill(0), // Initialize with zeros
        borderColor: '#36A2EB',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Fetch all food entries from localStorage
    const waterInfo = JSON.parse(localStorage.getItem('waterInfo')) || [];

    if (waterInfo.length > 0) {
      // Aggregate calories for each weekday
      const weeklyCalories = Array(7).fill(0); // [Mon, Tue, ..., Sun]
      waterInfo.forEach((entry) => {
        const date = new Date(entry.date);
        const dayIndex = (date.getDay()); // Adjust 0 (Sun) to 6 and so on for Mon-Sun
        weeklyCalories[dayIndex] += parseInt(entry.ounces, 10);
      });

      // Update the chart data
      setWeeklyWaterData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: weeklyCalories,
          },
        ],
      }));
    }
  }, []);

  return (
    <div className="Dashboard">
      <header className="App-header">
        <h1>Welcome to the dashboard.</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          {/* Food Pie Chart */}
          <div style={{ width: '300px' }}>
            <h3>Daily Food</h3>
            <Pie data={foodData} />
          </div>

          {/* Water Pie Chart */}
          <div style={{ width: '300px' }}>
            <h3>Daily Water</h3>
            <Pie data={waterData} />
          </div>
        </div>

        <br/>

        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '30px' }}>
          <div style={{ width: '45%' }}>
            <h2>Weekly Food</h2>
            <Line data={weeklyFoodData} />
          </div>

          <div style={{ width: '45%' }}>
            <h2>Weekly Water</h2>
            <Line data={weeklyWaterData} />
          </div>
        </div>
        <br/>
        <h2>Goals and Recommendations</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', width: '100%' }}>
          <div style={{ width: '33%', textAlign: 'center' }}>
            <h3>Goal 1:</h3>
            <p>Lose weight</p>
            <h4>Recommendation:</h4>
            <p>Lose weight</p>
          </div>
          <div style={{ width: '33%', textAlign: 'center' }}>
            <h3>Goal 2:</h3>
            <p>Exercise daily</p>
            <h4>Recommendation:</h4>
            <p>Lose weight</p>
          </div>
          <div style={{ width: '33%', textAlign: 'center' }}>
            <h3>Goal 3:</h3>
            <p>Drink 8 cups of water</p>
            <h4>Recommendation:</h4>
            <p>Lose weight</p>
          </div>
        </div>
        <br/>
      </header>
    </div>
  );
}

export default Dashboard;
