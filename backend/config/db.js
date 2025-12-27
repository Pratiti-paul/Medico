const mongoose = require("mongoose");

// Prevent nodemon crash loops by handling DB errors gracefully
const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const localUri = "mongodb://127.0.0.1:27017/medico";

  const tryConnect = async (uri, label) => {
    try {
      await mongoose.connect(uri);
      console.log(`MongoDB connected successfully (${label})`);
      return true;
    } catch (error) {
      console.error(`MongoDB connection failed (${label}):`, error.message);
      return false;
    }
  };

  // 1) Try primary (Atlas) if provided
  if (primaryUri) {
    const ok = await tryConnect(primaryUri, "primary");
    if (ok) return;
    console.warn("Falling back to local MongoDB on 127.0.0.1:27017/medico...");
  }

  // 2) Fallback to local
  const okLocal = await tryConnect(localUri, "local");
  if (!okLocal) {
    console.error(
      "Ensure MONGO_URI is reachable (IP whitelisted) or start local MongoDB: 'docker run -d -p 27017:27017 --name medico-mongo mongo:6'"
    );
    // Keep process alive to avoid nodemon restart loops
  }
};

module.exports = connectDB;
