import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types';

interface UserContextType {
  userProfile: UserProfile;
  updateInterests: (interests: { [key: string]: number }) => void;
  saveCareer: (careerId: string) => void;
  unsaveCareer: (careerId: string) => void;
  saveCourse: (courseId: string) => void;
  unsaveCourse: (courseId: string) => void;
  setAssessmentCompleted: (completed: boolean) => void;
  updateRecommendedCareers: (careerIds: string[]) => void;
  updateSkillsRating: (skills: { [key: string]: number }) => void;
  // New additions for Indian student context
  setExamType: (examType: string) => void;
  setExamScore: (score: string) => void;
  setPreferences: (preferences: string[]) => void;
  setStrengths: (strengths: string[]) => void;
  setSuggestedInstitutes: (institutes: string[]) => void;
  setSuggestedCourses: (courses: string[]) => void;
  setRecommendationRationale: (rationale: string) => void;
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
        ...interests
      }
    }));
  };

  const saveCareer = (careerId: string) => {
    if (!userProfile.savedCareers.includes(careerId)) {
      setUserProfile(prev => ({
        ...prev,
        savedCareers: [...prev.savedCareers, careerId]
      }));
    }
  };

  const unsaveCareer = (careerId: string) => {
    setUserProfile(prev => ({
      ...prev,
      savedCareers: prev.savedCareers.filter(id => id !== careerId)
    }));
  };

  const saveCourse = (courseId: string) => {
    if (!userProfile.savedCourses.includes(courseId)) {
      setUserProfile(prev => ({
        ...prev,
        savedCourses: [...prev.savedCourses, courseId]
      }));
    }
  };

  const unsaveCourse = (courseId: string) => {
    setUserProfile(prev => ({
      ...prev,
      savedCourses: prev.savedCourses.filter(id => id !== courseId)
    }));
  };

  const setAssessmentCompleted = (completed: boolean) => {
    setUserProfile(prev => ({
      ...prev,
      assessmentCompleted: completed
    }));
  };

  const updateRecommendedCareers = (careerIds: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      recommendedCareers: careerIds
    }));
  };

  const updateSkillsRating = (skills: { [key: string]: number }) => {
    setUserProfile(prev => ({
      ...prev,
      skillsRating: {
        ...prev.skillsRating,
        ...skills
      }
    }));
  };

  // New methods for Indian student context
  const setExamType = (examType: string) => {
    setUserProfile(prev => ({
      ...prev,
      examType
    }));
  };

  const setExamScore = (score: string) => {
    setUserProfile(prev => ({
      ...prev,
      examScore: score
    }));
  };

  const setPreferences = (preferences: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      preferences
    }));
  };

  const setStrengths = (strengths: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      strengths
    }));
  };

  const setSuggestedInstitutes = (institutes: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      suggestedInstitutes: institutes
    }));
  };

  const setSuggestedCourses = (courses: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      suggestedSpecificCourses: courses
    }));
  };

  const setRecommendationRationale = (rationale: string) => {
    setUserProfile(prev => ({
      ...prev,
      recommendationRationale: rationale
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
    setRecommendationRationale
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};