import { Career } from '../types';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC7j_xulPS1SP8yaMbCw71oSRUXQqQnxKg";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Generates detailed career information based on a career title
 */
export async function generateCareerDetails(
  careerTitle: string,
  examType?: string,
  studentStrengths?: string[]
): Promise<Career> {
  try {
    const strengths = studentStrengths?.join(", ") || "various skills";
    const examContext = examType 
      ? `for students who have completed ${examType} in India` 
      : "for Indian students";

    const prompt = `
    Create detailed information about a career as a ${careerTitle} ${examContext}.
    
    Include:
    1. A comprehensive description of what this career involves
    2. Skills required for success in this career
    3. Average salary range in India (in INR)
    4. Job growth prospects in India
    5. Education requirements and qualifications
    
    Format your response as a valid JSON object with the following structure. 
    Ensure that all text fields are properly escaped for JSON:
    
    {
      "id": "${careerTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}",
      "title": "${careerTitle}",
      "description": "Detailed description...",
      "skillsRequired": ["skill1", "skill2", "skill3", "skill4", "skill5"],
      "averageSalary": "₹X-Y LPA",
      "jobGrowth": "Growth forecast...",
      "educationRequired": "Education requirements...",
      "icon": "briefcase"
    }
    
    For a student with strengths in ${strengths}, tailor the description to highlight how these strengths could be valuable in this career.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0];
    
    if (!jsonStr) {
      throw new Error("Invalid response format from Gemini API");
    }
    
    return JSON.parse(jsonStr) as Career;
  } catch (error) {
    console.error("Error generating career details:", error);
    // Return a fallback career object if generation fails
    return {
      id: careerTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: careerTitle,
      description: `Career information for ${careerTitle} could not be generated. Please try again later.`,
      skillsRequired: ["Information unavailable"],
      averageSalary: "Information unavailable",
      jobGrowth: "Information unavailable",
      educationRequired: "Information unavailable",
      icon: "briefcase"
    };
  }
}

/**
 * Generates a list of career recommendations based on the exam type
 */
export async function generateExamBasedCareers(
  examType: string,
  count: number = 5
): Promise<string[]> {
  try {
    const prompt = `
    List ${count} career options that are well-suited for students who have completed ${examType} in India.
    
    Format your response as a JSON array of career titles only:
    ["Career 1", "Career 2", "Career 3", "Career 4", "Career 5"]
    
    Focus on careers that are in-demand, have good growth potential, and are directly relevant to the subjects tested in ${examType}.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonStr = text.match(/\[[\s\S]*\]/)?.[0];
    
    if (!jsonStr) {
      throw new Error("Invalid response format from Gemini API");
    }
    
    return JSON.parse(jsonStr) as string[];
  } catch (error) {
    console.error("Error generating exam-based careers:", error);
    // Return fallback careers if generation fails
    return ["Software Engineer", "Data Scientist", "Mechanical Engineer", "Doctor", "Business Analyst"];
  }
}

/**
 * Generates career options based on student interests and strengths
 */
export async function generatePersonalizedCareers(
  interests: Record<string, number>,
  strengths: string[],
  preferences: string[],
  count: number = 5
): Promise<string[]> {
  try {
    const topInterests = Object.entries(interests)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([interest]) => interest)
      .join(", ");

    const prompt = `
    Generate ${count} personalized career recommendations for an Indian student with the following profile:
    
    - Top interests: ${topInterests}
    - Strengths: ${strengths.join(", ")}
    - Career preferences: ${preferences.join(", ")}
    
    Format your response as a JSON array of career titles only:
    ["Career 1", "Career 2", "Career 3", "Career 4", "Career 5"]
    
    Suggest careers that have good prospects in India, align with the student's interests and strengths, 
    and match their stated preferences.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonStr = text.match(/\[[\s\S]*\]/)?.[0];
    
    if (!jsonStr) {
      throw new Error("Invalid response format from Gemini API");
    }
    
    return JSON.parse(jsonStr) as string[];
  } catch (error) {
    console.error("Error generating personalized careers:", error);
    // Return fallback careers if generation fails
    return ["Product Manager", "Research Scientist", "UX Designer", "Marketing Analyst", "Financial Advisor"];
  }
}