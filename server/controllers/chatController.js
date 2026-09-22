const Chat =
  require("../models/chat");

const HealthProfile =
  require("../models/HealthProfile");

const DailyLog =
  require("../models/dailyLog");


const {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  calculateDailyCalories,
} =
  require("../utils/healthCalculator");


const {
  calculateHealthScore,
} =
  require("../utils/healthScoreCalculator");


const {
  generateChatResponse,
} =
  require("../services/aiService");

  const chatWithCoach = async (req, res) => {

  try {

    const userId = req.userId;

    const { message } = req.body;


    // Validate message

    if (!message || !message.trim()) {

      return res.status(400).json({
        message:
          "Message is required",
      });

    }


    // Get health profile

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


    // Get today's log

    const startOfDay =
      new Date();

    startOfDay.setHours(
      0,
      0,
      0,
      0
    );


    const endOfDay =
      new Date();

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
          $lte: endOfDay,
        },

      });


    if (!dailyLog) {

      return res.status(404).json({
        message:
          "Please create today's health log first",
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


    // Calculate health score

    const score =
      calculateHealthScore({

        sleep:
          dailyLog.sleep,

        water:
          dailyLog.water,

        exerciseMinutes:
          dailyLog.exerciseMinutes,

        steps:
          dailyLog.steps,

        calories:
          dailyLog.calories,

        targetCalories,

      });


    // Get previous conversations

    const previousChats =
      await Chat.find({
        userId,
      })
        .sort({ createdAt: -1 })
        .limit(10);


    // Reverse for chronological order

    previousChats.reverse();


    // Build context

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

    };


    // Ask Gemini

    const aiResponse =
      await generateChatResponse(
        userContext,
        previousChats,
        message.trim()
      );


    // Save conversation

    const chat =
      await Chat.create({

        userId,

        message:
          message.trim(),

        response:
          aiResponse,

      });


    // Send response

    res.status(200).json({

      message:
        "AI response generated",

      chat: {

        id:
          chat._id,

        userMessage:
          chat.message,

        aiResponse:
          chat.response,

        createdAt:
          chat.createdAt,

      },

    });

  } catch (error) {

    console.error(
      "Chat error:",
      error
    );


    res.status(500).json({

      message:
        "Failed to generate AI response",

    });

  }

};

const getChatHistory = async (
  req,
  res
) => {

  try {

    const userId =
      req.userId;


    const chats =
      await Chat.find({
        userId,
      })
        .sort({
          createdAt: 1,
        });


    res.json({

      count:
        chats.length,

      chats,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        "Failed to fetch chat history",

    });

  }

};


module.exports = {
  chatWithCoach,
  getChatHistory
};