const DailyLog = require("../models/dailyLog");
const HealthProfile =
  require("../models/HealthProfile");

const {
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


const getTodayHealthScore = async (
  req,
  res
) => {

  try {

    const userId = req.userId;


    // Get health profile

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


    // Get today's log

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


    // Calculate calorie target

    const bmr = calculateBMR(
      profile.weight,
      profile.height,
      profile.age,
      profile.gender
    );


    const tdee = calculateTDEE(
      bmr,
      profile.activityLevel
    );


    const targetCalories =
      calculateDailyCalories(
        tdee,
        profile.goal
      );


    // Calculate health score

    const score =
      calculateHealthScore({

        sleep: dailyLog.sleep,

        water: dailyLog.water,

        exerciseMinutes:
          dailyLog.exerciseMinutes,

        steps: dailyLog.steps,

        calories: dailyLog.calories,

        targetCalories

      });


    // Generate recommendations

    const recommendations =
      generateRecommendations(score);


    res.json({

      date: dailyLog.date,

      healthScore: score.totalScore,

      breakdown: {

        sleep:
          score.sleepScore,

        hydration:
          score.hydrationScore,

        exercise:
          score.exerciseScore,

        activity:
          score.activityScore,

        nutrition:
          score.nutritionScore

      },

      targetCalories,

      recommendations

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to calculate health score"
    });

  }
};


module.exports = {
  getTodayHealthScore
};