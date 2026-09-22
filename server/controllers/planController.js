const HealthProfile =
  require("../models/HealthProfile");

const HealthPlan =
  require("../models/healthPlan");


const {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  calculateDailyCalories,
} =
  require("../utils/healthCalculator");


const {
  generateHealthPlan,
} =
  require("../services/aiService");


const generatePlan = async (
  req,
  res
) => {

  try {

    const userId =
      req.userId;


    // Get profile

    const profile =
      await HealthProfile.findOne({
        userId,
      });


    if (!profile) {

      return res.status(404).json({
        message:
          "Please complete your health profile first",
      });

    }


    // Calculate health metrics

    const bmi =
      calculateBMI(
        profile.weight,
        profile.height
      );


    const bmiCategory =
      getBMICategory(bmi);


    const bmr =
      calculateBMR(
        profile.weight,
        profile.height,
        profile.age,
        profile.gender
      );


    const tdee =
      calculateTDEE(
        bmr,
        profile.activityLevel
      );


    const targetCalories =
      calculateDailyCalories(
        tdee,
        profile.goal
      );


    // Build AI context

    const userContext = {

      age:
        profile.age,

      gender:
        profile.gender,

      height:
        profile.height,

      weight:
        profile.weight,

      activityLevel:
        profile.activityLevel,

      goal:
        profile.goal,

      dietPreference:
        profile.dietPreference,


      bmi,

      bmiCategory,

      bmr,

      tdee,

      targetCalories,

    };


    // Generate AI plan

    const aiPlan =
      await generateHealthPlan(
        userContext
      );


    // Save to MongoDB

    const healthPlan =
      await HealthPlan.create({

        userId,

        goal:
          profile.goal,

        dietPreference:
          profile.dietPreference,

        dailyCalories:
          targetCalories,

        dietPlan:
          aiPlan.dietPlan,

        workoutPlan:
          aiPlan.workoutPlan,

      });


    res.status(201).json({

      message:
        "AI health plan generated successfully",

      plan: {

        id:
          healthPlan._id,

        summary:
          aiPlan.summary,

        dailyCalories:
          targetCalories,

        dietPlan:
          aiPlan.dietPlan,

        workoutPlan:
          aiPlan.workoutPlan,

        hydration:
          aiPlan.hydration,

        recovery:
          aiPlan.recovery,

      },

    });

  } catch (error) {

    console.error(
      "Plan generation error:",
      error
    );


    res.status(500).json({

      message:
        "Failed to generate health plan",

    });

  }
};
const getPlanHistory = async (
  req,
  res
) => {

  try {

    const userId =
      req.userId;


    const plans =
      await HealthPlan.find({
        userId,
      })
        .sort({
          generatedAt: -1,
        });


    res.json({

      count:
        plans.length,

      plans,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        "Failed to fetch plan history",

    });

  }

};


module.exports = {
  generatePlan,
  getPlanHistory,
};