const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


const generateHealthAdvice = async (userContext) => {

  const prompt = `
You are an AI wellness coach.

Your job is to provide safe, practical and
personalized lifestyle guidance.

You are NOT a doctor and must not diagnose
medical conditions or prescribe medicines.

USER HEALTH PROFILE:

Age: ${userContext.age}
Gender: ${userContext.gender}
Height: ${userContext.height} cm
Weight: ${userContext.weight} kg

Activity Level:
${userContext.activityLevel}

Goal:
${userContext.goal}

Diet Preference:
${userContext.dietPreference}


CALCULATED METRICS:

BMI: ${userContext.bmi}
BMI Category: ${userContext.bmiCategory}

BMR: ${userContext.bmr} kcal/day

TDEE: ${userContext.tdee} kcal/day

Estimated Daily Calorie Target:
${userContext.targetCalories} kcal/day


TODAY'S ACTIVITY:

Calories Consumed:
${userContext.calories}

Water:
${userContext.water} L

Sleep:
${userContext.sleep} hours

Exercise:
${userContext.exerciseMinutes} minutes

Steps:
${userContext.steps}


HEALTH SCORE:

Overall Score:
${userContext.healthScore}/100

Sleep Score:
${userContext.sleepScore}/20

Hydration Score:
${userContext.hydrationScore}/20

Exercise Score:
${userContext.exerciseScore}/20

Activity Score:
${userContext.activityScore}/20

Nutrition Score:
${userContext.nutritionScore}/20


TASK:

Analyze the user's current wellness data.

Give:

1. A short summary of today's status.
2. Three personalized recommendations.
3. One nutrition suggestion.
4. One exercise/activity suggestion.
5. One sleep/recovery suggestion.

Keep the response concise and practical.

Do not diagnose diseases.

If the user reports severe or concerning symptoms,
recommend seeking appropriate medical care.
`;


  const response =
    await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt
    });


  return response.text;
};

const generateChatResponse = async (
  userContext,
  conversationHistory,
  userMessage
) => {

  const historyText =
    conversationHistory
      .map((chat) => {
        return `
User: ${chat.message}
Coach: ${chat.response}
`;
      })
      .join("\n");


  const prompt = `
You are an AI wellness coach inside a health
and fitness application.

Your role is to provide general wellness,
fitness, nutrition, sleep and lifestyle
guidance.

You are NOT a doctor.

Do not diagnose diseases.
Do not prescribe medicines.
Do not claim certainty about medical conditions.

If the user describes severe, emergency,
or concerning symptoms, advise them to seek
appropriate professional medical care.

USER PROFILE:

Age: ${userContext.age}
Gender: ${userContext.gender}
Height: ${userContext.height} cm
Weight: ${userContext.weight} kg

Activity Level:
${userContext.activityLevel}

Goal:
${userContext.goal}

Diet:
${userContext.dietPreference}


HEALTH METRICS:

BMI: ${userContext.bmi}
BMI Category: ${userContext.bmiCategory}

BMR: ${userContext.bmr}
TDEE: ${userContext.tdee}

Estimated Daily Calories:
${userContext.targetCalories}


TODAY'S DATA:

Calories: ${userContext.calories}
Water: ${userContext.water} L
Sleep: ${userContext.sleep} hours
Exercise: ${userContext.exerciseMinutes} minutes
Steps: ${userContext.steps}

Health Score:
${userContext.healthScore}/100


PREVIOUS CONVERSATION:

${historyText || "No previous conversation."}


CURRENT USER MESSAGE:

${userMessage}


INSTRUCTIONS:

1. Answer the user's current question directly.
2. Use their profile and health data when relevant.
3. Maintain conversational continuity.
4. Be practical and concise.
5. Do not invent medical facts about the user.
6. Do not diagnose or prescribe medication.
7. If information is insufficient, say so.
`;


  const response =
    await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });


  return response.text;
};

const generateHealthPlan = async (
  userContext
) => {

  const prompt = `
You are an AI wellness coach.

Create a practical one-day wellness plan
based on the user's profile.

IMPORTANT SAFETY RULES:

- This is general wellness guidance.
- Do not diagnose diseases.
- Do not prescribe medication.
- Do not provide extreme dieting advice.
- Do not recommend dangerous exercises.
- Do not encourage starvation or excessive exercise.
- If the user's information suggests a medical
  concern, recommend consulting an appropriate
  healthcare professional.

USER PROFILE:

Age: ${userContext.age}

Gender: ${userContext.gender}

Height: ${userContext.height} cm

Weight: ${userContext.weight} kg

Activity Level:
${userContext.activityLevel}

Goal:
${userContext.goal}

Diet Preference:
${userContext.dietPreference}


HEALTH METRICS:

BMI:
${userContext.bmi}

BMI Category:
${userContext.bmiCategory}

BMR:
${userContext.bmr}

TDEE:
${userContext.tdee}

Estimated Daily Calories:
${userContext.targetCalories}


CREATE:

1. A one-day diet plan.
2. A beginner-friendly workout plan.
3. General hydration guidance.
4. A short recovery/sleep recommendation.


DIET REQUIREMENTS:

- Respect the user's diet preference.
- Provide practical foods.
- Avoid unrealistic meal plans.
- Calories and protein are approximate.
- Do not claim exact nutritional values.


WORKOUT REQUIREMENTS:

- Match the user's activity level.
- Include warm-up.
- Include exercises with sets/reps or duration.
- Include cool-down.
- Avoid dangerous or extreme recommendations.


RETURN ONLY VALID JSON.

Use exactly this structure:

{
  "summary": "short summary",

  "dietPlan": {
    "meals": [
      {
        "meal": "Breakfast",
        "foods": [
          "food 1",
          "food 2"
        ],
        "approximateCalories": 400,
        "protein": 20
      }
    ]
  },

  "workoutPlan": {
    "durationMinutes": 45,
    "exercises": [
      {
        "name": "Exercise name",
        "sets": 3,
        "reps": "10-12",
        "durationMinutes": null,
        "instructions": "Short instructions"
      }
    ]
  },

  "hydration": "general hydration suggestion",

  "recovery": "sleep and recovery suggestion"
}
`;


  const response =
    await ai.models.generateContent({

      model: "gemini-3.8-flash",

      contents: prompt,

    });


  const text =
    response.text.trim();


  // Remove markdown code fences
  // if model returns them.

  const cleanedText =
    text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();


  try {

    return JSON.parse(cleanedText);

  } catch (error) {

    console.error(
      "Invalid AI JSON:",
      text
    );

    throw new Error(
      "AI returned invalid JSON"
    );

  }
};

module.exports = {
  generateHealthAdvice,
  generateChatResponse,
  generateHealthPlan
};