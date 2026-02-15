const mongoose = require("mongoose");
const { default: MongoSession } = require("telegraf-session-mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sessionDB = mongoose.connection;

sessionDB.on("connected", () => {
  console.log("✅ MongoDB connected for session storage");
});

sessionDB.on("error", (err) => {
  console.error("MongoDB session error:", err);
});

// Create Telegraf session store
const mongoSession = new MongoSession(mongoose);

module.exports = mongoSession;