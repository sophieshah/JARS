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
    axios
      .get('http://localhost:5050/food/today')
      .then((response) => {
        const foodInfo = response.data;

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Filter and sum calories for the current day
        const todaysEntries = foodInfo.filter((entry) => entry.date === today);
        const caloriesForToday = todaysEntries.reduce(
          (total, entry) => total + parseInt(entry.calories, 10),
          0
        );

        setDailyCalories(caloriesForToday);
        setDailyPieFoodDetails(todaysEntries);
      })
      .catch((error) => {
        console.error('Failed to fetch food entries:', error);
      });
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
    axios
      .get('http://localhost:5050/water/today')
      .then((response) => {
        const waterInfo = response.data;

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Filter and sum ounces for the current day
        const todaysEntries = waterInfo.filter((entry) => entry.date === today);
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

        {/* <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '30px' }}>
          <div style={{ width: '45%' , height: '300px'}}>
            <h2>Weekly Food</h2>
            <Line data={weeklyFoodData} options={weeklyFoodChartOptions} />
          </div>

          <div style={{ width: '45%' , height: '300px'}}>
            <h2>Weekly Water</h2>
            <Line data={weeklyWaterData} options={weeklyWaterChartOptions}/>
          </div>
        </div> */}
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




// import React, {useState, useEffect} from 'react';
// import './App.css';
// import { Link } from 'react-router-dom';
// import { Pie, Line } from 'react-chartjs-2';
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
//   const [dailyPieFoodDetails, setDailyPieFoodDetails] = useState([]);

//   useEffect(() => {
//     // Retrieve food entries from localStorage
//     const foodInfo = JSON.parse(sessionStorage.getItem('foodInfo')) || [];

//     // Get today's date in YYYY-MM-DD format
//     const today = new Date().toISOString().split('T')[0];

//     // Filter and sum calories for the current day
//     const todaysEntries = foodInfo.filter((entry) => entry.date === today);
//     const caloriesForToday = todaysEntries.reduce(
//       (total, entry) => total + parseInt(entry.calories, 10),
//       0
//     );

//     setDailyCalories(caloriesForToday); // Update state
//     setDailyPieFoodDetails(todaysEntries);
//   }, []);

//   // Prepare the chart data
//   const foodData = {
//     labels: ['Food Consumed', 'Food Remaining'],
//     datasets: [
//       {
//         label: 'Daily Food',
//         data: [dailyCalories, Math.max(0, 2000 - dailyCalories)], // Assuming 2000-calorie daily goal
//         backgroundColor: ['#5CA904', '#E0E0E0'],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const foodPieChartOptions = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           beforeLabel: () => {
//             return dailyPieFoodDetails.length > 0
//               ? 'Details for Today:'
//               : 'No food entries for today.';
//           },
//           afterLabel: (context) => {
//             if (dailyPieFoodDetails.length > 0 && context.label === 'Food Consumed') {
//               // Format and return today's entries
//               return dailyPieFoodDetails
//                 .map(
//                   (entry) =>
//                     `Time: ${entry.time}, Desc: ${entry.description}, Cals: ${entry.calories}`
//                 )
//                 .join('\n');
//             }
//             return null;
//           },
//         },
//       },
//     },
//   };

//   const [dailyOunces, setDailyOunces] = useState(0);
//   const [dailyPieWaterDetails, setDailyPieWaterDetails] = useState([]);


//   useEffect(() => {
//     // Retrieve food entries from localStorage
//     const waterInfo = JSON.parse(sessionStorage.getItem('waterInfo')) || [];

//     // Get today's date in YYYY-MM-DD format
//     const today = new Date().toISOString().split('T')[0];

//     // Filter and sum calories for the current day
//     const todaysEntries = waterInfo.filter((entry) => entry.date === today);
//     const ouncesForToday = todaysEntries.reduce(
//       (total, entry) => total + parseInt(entry.ounces, 10),
//       0
//     );
//     setDailyOunces(ouncesForToday); // Update state
//     setDailyPieWaterDetails(todaysEntries);
//   }, []);

//   // Prepare the chart data
//   const waterData = {
//     labels: ['Water Consumed', 'Water Remaining'],
//     datasets: [
//       {
//         label: 'Daily Water',
//         data: [dailyOunces, Math.max(0, 100 - dailyOunces)], // Assuming 2000-calorie daily goal
//         backgroundColor: ['#36A2EB', '#E0E0E0'],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const waterPieChartOptions = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           beforeLabel: () => {
//             return dailyPieWaterDetails.length > 0
//               ? 'Details for Today:'
//               : 'No water entries for today.';
//           },
//           afterLabel: (context) => {
//             if (dailyPieWaterDetails.length > 0 && context.label === 'Water Consumed') {
//               // Format and return today's entries
//               return dailyPieWaterDetails
//                 .map(
//                   (entry) =>
//                     `Time: ${entry.time} Oz: ${entry.ounces}`
//                 )
//                 .join('\n');
//             }
//             return null;
//           },
//         },
//       },
//     },
//   };

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

//   const [dailyFoodDetails, setDailyFoodDetails] = useState(Array(7).fill([]));

//   useEffect(() => {
//     // Fetch all food entries from localStorage
//     const foodInfo = JSON.parse(sessionStorage.getItem('foodInfo')) || [];

//     if (foodInfo.length > 0) {
//       // Aggregate calories for each weekday
//       const weeklyCalories = Array(7).fill(0); // [Mon, Tue, ..., Sun]
//       const details = Array(7).fill().map(() => []);
      
//       foodInfo.forEach((entry) => {
//         const date = new Date(entry.date);
//         const dayIndex = (date.getDay()); // Adjust 0 (Sun) to 6 and so on for Mon-Sun
//         weeklyCalories[dayIndex] += parseInt(entry.calories, 10);
//         details[dayIndex].push(`Time: ${entry.time}, Description: ${entry.description}, Calories: ${entry.calories}`);
//       });

//       // Update the chart data
//       setWeeklyFoodData((prevData) => ({
//         ...prevData,
//         datasets: [
//           {
//             ...prevData.datasets[0],
//             data: weeklyCalories,
//           },
//         ],
//       }));
//       setDailyFoodDetails(details); 
//     }
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
//               ? dailyFoodDetails[dayIndex].join('\n') // Display all details for the day
//               : 'No details available';
//           },
//         },
//       },
//     },
//   };

//   const [dailyWaterDetails, setDailyWaterDetails] = useState(Array(7).fill([]));

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

//   useEffect(() => {
//     // Fetch all food entries from localStorage
//     const waterInfo = JSON.parse(sessionStorage.getItem('waterInfo')) || [];

//     if (waterInfo.length > 0) {
//       // Aggregate calories for each weekday
//       const details = Array(7).fill().map(() => []);
//       const weeklyCalories = Array(7).fill(0); // [Mon, Tue, ..., Sun]
      
//       waterInfo.forEach((entry) => {
//         const date = new Date(entry.date);
//         const dayIndex = (date.getDay()); // Adjust 0 (Sun) to 6 and so on for Mon-Sun
//         weeklyCalories[dayIndex] += parseInt(entry.ounces, 10);
//         details[dayIndex].push(`Time: ${entry.time}, Ounces: ${entry.ounces}`);
//       });

//       // Update the chart data
//       setWeeklyWaterData((prevData) => ({
//         ...prevData,
//         datasets: [
//           {
//             ...prevData.datasets[0],
//             data: weeklyCalories,
//           },
//         ],
//       }));
//       setDailyWaterDetails(details); 
//     }
//   }, []);

//   const weeklyWaterChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // Optional for better responsiveness
//     scales: {
//       y: {
//         min: 0, // Minimum value for Y-axis
//         max: 100, // Maximum value for Y-axis
//         ticks: {
//           stepSize: 20, // Optional: Increment for gridlines
//           callback: (value) => `${value} Oz`, // Format Y-axis labels
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           beforeLabel: (context) => {
//             const dayIndex = context.dataIndex;
//             return dailyWaterDetails[dayIndex].length > 0
//               ? dailyWaterDetails[dayIndex].join('\n') // Display all details for the day
//               : 'No details available';
//           },
//         },
//       },
//     },
//   };



// const [goals, setGoals] = useState([]);

// useEffect(() => {
//   // Fetch goals from localStorage
//   const storedData = JSON.parse(localStorage.getItem('userData')) || {};
//   setGoals(storedData.goals || []);
// }, []);

// const formatGoal = (goal) => {
//   switch (goal) {
//     case 'lose_weight':
//       return 'Lose Weight';
//     case 'gain_muscle':
//       return 'Gain Muscle';
//     case 'maintain_health':
//       return 'Maintain Health';
//     default:
//       return 'No Goal Set';
//   }
// };

// const formatTimeframe = (timeframe) => {
//   switch (timeframe) {
//     case '1_week':
//       return '1 Week';
//     case '2_weeks':
//       return '2 Weeks';
//     case '3_weeks':
//       return '3 Weeks';
//     case '1_month':
//       return '1 Month';
//     default:
//       return 'No Timeframe Set';
//   }
// };


// const getRecommendation = (goal) => {
//   switch (goal) {
//     case 'lose_weight':
//       return 'Maintain a calorie deficit and engage in cardio exercises.';
//     case 'gain_muscle':
//       return 'Follow a high-protein diet and perform strength training.';
//     case 'maintain_health':
//       return 'Stick to a balanced diet and regular physical activity.';
//     default:
//       return 'Set a goal to receive recommendations.';
//   }
// };



//   return (
//     <div className="Dashboard">
//       <header className="App-header">
//         <h1>Welcome to the dashboard.</h1>
//         <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
//           {/* Food Pie Chart */}
//           <div style={{ width: '300px' }}>
//             <h3>Daily Food</h3>
//             <Pie data={foodData} options={foodPieChartOptions}/>
//           </div>

//           {/* Water Pie Chart */}
//           <div style={{ width: '300px' }}>
//             <h3>Daily Water</h3>
//             <Pie data={waterData} options={waterPieChartOptions}/>
//           </div>
//         </div>

//         <br/>

//         <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '30px' }}>
//           <div style={{ width: '45%' , height: '300px'}}>
//             <h2>Weekly Food</h2>
//             <Line data={weeklyFoodData} options={weeklyFoodChartOptions} />
//           </div>

//           <div style={{ width: '45%' , height: '300px'}}>
//             <h2>Weekly Water</h2>
//             <Line data={weeklyWaterData} options={weeklyWaterChartOptions}/>
//           </div>
//         </div>
//         <br/>
//         <br/>
//         <br/>
//         <h2>Goals and Recommendations</h2>
// <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//   {goals.map((goalObj, index) => (
//     <div
//       key={index}
//       style={{ width: '33%', textAlign: 'center', margin: '0 10px' }}
//     >
//       <h3>Goal {index + 1}:</h3>
//       <p>{`${formatGoal(goalObj.goal)} in ${formatTimeframe(goalObj.timeframe)}`} </p>
//       <h4>Recommendation:</h4>
//       <p>{getRecommendation(goalObj.goal)}</p>
//     </div>
//   ))}
// </div>
// <br />

//       </header>
//     </div>
//   );
// }

// export default Dashboard;
