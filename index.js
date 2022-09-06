import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import InitiateMongoServer from "./config/db.js";
import userRouter from "./routes/user.js";
import planRouter from "./routes/plan.js";
import subRouter from "./routes/subscription.js";

InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API is up and running!" });
});

// User Authentication Rotues
app.use("/user", userRouter);

// Plans Details
app.use("/plans", planRouter);

// Subscription Routes
app.use("/subscriptions", subRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at Port ${PORT}`);
});
