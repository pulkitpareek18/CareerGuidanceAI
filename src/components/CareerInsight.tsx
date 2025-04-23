import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { getPersonalizedCareerDescription, getExamGuidance } from '../services/geminiService';
import { Loader, Sparkles } from 'lucide-react';

interface CareerInsightProps {
  careerId: string;
  careerTitle: string;
}

const CareerInsight: React.FC<CareerInsightProps> = ({ careerId, careerTitle }) => {
  const { userProfile } = useUser();
  const [insightText, setInsightText] = useState('');
  const [examGuidance, setExamGuidance] = useState('');
  const [loading, setLoading] = useState(false);
  const [guidanceLoading, setGuidanceLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInsight = async () => {
      if (!userProfile.interests || Object.keys(userProfile.interests).length === 0) {
        return;
      }
      
      setLoading(true);
      try {
        const text = await getPersonalizedCareerDescription(careerTitle, userProfile.interests);
        setInsightText(text);
      } catch (err) {
        console.error('Error loading career insight:', err);
        setError('Failed to load AI-powered career insight');
      } finally {
        setLoading(false);
      }
    };
    
    loadInsight();
  }, [careerTitle, userProfile.interests]);

  const loadExamGuidance = async () => {
    if (!userProfile.examType) {
      return;
    }
    
    setGuidanceLoading(true);
    try {
      const guidance = await getExamGuidance(userProfile.examType, careerTitle);
      setExamGuidance(guidance);
    } catch (err) {
      console.error('Error loading exam guidance:', err);
      setError('Failed to load exam guidance');
    } finally {
      setGuidanceLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
        <Loader className="h-6 w-6 text-blue-800 animate-spin mr-2" />
        <span>Generating personalized insights...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-6 rounded-xl">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 text-blue-800 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">AI-Powered Career Insight</h3>
      </div>
      
      {insightText ? (
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-line">{insightText}</p>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">
          Complete the assessment to get personalized insights about this career.
        </p>
      )}
      
      {userProfile.examType && !examGuidance && (
        <button
          onClick={loadExamGuidance}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-800 hover:bg-blue-700"
        >
          {guidanceLoading ? (
            <>
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Loading guidance...
            </>
          ) : (
            <>Get {userProfile.examType} preparation guidance for this career</>
          )}
        </button>
      )}
      
      {examGuidance && (
        <div className="mt-6 border-t pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-3">
            {userProfile.examType} Preparation Guidance for {careerTitle}
          </h4>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{examGuidance}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerInsight;