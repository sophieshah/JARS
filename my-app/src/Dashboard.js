import React, { useState, useEffect } from 'react';
import './App.css';
import { Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
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
  const [dailyPieFoodDetails, setDailyPieFoodDetails] = useState([]);

  // Fetch food data from MongoDB
  useEffect(() => {
    const username = localStorage.getItem('username'); // Retrieve the logged-in username
    console.log('Fetching food data for username:', username); // Debug log
  
    if (username) {
      axios
        .get('http://localhost:5050/food/today', { params: { username } })
        .then((response) => {
          console.log('API response for food data:', response.data); // Debug log
          const todaysEntries = response.data;
  
          // Calculate total calories
          const caloriesForToday = todaysEntries.reduce(
            (total, entry) => total + parseInt(entry.calories, 10),
            0
          );
          setDailyCalories(caloriesForToday);
          setDailyPieFoodDetails(todaysEntries);
        })
        .catch((error) => {
          console.error('Error fetching food entries:', error);
        });
    }
  }, []);

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

  const foodPieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          beforeLabel: () => {
            return dailyPieFoodDetails.length > 0
              ? 'Details for Today:'
              : 'No food entries for today.';
          },
          afterLabel: (context) => {
            if (dailyPieFoodDetails.length > 0 && context.label === 'Food Consumed') {
              return dailyPieFoodDetails
                .map(
                  (entry) =>
                    `Time: ${entry.time}, Desc: ${entry.description}, Cals: ${entry.calories}`
                )
                .join('\n');
            }
            return null;
          },
        },
      },
    },
  };

  const [dailyOunces, setDailyOunces] = useState(0);
  const [dailyPieWaterDetails, setDailyPieWaterDetails] = useState([]);

  // Fetch water data from MongoDB
  useEffect(() => {
    const username = localStorage.getItem('username'); // Retrieve the logged-in username
  
    if (username) {
      // Fetch water entries
      axios
        .get('http://localhost:5050/water/today', { params: { username } }) // Send username as query parameter
        .then((response) => {
          const todaysEntries = response.data;
  
          // Calculate total ounces
          const ouncesForToday = todaysEntries.reduce(
            (total, entry) => total + parseInt(entry.ounces, 10),
            0
          );
          setDailyOunces(ouncesForToday);
          setDailyPieWaterDetails(todaysEntries);
        })
        .catch((error) => {
          console.error('Failed to fetch water entries:', error);
        });
    }
  }, []);

  const waterData = {
    labels: ['Water Consumed', 'Water Remaining'],
    datasets: [
      {
        label: 'Daily Water',
        data: [dailyOunces, Math.max(0, 100 - dailyOunces)], // Assuming 100 ounces daily goal
        backgroundColor: ['#36A2EB', '#E0E0E0'],
        hoverOffset: 4,
      },
    ],
  };

  const waterPieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          beforeLabel: () => {
            return dailyPieWaterDetails.length > 0
              ? 'Details for Today:'
              : 'No water entries for today.';
          },
          afterLabel: (context) => {
            if (dailyPieWaterDetails.length > 0 && context.label === 'Water Consumed') {
              return dailyPieWaterDetails
                .map(
                  (entry) =>
                    `Time: ${entry.time} Oz: ${entry.ounces}`
                )
                .join('\n');
            }
            return null;
          },
        },
      },
    },
  };

  const [weeklyFoodData, setWeeklyFoodData] = useState({
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Food Consumption',
        data: Array(7).fill(0), // Initialize with zeros
        borderColor: '#5CA904',
        fill: true,
      },
    ],
  });
  const [weeklyWaterData, setWeeklyWaterData] = useState({
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Water Consumption',
        data: Array(7).fill(0), // Initialize with zeros
        borderColor: '#36A2EB',
        fill: true,
      },
    ],
  });
  const [dailyFoodDetails, setDailyFoodDetails] = useState(Array(7).fill([]));
  const [dailyWaterDetails, setDailyWaterDetails] = useState(Array(7).fill([]));

  useEffect(() => {
    const username = localStorage.getItem('username'); // Retrieve logged-in username
    if (!username) {
      console.error('No username found in localStorage. Please log in.');
      return;
    }

    // Fetch food entries for the week
    axios
      .get('http://localhost:5050/food/week', { params: { username } }) // Backend route for weekly food data
      .then((response) => {
        const foodEntries = response.data;
        const weeklyCalories = Array(7).fill(0); // Initialize weekly calories
        const details = Array(7).fill().map(() => []);

        foodEntries.forEach((entry) => {
          const date = new Date(entry.date);
          const dayIndex = date.getDay(); // Get weekday (0 = Sunday, ..., 6 = Saturday)
          weeklyCalories[dayIndex] += parseInt(entry.calories, 10);
          details[dayIndex].push(
            `Time: ${entry.time}, Description: ${entry.description}, Calories: ${entry.calories}`
          );
        });

        // Update chart and details
        setWeeklyFoodData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: weeklyCalories,
            },
          ],
        }));
        setDailyFoodDetails(details);
      })
      .catch((error) => {
        console.error('Failed to fetch weekly food data:', error);
      });

    // Fetch water entries for the week
    axios
      .get('http://localhost:5050/water/week', { params: { username } }) // Backend route for weekly water data
      .then((response) => {
        const waterEntries = response.data;
        const weeklyOunces = Array(7).fill(0); // Initialize weekly ounces
        const details = Array(7).fill().map(() => []);

        waterEntries.forEach((entry) => {
          const date = new Date(entry.date);
          const dayIndex = date.getDay(); // Get weekday (0 = Sunday, ..., 6 = Saturday)
          weeklyOunces[dayIndex] += parseInt(entry.ounces, 10);
          details[dayIndex].push(`Time: ${entry.time}, Ounces: ${entry.ounces}`);
        });

        // Update chart and details
        setWeeklyWaterData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: weeklyOunces,
            },
          ],
        }));
        setDailyWaterDetails(details);
      })
      .catch((error) => {
        console.error('Failed to fetch weekly water data:', error);
      });
  }, []);

  const weeklyFoodChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 2000,
        ticks: {
          stepSize: 500,
          callback: (value) => `${value} Cals`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          beforeLabel: (context) => {
            const dayIndex = context.dataIndex;
            return dailyFoodDetails[dayIndex].length > 0
              ? dailyFoodDetails[dayIndex].join('\n')
              : 'No details available';
          },
        },
      },
    },
  };

  const weeklyWaterChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value} Oz`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          beforeLabel: (context) => {
            const dayIndex = context.dataIndex;
            return dailyWaterDetails[dayIndex].length > 0
              ? dailyWaterDetails[dayIndex].join('\n')
              : 'No details available';
          },
        },
      },
    },
  };


  const [goals, setGoals] = useState([]);

  // Fetch goals from MongoDB
  useEffect(() => {
    const username = localStorage.getItem('username');
    axios
      .get('http://localhost:5050/users/goals', {params: {username}})
      .then((response) => {
        setGoals(response.data || []);
      })
      .catch((error) => {
        console.error('Failed to fetch goals:', error);
      });
  }, []);

  const formatGoal = (goal) => {
    switch (goal) {
      case 'lose_weight':
        return 'Lose Weight';
      case 'gain_muscle':
        return 'Gain Muscle';
      case 'maintain_health':
        return 'Maintain Health';
      default:
        return 'No Goal Set';
    }
  };

  const formatTimeframe = (timeframe) => {
    switch (timeframe) {
      case '1_week':
        return '1 Week';
      case '2_weeks':
        return '2 Weeks';
      case '3_weeks':
        return '3 Weeks';
      case '1_month':
        return '1 Month';
      default:
        return 'No Timeframe Set';
    }
  };

  const getRecommendation = (goal) => {
    switch (goal) {
      case 'lose_weight':
        return 'Maintain a calorie deficit and engage in cardio exercises.';
      case 'gain_muscle':
        return 'Follow a high-protein diet and perform strength training.';
      case 'maintain_health':
        return 'Stick to a balanced diet and regular physical activity.';
      default:
        return 'Set a goal to receive recommendations.';
    }
  };


return (
  <div className="Dashboard">
      <header className="App-header">
        <h1>Welcome to the Dashboard</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          {/* Food Pie Chart */}
          <div style={{ width: '300px' }}>
            <h3>Daily Food</h3>
            <Pie data={foodData} options={foodPieChartOptions}/>
          </div>

          {/* Water Pie Chart */}
          <div style={{ width: '300px' }}>
            <h3>Daily Water</h3>
            <Pie data={waterData} options={waterPieChartOptions}/>
          </div>
        </div>

        <br/>

        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '30px' }}>
          <div style={{ width: '45%' , height: '300px'}}>
            <h2>Weekly Food</h2>
            <Line data={weeklyFoodData} options={weeklyFoodChartOptions} />
          </div>

          <div style={{ width: '45%' , height: '300px'}}>
            <h2>Weekly Water</h2>
            <Line data={weeklyWaterData} options={weeklyWaterChartOptions}/>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <h2>Goals and Recommendations</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {goals.map((goalObj, index) => (
            <div
              key={index}
              style={{ width: '33%', textAlign: 'center', margin: '0 10px' }}
            >
              <h3>Goal {index + 1}:</h3>
              <p>{`${formatGoal(goalObj.goal)} in ${formatTimeframe(goalObj.timeframe)}`} </p>
              <h4>Recommendation:</h4>
              <p>{getRecommendation(goalObj.goal)}</p>
            </div>
          ))}
        </div>
        <br />
      </header>
    </div>
  );
}

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { Pie, Line } from 'react-chartjs-2';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
// } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// function Dashboard() {
//   const [dailyCalories, setDailyCalories] = useState(0);
//   const [dailyOunces, setDailyOunces] = useState(0);
//   const [weeklyFoodData, setWeeklyFoodData] = useState({
//     labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Weekly Food Consumption',
//         data: Array(7).fill(0), // Initialize with zeros
//         borderColor: '#5CA904',
//         fill: true,
//       },
//     ],
//   });
//   const [weeklyWaterData, setWeeklyWaterData] = useState({
//     labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Weekly Water Consumption',
//         data: Array(7).fill(0), // Initialize with zeros
//         borderColor: '#36A2EB',
//         fill: true,
//       },
//     ],
//   });
//   const [dailyFoodDetails, setDailyFoodDetails] = useState(Array(7).fill([]));
//   const [dailyWaterDetails, setDailyWaterDetails] = useState(Array(7).fill([]));

//   useEffect(() => {
//     const username = localStorage.getItem('username'); // Retrieve logged-in username
//     if (!username) {
//       console.error('No username found in localStorage. Please log in.');
//       return;
//     }

//     // Fetch food entries for the week
//     axios
//       .get('http://localhost:5050/food/week', { params: { username } }) // Backend route for weekly food data
//       .then((response) => {
//         const foodEntries = response.data;
//         const weeklyCalories = Array(7).fill(0); // Initialize weekly calories
//         const details = Array(7).fill().map(() => []);

//         foodEntries.forEach((entry) => {
//           const date = new Date(entry.date);
//           const dayIndex = date.getDay(); // Get weekday (0 = Sunday, ..., 6 = Saturday)
//           weeklyCalories[dayIndex] += parseInt(entry.calories, 10);
//           details[dayIndex].push(
//             `Time: ${entry.time}, Description: ${entry.description}, Calories: ${entry.calories}`
//           );
//         });

//         // Update chart and details
//         setWeeklyFoodData((prevData) => ({
//           ...prevData,
//           datasets: [
//             {
//               ...prevData.datasets[0],
//               data: weeklyCalories,
//             },
//           ],
//         }));
//         setDailyFoodDetails(details);
//       })
//       .catch((error) => {
//         console.error('Failed to fetch weekly food data:', error);
//       });

//     // Fetch water entries for the week
//     axios
//       .get('http://localhost:5050/water/week', { params: { username } }) // Backend route for weekly water data
//       .then((response) => {
//         const waterEntries = response.data;
//         const weeklyOunces = Array(7).fill(0); // Initialize weekly ounces
//         const details = Array(7).fill().map(() => []);

//         waterEntries.forEach((entry) => {
//           const date = new Date(entry.date);
//           const dayIndex = date.getDay(); // Get weekday (0 = Sunday, ..., 6 = Saturday)
//           weeklyOunces[dayIndex] += parseInt(entry.ounces, 10);
//           details[dayIndex].push(`Time: ${entry.time}, Ounces: ${entry.ounces}`);
//         });

//         // Update chart and details
//         setWeeklyWaterData((prevData) => ({
//           ...prevData,
//           datasets: [
//             {
//               ...prevData.datasets[0],
//               data: weeklyOunces,
//             },
//           ],
//         }));
//         setDailyWaterDetails(details);
//       })
//       .catch((error) => {
//         console.error('Failed to fetch weekly water data:', error);
//       });
//   }, []);

//   const weeklyFoodChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         min: 0,
//         max: 2000,
//         ticks: {
//           stepSize: 500,
//           callback: (value) => `${value} Cals`,
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           beforeLabel: (context) => {
//             const dayIndex = context.dataIndex;
//             return dailyFoodDetails[dayIndex].length > 0
//               ? dailyFoodDetails[dayIndex].join('\n')
//               : 'No details available';
//           },
//         },
//       },
//     },
//   };

//   const weeklyWaterChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         min: 0,
//         max: 100,
//         ticks: {
//           stepSize: 20,
//           callback: (value) => `${value} Oz`,
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           beforeLabel: (context) => {
//             const dayIndex = context.dataIndex;
//             return dailyWaterDetails[dayIndex].length > 0
//               ? dailyWaterDetails[dayIndex].join('\n')
//               : 'No details available';
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="Dashboard">
//       <header className="App-header">
//         <h1>Welcome to the Dashboard</h1>
//         <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
//           <div style={{ width: '45%', height: '300px' }}>
//             <h2>Weekly Food Consumption</h2>
//             <Line data={weeklyFoodData} options={weeklyFoodChartOptions} />
//           </div>
//           <div style={{ width: '45%', height: '300px' }}>
//             <h2>Weekly Water Consumption</h2>
//             <Line data={weeklyWaterData} options={weeklyWaterChartOptions} />
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Dashboard;