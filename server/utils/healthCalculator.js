const { get } = require("mongoose");

const calculateBMI = (weight, height) => {
    // height is in cm, convert it into meters
    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    return Number(bmi.toFixed(2));
};
const getBMICategory = (bmi) =>{
    if (bmi < 18.5) {
        return "Underweight";
    }
    else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal weight";
    }
    else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    }
    else {
        return "Obesity";
    }
};

const calculateBMR = (weight, height, age, gender) => {
    let bmr;

    if (gender.toLowerCase() === "male") {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } 
    else if (gender.toLowerCase() === "female") {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } 
    else {
        throw new Error("Gender must be male or female");
    }

    return Math.round(bmr);
};

const getActivityMultiplier = (activityLevel) => {
   const multiplier = {
       "sedentary": 1.2,
       "light": 1.375,
       "moderate": 1.55,
       "active": 1.725,
       "very active": 1.9
   };

   return multiplier[activityLevel] || 1.2;
};
const calculateTDEE = (bmr, activityLevel) => {
   const activityMultiplier = getActivityMultiplier(activityLevel);
   return Math.round(bmr * activityMultiplier);
};

const calculateDailyCalories = (bmr, activityLevel, goal) => {
   const tdee = calculateTDEE(bmr, activityLevel);

   switch (goal) {
       case "weight loss":
           return tdee - 500; // Create a calorie deficit
       case "weight gain":
           return tdee + 500; // Create a calorie surplus
       case "maintain weight":
           return tdee;
       default:
           throw new Error("Invalid goal");
   }
};

module.exports = {
    calculateBMI,
    getBMICategory,
    calculateBMR,
    calculateTDEE,
    calculateDailyCalories
   
    
};