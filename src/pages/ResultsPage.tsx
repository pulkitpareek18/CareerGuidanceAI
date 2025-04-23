import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Building, GraduationCap, MessageSquare, BarChart, MapPin, Loader } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useCareers } from '../context/CareersContext';
import CareerCard from '../components/CareerCard';
import { Career } from '../types';
import { careers as staticCareers } from '../data/careers'; // Fallback to static careers if needed

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const { careers: dynamicCareers, loading, error, generateCareersByExam, fetchCareerById } = useCareers();
  const [recommendedCareers, setRecommendedCareers] = useState<Career[]>([]);
  const [loadingCareers, setLoadingCareers] = useState(false);

  // If assessment not completed, redirect to assessment
  useEffect(() => {
    if (!userProfile.assessmentCompleted) {
      navigate('/indian-assessment');
    }
  }, [userProfile.assessmentCompleted, navigate]);

  // Load recommended careers
  useEffect(() => {
    const loadRecommendedCareers = async () => {
      if (!userProfile.recommendedCareers || userProfile.recommendedCareers.length === 0) {
        return;
      }

      setLoadingCareers(true);
      try {
        const loadedCareers: Career[] = [];
        
        // Try to find careers in dynamicCareers first
        for (const careerId of userProfile.recommendedCareers) {
          // Check if career exists in dynamic careers
          const existingCareer = dynamicCareers.find(c => c.id === careerId);
          
          if (existingCareer) {
            loadedCareers.push(existingCareer);
          } else {
            // If not in dynamic careers, try to find in static careers
            const staticCareer = staticCareers.find(c => c.id === careerId);
            
            if (staticCareer) {
              loadedCareers.push(staticCareer);
            } else {
              // If not found anywhere, try to fetch it
              try {
                const fetchedCareer = await fetchCareerById(careerId);
                if (fetchedCareer) {
                  loadedCareers.push(fetchedCareer);
                }
              } catch (err) {
                console.error(`Failed to fetch career ${careerId}:`, err);
              }
            }
          }
        }
        
        setRecommendedCareers(loadedCareers);
      } finally {
        setLoadingCareers(false);
      }
    };

    loadRecommendedCareers();
  }, [userProfile.recommendedCareers, dynamicCareers, fetchCareerById]);

  // Generate exam-based career recommendations if needed
  useEffect(() => {
    const fetchExamRecommendations = async () => {
      // Only fetch if we have exam type, have no recommendations, and aren't already loading
      if (
        userProfile.examType && 
        (!userProfile.recommendedCareers || userProfile.recommendedCareers.length === 0) && 
        !loading && 
        !loadingCareers
      ) {
        setLoadingCareers(true);
        try {
          await generateCareersByExam(userProfile.examType);
        } finally {
          setLoadingCareers(false);
        }
      }
    };

    fetchExamRecommendations();
  }, [
    userProfile.examType, 
    userProfile.recommendedCareers, 
    generateCareersByExam, 
    loading, 
    loadingCareers
  ]);

  // Fallback: If still no recommendations and careers are loaded, show some from available careers
  useEffect(() => {
    if (
      recommendedCareers.length === 0 && 
      !loadingCareers && 
      !loading && 
      dynamicCareers.length > 0
    ) {
      // Pick first 3 careers as recommendations
      setRecommendedCareers(dynamicCareers.slice(0, 3));
    }
  }, [recommendedCareers.length, loadingCareers, loading, dynamicCareers]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Your Personalized Career Recommendations
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Based on your {userProfile.examType} results and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="mr-2 h-6 w-6 text-blue-800" />
              AI Career Analysis
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">
                {userProfile.recommendationRationale || 
                  "Based on your assessment, we've analyzed your strengths, preferences, and exam results to provide these recommendations."}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-blue-800" />
              Your Profile
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Exam</h3>
                <p className="font-medium">{userProfile.examType}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Score/Percentile</h3>
                <p className="font-medium">{userProfile.examScore}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Top Strengths</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userProfile.strengths?.map((strength, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Career Preferences</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userProfile.preferences?.map((preference, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {preference}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <GraduationCap className="mr-2 h-6 w-6" />
            Recommended Careers
          </h2>
          
          {(loading || loadingCareers) ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 text-blue-800 animate-spin mr-3" />
              <p className="text-lg text-gray-600">Generating AI-powered career recommendations...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-6 rounded-lg">
              <p>{error}</p>
            </div>
          ) : recommendedCareers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCareers.map(career => (
                <CareerCard 
                  key={career.id} 
                  career={career} 
                  isRecommended={true}
                />
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <p className="text-lg text-yellow-800 mb-2">We're preparing your career recommendations</p>
              <p className="text-yellow-700">
                This might take a moment as we analyze your assessment results and find the best matches.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            Recommended Courses & Programs
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {userProfile.suggestedSpecificCourses?.map((course, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <GraduationCap className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{course}</h3>
                    </div>
                  </div>
                ))}
                
                {!userProfile.suggestedSpecificCourses?.length && (
                  <p className="text-gray-500 text-center py-4">
                    No specific courses recommended yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Building className="mr-2 h-6 w-6" />
            Recommended Institutions
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {userProfile.suggestedInstitutes?.map((institute, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 bg-purple-100 rounded-full mr-3">
                      <MapPin className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{institute}</h3>
                    </div>
                  </div>
                ))}
                
                {!userProfile.suggestedInstitutes?.length && (
                  <p className="text-gray-500 text-center py-4">
                    No specific institutions recommended yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate('/careers')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-800 hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Explore All Career Options <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;