import express from "express";
import Plan from "../models/plan.js";

const planRouter = express.Router();

planRouter.get("/fetch", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.send({ message: "Eror while fetching Plans" });
  }
});

planRouter.get("/fetch/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const plans = await Plan.findById(planId);
    if (!plans) {
      return res.send({ message: "No Plan Found with that ID" });
    }
    res.json(plans);
  } catch (error) {
    res.send({ message: "Eror while fetching Plan By ID" });
  }
});

export default planRouter;
