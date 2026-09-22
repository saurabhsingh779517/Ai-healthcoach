const calculateSleepScore = (sleep) => {
  if (sleep >= 7 && sleep <= 9) {
    return 20;
  }

  if (sleep >= 6 && sleep < 7) {
    return 15;
  }

  if (sleep >= 5 && sleep < 6) {
    return 10;
  }

  if (sleep > 9 && sleep <= 10) {
    return 15;
  }

  return 5;
};


const calculateHydrationScore = (water) => {
  if (water >= 3) {
    return 20;
  }

  if (water >= 2.5) {
    return 17;
  }

  if (water >= 2) {
    return 14;
  }

  if (water >= 1.5) {
    return 10;
  }

  return 5;
};


const calculateExerciseScore = (exerciseMinutes) => {
  if (exerciseMinutes >= 60) {
    return 20;
  }

  if (exerciseMinutes >= 45) {
    return 17;
  }

  if (exerciseMinutes >= 30) {
    return 14;
  }

  if (exerciseMinutes >= 15) {
    return 10;
  }

  return 5;
};


const calculateActivityScore = (steps) => {
  if (steps >= 10000) {
    return 20;
  }

  if (steps >= 8000) {
    return 17;
  }

  if (steps >= 6000) {
    return 14;
  }

  if (steps >= 4000) {
    return 10;
  }

  return 5;
};


const calculateNutritionScore = (
  calories,
  targetCalories
) => {

  if (!calories || !targetCalories) {
    return 10;
  }

  const difference =
    Math.abs(calories - targetCalories);

  const percentage =
    (difference / targetCalories) * 100;

  if (percentage <= 5) {
    return 20;
  }

  if (percentage <= 10) {
    return 17;
  }

  if (percentage <= 15) {
    return 14;
  }

  if (percentage <= 20) {
    return 10;
  }

  return 5;
};


const calculateHealthScore = ({
  sleep,
  water,
  exerciseMinutes,
  steps,
  calories,
  targetCalories
}) => {

  const sleepScore =
    calculateSleepScore(sleep);

  const hydrationScore =
    calculateHydrationScore(water);

  const exerciseScore =
    calculateExerciseScore(exerciseMinutes);

  const activityScore =
    calculateActivityScore(steps);

  const nutritionScore =
    calculateNutritionScore(
      calories,
      targetCalories
    );


  const totalScore =
    sleepScore +
    hydrationScore +
    exerciseScore +
    activityScore +
    nutritionScore;


  return {
    sleepScore,
    hydrationScore,
    exerciseScore,
    activityScore,
    nutritionScore,
    totalScore
  };
};


module.exports = {
  calculateHealthScore
};