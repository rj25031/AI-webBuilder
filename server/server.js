import express from "express";
import cors from "cors";
import morgan from "morgan";
import aiRoute from "./route/aiRoute.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/ai", aiRoute);

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
