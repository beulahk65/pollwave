const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pollRoutes = require("./routes/polls");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/api/polls", pollRoutes);
// Sample API
app.get("/", (req, res) => {
  res.send("PollWave Backend is running");
});

// TODO: Add routes here

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
