const mongoose = require("mongoose");

require("dotenv").config();

let dbUrl = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connesso");
  } catch (error) {
    console.error("Database: errore di connessione", error);
  }
};

module.exports = connectDB;
