import express from "express";
import { check, validationResult } from "express-validator";
import Subscription from "../models/subscription.js";
import User from "../models/user.js";
import Plan from "../models/plan.js";

const subRouter = express.Router();

subRouter.post(
  "/create",
  [
    // Add Check if needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      userId,
      planId,
      billingCycle,
      startDate,
      endDate,
      isActive = true,
      creditCardNumber,
      creditCardExpiry,
      creditCardCvv,
    } = req.body;

    try {
      let user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({
          message: "No User found with given ID",
        });
      }

      let plan = await Plan.findById(planId);
      if (!plan) {
        return res.status(400).json({
          message: "No Plan found with given ID",
        });
      }

      // Check if similar sub already exists

      let sub = new Subscription({
        userId,
        planId,
        billingCycle,
        startDate,
        endDate,
        isActive,
        creditCardNumber,
        creditCardExpiry,
        creditCardCvv,
      });

      await sub.save();

      res.status(200).json({
        id: sub.id,
        message: "New Subscription Added",
      });
    } catch (error) {
      console.log(`Error while Creating Subscription: ${error.message}`);
      res.status(500).send("Error when creating Subscription");
    }
  }
);

subRouter.get("/fetch", async (req, res) => {
  try {
    const userId = req.query.userId;

    const subs = await Subscription.find({ userId });
    res.json(subs);
  } catch (error) {
    res.send({ message: "Error while fetching Subscriptions" });
  }
});

// Cancel Sub
subRouter.patch("/cancel/:id", async (req, res) => {
  try {
    const subId = req.params.id;

    const sub = await Subscription.findById(subId);
    if (!sub) {
      return res.send({ message: "No Subscription Found with that ID" });
    }

    Subscription.updateOne(
      { _id: subId },
      { isActive: false },
      {},
      (err, result) => {
        if (err) throw err;
        else
          res
            .status(200)
            .send({ message: "Successfully Cancelled Subscription" });
      }
    );
  } catch (error) {
    res.send({ message: "Error while cancelling Subscription" });
  }
});

// Update Sub

export default subRouter;
