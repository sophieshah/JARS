import React from 'react';
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
  const foodData = {
    labels: ['Food Consumed', 'Food Remaining'],
    datasets: [
      {
        label: 'Daily Food',
        data: [50, 50],
        backgroundColor: ['#5CA904', '#E0E0E0'],
        hoverOffset: 4,
      },
    ],
  };

  const waterData = {
    labels: ['Water Drank', 'Water Remaining'],
    datasets: [
      {
        label: 'Daily Water',
        data: [80, 20],
        backgroundColor: ['#36A2EB', '#E0E0E0'],
        hoverOffset: 4,
      },
    ],
  };

  const monthlyFoodData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Food Consumption',
        data: [200, 180, 220, 210, 240, 230, 220, 250, 260, 230, 220, 240], // Example data points
        borderColor: '#5CA904',
        fill: true,
      },
    ],
  };

  const monthlyWaterData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Water Consumption',
        data: [300, 320, 310, 330, 340, 335, 345, 355, 360, 345, 335, 340], // Example data points
        borderColor: '#36A2EB',
        fill: true,
      },
    ],
  };

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
            <h2>Monthly Food</h2>
            <Line data={monthlyFoodData} />
          </div>

          <div style={{ width: '45%' }}>
            <h2>Monthly Water</h2>
            <Line data={monthlyWaterData} />
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
