const generateRecommendations = ({
  sleepScore,
  hydrationScore,
  exerciseScore,
  activityScore,
  nutritionScore
}) => {

  const recommendations = [];


  if (sleepScore < 15) {
    recommendations.push(
      "Try to maintain a consistent sleep schedule and aim for adequate sleep."
    );
  }


  if (hydrationScore < 15) {
    recommendations.push(
      "Increase your water intake gradually throughout the day."
    );
  }


  if (exerciseScore < 15) {
    recommendations.push(
      "Consider adding more physical activity to your day."
    );
  }


  if (activityScore < 15) {
    recommendations.push(
      "Try increasing your daily movement, such as walking."
    );
  }


  if (nutritionScore < 15) {
    recommendations.push(
      "Review your daily calorie intake and focus on balanced meals."
    );
  }


  if (recommendations.length === 0) {
    recommendations.push(
      "Great job! Your daily wellness metrics are looking good."
    );
  }


  return recommendations;
};


module.exports = {
  generateRecommendations
};