import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import users from "./routes/users.js";
import food from './routes/food.js';
import water from './routes/water.js';



const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", users);
app.use('/food', food);
app.use('/water', water);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});