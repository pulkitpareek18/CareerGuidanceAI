import React, { createContext, useContext, useState, useEffect } from 'react';
import { Career } from '../types';
import { careers as staticCareers } from '../data/careers'; // Import your static careers as fallback
import { generateCareerDetails, generateExamBasedCareers, generatePersonalizedCareers } from '../services/dynamicCareersService';
import { useUser } from './UserContext';

interface CareersContextType {
  careers: Career[];
  loading: boolean;
  error: string | null;
  fetchCareerById: (id: string) => Promise<Career | undefined>;
  generateCareersByExam: (examType: string) => Promise<void>;
  generateCareersByInterests: () => Promise<void>;
}

const CareersContext = createContext<CareersContextType>({
  careers: [],
  loading: false,
  error: null,
  fetchCareerById: async () => undefined,
  generateCareersByExam: async () => {},
  generateCareersByInterests: async () => {},
});

export const useCareers = () => useContext(CareersContext);

export const CareersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile } = useUser();
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [careerCache, setCareerCache] = useState<Record<string, Career>>({});

  // Initialize with static careers as fallback
  useEffect(() => {
    setCareers(staticCareers);
    
    // Create a cache from static careers for quick lookup
    const cache: Record<string, Career> = {};
    staticCareers.forEach(career => {
      cache[career.id] = career;
    });
    setCareerCache(cache);
  }, []);

  /**
   * Fetch career details by ID - will generate dynamic content if not in cache
   */
  const fetchCareerById = async (id: string): Promise<Career | undefined> => {
    // Check if we already have this career in the cache
    if (careerCache[id]) {
      return careerCache[id];
    }

    // Get the career from the current list
    const existingCareer = careers.find(c => c.id === id);
    if (existingCareer) {
      return existingCareer;
    }

    // If we don't have the career, try to generate it
    setLoading(true);
    setError(null);
    
    try {
      // Extract title from id (replace hyphens with spaces and capitalize)
      const title = id
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const careerDetails = await generateCareerDetails(
        title, 
        userProfile.examType,
        userProfile.strengths
      );
      
      // Add to cache and update careers list
      setCareerCache(prev => ({
        ...prev,
        [id]: careerDetails
      }));
      
      setCareers(prev => {
        // Don't add duplicates
        if (prev.some(c => c.id === id)) {
          return prev;
        }
        return [...prev, careerDetails];
      });
      
      return careerDetails;
    } catch (err) {
      console.error('Error generating career details:', err);
      setError('Failed to generate career details');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generate a list of careers based on the exam type
   */
  const generateCareersByExam = async (examType: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Generate career titles based on exam
      const careerTitles = await generateExamBasedCareers(examType);
      
      // Generate details for each career
      const newCareers: Career[] = [];
      
      for (const title of careerTitles) {
        const careerDetails = await generateCareerDetails(title, examType, userProfile.strengths);
        newCareers.push(careerDetails);
        
        // Add to cache
        setCareerCache(prev => ({
          ...prev,
          [careerDetails.id]: careerDetails
        }));
      }
      
      // Add the new careers to our state
      setCareers(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const uniqueNewCareers = newCareers.filter(c => !existingIds.has(c.id));
        return [...prev, ...uniqueNewCareers];
      });
    } catch (err) {
      console.error('Error generating careers by exam:', err);
      setError('Failed to generate careers based on your exam type');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generate personalized careers based on user interests and preferences
   */
  const generateCareersByInterests = async (): Promise<void> => {
    if (!userProfile.interests || Object.keys(userProfile.interests).length === 0) {
      setError('No interests data available');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Generate career titles based on interests
      const careerTitles = await generatePersonalizedCareers(
        userProfile.interests,
        userProfile.strengths || [],
        userProfile.preferences || []
      );
      
      // Generate details for each career
      const newCareers: Career[] = [];
      
      for (const title of careerTitles) {
        const careerDetails = await generateCareerDetails(
          title, 
          userProfile.examType,
          userProfile.strengths
        );
        newCareers.push(careerDetails);
        
        // Add to cache
        setCareerCache(prev => ({
          ...prev,
          [careerDetails.id]: careerDetails
        }));
      }
      
      // Add the new careers to our state
      setCareers(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const uniqueNewCareers = newCareers.filter(c => !existingIds.has(c.id));
        return [...prev, ...uniqueNewCareers];
      });
    } catch (err) {
      console.error('Error generating careers by interests:', err);
      setError('Failed to generate personalized careers');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    careers,
    loading,
    error,
    fetchCareerById,
    generateCareersByExam,
    generateCareersByInterests
  };

  return <CareersContext.Provider value={value}>{children}</CareersContext.Provider>;
};