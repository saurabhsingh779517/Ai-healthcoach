const mongoose = require("mongoose");

const healthProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        age: {
            type: Number,
            
            required: true,
            min: 13,
            max: 120
        },

        gender: {
            type: String,
            enum: ["male", "female"],
            required: true,
            
        },

        height: {
            type: Number,
            required: true,
            min: 50,
            max: 300
        },

        weight: {
            type: Number,
            required: true,
             min: 20,
            max: 300
        },

        activityLevel: {
            type: String,
            enum: [
                "sedentary",
                "light",
                "moderate",
                "active",
                "very active",
            ],
            required: true,
        },

        goal: {
            type: String,
            enum: [
                "weight loss",
                "weight gain",
                "maintain weight",
                "muscle gain",
                "general fitness",
            ],
            required: true,
        },

        dietPreferences: {
            type: String,
            enum: [
                "vegetarian",
                "vegan",
                "non_vegetarian"
            ],
        },

        sleepHours: {
            type: Number,
        },

        waterIntake: {
            type: Number,
            min: 0,
            max: 20
        },
    },
    {
        timestamps: true,
    }
);

const HealthProfile = mongoose.model(
    "HealthProfile",
   healthProfileSchema
);

module.exports = HealthProfile;