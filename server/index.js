import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/init.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
