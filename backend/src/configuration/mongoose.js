import mongoose from "mongoose";
import { CONSTANTS } from "./config.js";

const databaseUrl = CONSTANTS.devDataBaseUrl;
function mongooseCon(app) {
  mongoose.connect(databaseUrl);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
  if (app) {
    app.set("mongoose", mongoose);
  }
}

export default mongooseCon;
