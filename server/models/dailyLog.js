const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: Date,
            
            required: true
        },

        weight: {
            type: Number,
            min: 20,
            max: 300
        },

        calories: {
            type: Number,
            min: 0,
            max: 10000
        },

        water: {
            type: Number,
            min: 0,
            max: 20
        },
      sleep:{
        type: Number,
        min: 0,
        max: 24
      },
        exerciseMinutes: {
            type: Number,
            min: 0,
            max: 1440
        },

        steps: {
            type: Number,
            min: 0,
            max: 100000
        },
    },
    {
        timestamps: true,
    }
);

const DailyLog = mongoose.model("DailyLog", dailyLogSchema);

module.exports = DailyLog;