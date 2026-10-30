const HealthProfile = require("../models/HealthProfile");
const { calculateBMI, getBMICategory, calculateBMR, calculateTDEE, calculateDailyCalories } = require("../utils/healthCalculator");

const saveHealthProfile = async (req, res) => {
    try {
        const {  age, gender, height, weight, activityLevel, goal, dietPreferences, sleepHours, waterIntake } = req.body;

        // Validate and process the input data
        if ( !age || !gender || !height || !weight || !activityLevel || !goal || !dietPreferences || !sleepHours || !waterIntake) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const bmi = calculateBMI(weight, height);
        const bmiCategory = getBMICategory(bmi);
        const bmr = calculateBMR(weight, height, age, gender);
        const tdee = calculateTDEE(bmr, activityLevel);
        const dailyCalories = calculateDailyCalories(bmr, activityLevel, goal);
        const userId = req.user._id
        // Save the health profile to the database

        let profile = await HealthProfile.findOne({ userId });
        if (profile) {
            // Update existing profile
            profile.age = age;
            profile.gender = gender;
            profile.height = height;
            profile.weight = weight;
            profile.activityLevel = activityLevel;
            profile.goal = goal;
            profile.dietPreferences = dietPreferences;
            profile.sleepHours = sleepHours;
            profile.waterIntake = waterIntake;
            await profile.save();
        } else {
            // Create new profile
            profile = new HealthProfile({
                userId,
                age,
                gender,
                height,
                weight,
                activityLevel,
                goal,
                dietPreferences,
                sleepHours,
                waterIntake
            });
           await profile.save(); 
        }

        res.status(201).json({ message: "Health profile saved successfully", 
            profile: {
                 userId,
                age,
                gender,
                height,
                weight,
                activityLevel,
                goal,
                dietPreferences,
                sleepHours,
                waterIntake
            },
            healthMetrics: {
                bmi,
                bmiCategory,
                bmr,
                tdee,
                dailyCalories
            }
    } );

   } catch (error) {
       console.error("Error saving health profile:", error);
       res.status(500).json({ message: "failed to save health profile" });
  }
};


// getting health profile

const getHealthProfile = async (req, res) => {
    try {
        
console.log("Authenticated user from protect:", req.user);

const userId = req.user._id;

console.log("Searching profile for userId:", userId);

const profile = await HealthProfile.findOne({ userId });

console.log("Profile found in database:", profile);

        if (!profile) {
            return res.status(404).json({ message: "Health profile not found" });
        }

        const bmi = calculateBMI(profile.weight, profile.height);
        const bmiCategory = getBMICategory(bmi);
        const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
        const tdee = calculateTDEE(bmr, profile.activityLevel);
        const dailyCalories = calculateDailyCalories(bmr, profile.activityLevel, profile.goal);

        res.status(200).json({ message: "Health profile retrieved successfully", profile, healthMetrics: {
            bmi,
            bmiCategory,
            bmr,
            tdee,
            dailyCalories
        } });

    } catch (error) {
        console.error("Error retrieving health profile:", error);
        res.status(500).json({ message: "Failed to retrieve health profile" });
    }
};  

module.exports = {
    saveHealthProfile,
    getHealthProfile
};