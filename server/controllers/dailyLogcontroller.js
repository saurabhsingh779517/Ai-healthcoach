const dailyLog = require("../models/dailyLog");

const createDailyLog = async (req, res) => {
    try {
        const userId = req.user.id;
        const { date, weight, calories, water, sleep, exerciseMinutes, steps } = req.body;

        if(!date){
            return res.status(400).json({ message: "Date is required" });
        }
   const existingLog = await dailyLog.findOne({ userId, date });
        if (existingLog) {
            return res.status(400).json({ message: "Daily log for this date already exists" });
        }

        const dailyLog = await dailyLog.create({
            userId,
            date,
            weight,
            calories,
            water,
            sleep,
            exerciseMinutes,
            steps
        });

        return res.status(201).json("daily log created successfully",dailyLog);
    } catch (error) {
        console.error("Error creating daily log:", error);
        return res.status(500).json({ message: "failed to create daily log" });
    }
};

// get todays log
const getTodaysLog = async (req, res) => {
    try {
        const userId = req.user.id;
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const dailyLog = await dailyLog.findOne({ userId, date: { $gte: startOfDay, $lt: endOfDay } });
        if (!dailyLog) {
            return res.status(404).json({ message: "No log found for today" });
        }

        return res.status(200).json(dailyLog);
    } catch (error) {
        console.error("Error fetching today's log:", error);
        return res.status(500).json({ message: "failed to fetch today's log" });
    }
};

const getLogHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start date and end date are required" });
        }

        const logs = await dailyLog.find({
            userId,
            date: { $gte: new Date(startDate), $lt: new Date(endDate) }
        });

        return res.status(200).json({ counts: logs.length, logs });
    } catch (error) {
        console.error("Error fetching log history:", error);
        return res.status(500).json({ message: "failed to fetch log history" });
    }
};

// update daily log
const updateDailyLog = async (req, res) => {
  try {

    const userId = req.userId;

    const { id } = req.params;


    const dailyLog =
      await DailyLog.findOne({
        _id: id,
        userId,
      });


    if (!dailyLog) {
      return res.status(404).json({
        message:
          "Daily log not found",
      });
    }


    const {
      weight,
      calories,
      water,
      sleep,
      exerciseMinutes,
      steps,
    } = req.body;


    if (weight !== undefined)
      dailyLog.weight = weight;

    if (calories !== undefined)
      dailyLog.calories = calories;

    if (water !== undefined)
      dailyLog.water = water;

    if (sleep !== undefined)
      dailyLog.sleep = sleep;

    if (exerciseMinutes !== undefined)
      dailyLog.exerciseMinutes =
        exerciseMinutes;

    if (steps !== undefined)
      dailyLog.steps = steps;


    await dailyLog.save();


    res.json({
      message:
        "Daily log updated successfully",

      dailyLog,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to update daily log",
    });

  }
};
const deleteDailyLog = async (req, res) => {
  try {

    const userId = req.userId;

    const { id } = req.params;


    const dailyLog =
      await DailyLog.findOneAndDelete({
        _id: id,
        userId,
      });


    if (!dailyLog) {
      return res.status(404).json({
        message:
          "Daily log not found",
      });
    }


    res.json({
      message:
        "Daily log deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to delete daily log",
    });

  }
};




module.exports = {
    createDailyLog,
    getTodaysLog,
    getLogHistory,
    updateDailyLog,
    deleteDailyLog
};