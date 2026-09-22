const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    meal: {
      type: String,
      required: true,
    },

    foods: [
      {
        type: String,
      },
    ],

    approximateCalories: {
      type: Number,
    },

    protein: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);


const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    sets: {
      type: Number,
    },

    reps: {
      type: String,
    },

    durationMinutes: {
      type: Number,
    },

    instructions: {
      type: String,
    },
  },
  {
    _id: false,
  }
);


const healthPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    goal: {
      type: String,
      required: true,
    },

    dietPreference: {
      type: String,
      required: true,
    },

    dailyCalories: {
      type: Number,
      required: true,
    },

    dietPlan: {
      meals: [mealSchema],
    },

    workoutPlan: {
      durationMinutes: Number,

      exercises: [exerciseSchema],
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);
const HealthPlan = mongoose.model("HealthPlan", healthPlanSchema);


module.exports = mongoose.model(
  "HealthPlan",
  healthPlanSchema
);