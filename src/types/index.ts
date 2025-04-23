import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types';

export interface Career {
  id: string;
  title: string;
  description: string;
  skillsRequired: string[];
  averageSalary: string;
  jobGrowth: string;
  educationRequired: string;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  link: string;
  relevantCareers: string[];
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  duration: string;
  description: string;
  requirements: string[];
  link: string;
  relevantCareers: string[];
}

export interface Assessment {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    category: string;
    value: number;
  }[];
}

export interface UserProfile {
  assessmentCompleted: boolean;
  interests: { [key: string]: number };
  savedCareers: string[];
  savedCourses: string[];
  recommendedCareers: string[];
  skillsRating: { [key: string]: number };
  // New properties for Indian students
  examType?: string;
  examScore?: string;
  preferences?: string[];
  strengths?: string[];
  suggestedInstitutes?: string[];
  suggestedSpecificCourses?: string[];
  recommendationRationale?: string;
}

// New types for Indian education context
export interface IndianExam {
  id: string;
  name: string;
  fullName: string;
  description: string;
  fields: string[];
  icon: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private' | 'Deemed';
  programs: string[];
  ranking: number;
  examAccepted: string[];
  website: string;
}

const defaultProfile: UserProfile = {
  assessmentCompleted: false,
  interests: {},
  savedCareers: [],
  savedCourses: [],
  recommendedCareers: [],
  skillsRating: {},
  // New properties for Indian students
  examType: '',
  examScore: '',
  preferences: [],
  strengths: [],
  suggestedInstitutes: [],
  suggestedSpecificCourses: [],
  recommendationRationale: '',
};

const UserContext = createContext<UserContextType>({
  userProfile: defaultProfile,
  updateInterests: () => {},
  saveCareer: () => {},
  unsaveCareer: () => {},
  saveCourse: () => {},
  unsaveCourse: () => {},
  setAssessmentCompleted: () => {},
  updateRecommendedCareers: () => {},
  updateSkillsRating: () => {},
  setExamType: () => {},
  setExamScore: () => {},
  setPreferences: () => {},
  setStrengths: () => {},
  setSuggestedInstitutes: () => {},
  setSuggestedCourses: () => {},
  setRecommendationRationale: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Existing methods
  const updateInterests = (interests: { [key: string]: number }) => {
    setUserProfile(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        ...interests,
      },
    }));
  };

  const saveCareer = (careerId: string) => {
    if (!userProfile.savedCareers.includes(careerId)) {
      setUserProfile(prev => ({
        ...prev,
        savedCareers: [...prev.savedCareers, careerId],
      }));
    }
  };

  const unsaveCareer = (careerId: string) => {
    setUserProfile(prev => ({
      ...prev,
      savedCareers: prev.savedCareers.filter(id => id !== careerId),
    }));
  };

  const saveCourse = (courseId: string) => {
    if (!userProfile.savedCourses.includes(courseId)) {
      setUserProfile(prev => ({
        ...prev,
        savedCourses: [...prev.savedCourses, courseId],
      }));
    }
  };

  const unsaveCourse = (courseId: string) => {
    setUserProfile(prev => ({
      ...prev,
      savedCourses: prev.savedCourses.filter(id => id !== courseId),
    }));
  };

  const setAssessmentCompleted = (completed: boolean) => {
    setUserProfile(prev => ({
      ...prev,
      assessmentCompleted: completed,
    }));
  };

  const updateRecommendedCareers = (careerIds: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      recommendedCareers: careerIds,
    }));
  };

  const updateSkillsRating = (skills: { [key: string]: number }) => {
    setUserProfile(prev => ({
      ...prev,
      skillsRating: {
        ...prev.skillsRating,
        ...skills,
      },
    }));
  };

  // New methods for Indian student context
  const setExamType = (examType: string) => {
    setUserProfile(prev => ({
      ...prev,
      examType,
    }));
  };

  const setExamScore = (score: string) => {
    setUserProfile(prev => ({
      ...prev,
      examScore: score,
    }));
  };

  const setPreferences = (preferences: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      preferences,
    }));
  };

  const setStrengths = (strengths: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      strengths,
    }));
  };

  const setSuggestedInstitutes = (institutes: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      suggestedInstitutes: institutes,
    }));
  };

  const setSuggestedCourses = (courses: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      suggestedSpecificCourses: courses,
    }));
  };

  const setRecommendationRationale = (rationale: string) => {
    setUserProfile(prev => ({
      ...prev,
      recommendationRationale: rationale,
    }));
  };

  const value = {
    userProfile,
    updateInterests,
    saveCareer,
    unsaveCareer,
    saveCourse,
    unsaveCourse,
    setAssessmentCompleted,
    updateRecommendedCareers,
    updateSkillsRating,
    setExamType,
    setExamScore,
    setPreferences,
    setStrengths,
    setSuggestedInstitutes,
    setSuggestedCourses,
    setRecommendationRationale,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};