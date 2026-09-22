const HealthProfile =
  require("../models/HealthProfile");

const DailyLog =
  require("../models/dailyLog");

const {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  calculateDailyCalories
} = require("../utils/healthCalculator");

const {
  calculateHealthScore
} = require("../utils/healthScoreCalculator");

const {
  generateRecommendations
} = require("../utils/recommendationEngine");

const {
  generateHealthAdvice
} = require("../services/aiService");


const getAIHealthAdvice = async (req, res) => {

  try {

    const userId = req.userId;


    // 1. Get health profile

    const profile =
      await HealthProfile.findOne({
        userId
      });


    if (!profile) {

      return res.status(404).json({
        message:
          "Health profile not found"
      });

    }


    // 2. Get today's log

    const startOfDay = new Date();

    startOfDay.setHours(
      0,
      0,
      0,
      0
    );


    const endOfDay = new Date();

    endOfDay.setHours(
      23,
      59,
      59,
      999
    );


    const dailyLog =
      await DailyLog.findOne({

        userId,

        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }

      });


    if (!dailyLog) {

      return res.status(404).json({
        message:
          "Today's health log not found"
      });

    }


    // 3. Calculate health metrics

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


    // 4. Calculate health score

    const score =
      calculateHealthScore({

        sleep: dailyLog.sleep,

        water: dailyLog.water,

        exerciseMinutes:
          dailyLog.exerciseMinutes,

        steps:
          dailyLog.steps,

        calories:
          dailyLog.calories,

        targetCalories

      });


    // 5. Create context for AI

    const userContext = {

      age: profile.age,

      gender: profile.gender,

      height: profile.height,

      weight: profile.weight,

      activityLevel:
        profile.activityLevel,

      goal: profile.goal,

      dietPreference:
        profile.dietPreference,


      bmi,

      bmiCategory,

      bmr,

      tdee,

      targetCalories,


      calories:
        dailyLog.calories,

      water:
        dailyLog.water,

      sleep:
        dailyLog.sleep,

      exerciseMinutes:
        dailyLog.exerciseMinutes,

      steps:
        dailyLog.steps,


      healthScore:
        score.totalScore,

      sleepScore:
        score.sleepScore,

      hydrationScore:
        score.hydrationScore,

      exerciseScore:
        score.exerciseScore,

      activityScore:
        score.activityScore,

      nutritionScore:
        score.nutritionScore

    };


    // 6. Ask Gemini

    const aiAdvice =
      await generateHealthAdvice(
        userContext
      );


    // 7. Send response

    res.json({

      message:
        "AI health advice generated",

      healthScore:
        score.totalScore,

      aiAdvice

    });


  } catch (error) {

    console.error(
      "AI Error:",
      error
    );


    res.status(500).json({

      message:
        "Failed to generate AI health advice"

    });

  }

};


module.exports = {
  getAIHealthAdvice
};