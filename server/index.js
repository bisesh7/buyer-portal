import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
