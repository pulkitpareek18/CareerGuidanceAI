import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
// Replace with your actual API key and store it properly in env variables for production
const API_KEY = "AIzaSyA_GejZCGHXCqc7_hDgLxDtNEqRR_lDIX4";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

interface CareerSuggestionResponse {
  recommendedCareers: string[];
  rationale: string;
  suggestedCourses: string[];
  suggestedInstitutes: string[];
}

export async function getCareerSuggestions(
  examType: string,
  score: string,
  interests: Record<string, number>,
  strengths: string[],
  preferences: string[]
): Promise<CareerSuggestionResponse> {
  try {
    // Create a structured prompt for the Gemini API
    const prompt = `
    As a career counselor for Indian students who have completed ${examType}, please provide career guidance based on the following information:
    
    - Exam: ${examType} 
    - Score/Percentile: ${score}
    - Student's interests: ${Object.entries(interests)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([interest, value]) => `${interest} (score: ${value})`)
      .join(", ")}
    - Strengths: ${strengths.join(", ")}
    - Preferences: ${preferences.join(", ")}
    
    Suggest suitable career paths for this student. Consider the Indian education system, available colleges and entrance requirements.
    
    Provide your response in the following JSON format:
    {
      "recommendedCareers": ["career1", "career2", "career3"],
      "rationale": "explanation for these recommendations",
      "suggestedCourses": ["course1", "course2", "course3"],
      "suggestedInstitutes": ["institute1", "institute2", "institute3"]
    }`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0];
    
    if (!jsonStr) {
      throw new Error("Invalid response format from Gemini API");
    }
    
    return JSON.parse(jsonStr) as CareerSuggestionResponse;
  } catch (error) {
    console.error("Error getting career suggestions:", error);
    throw error;
  }
}

export async function getPersonalizedCareerDescription(
  career: string, 
  studentInterests: Record<string, number>
): Promise<string> {
  try {
    const interests = Object.entries(studentInterests)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([interest]) => interest)
      .join(", ");
    
    const prompt = `
    As a career counselor for Indian students, provide a personalized description of a career as a ${career}.
    
    Tailor this description to a student with interests in ${interests}.
    
    Focus on:
    1. How this career aligns with the student's interests
    2. Career prospects in India
    3. Required skills and education path
    4. Top institutes in India for this career
    5. Expected salary range in India
    
    Keep the response conversational, informative, and under 200 words.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error getting personalized career description:", error);
    throw error;
  }
}

export async function getExamGuidance(
  examType: string,
  targetCareer: string
): Promise<string> {
  try {
    const prompt = `
    Provide guidance for an Indian student preparing for ${examType} who wants to pursue a career in ${targetCareer}.
    
    Include:
    1. Important subjects to focus on
    2. Recommended study materials and coaching
    3. Key topics that are frequently tested
    4. Time management and preparation strategies
    5. Cutoffs and requirements for top colleges
    
    Keep the response conversational, specific to the Indian education system, and under 250 words.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error getting exam guidance:", error);
    throw error;
  }
}