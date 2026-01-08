const app = require("./app");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5001;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown to avoid nodemon port-in-use crashes
const shutdown = () => {
  console.log("Shutting down server...");
  server.close(() => {
    mongoose.connection
      .close(false)
      .then(() => {
        console.log("Mongo connection closed.");
        process.exit(0);
      })
      .catch(() => process.exit(0));
  });

  // Force exit if close hangs
  setTimeout(() => process.exit(0), 5000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);


