import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { assessments } from '../data/assessments';
import { careers } from '../data/careers';
import { Assessment } from '../types';
import AssessmentQuestion from '../components/AssessmentQuestion';
import { useUser } from '../context/UserContext';

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateInterests, updateRecommendedCareers, setAssessmentCompleted } = useUser();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: { optionId: string; category: string; value: number } }>({});
  const [isComplete, setIsComplete] = useState(false);
  const [interests, setInterests] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Reset scroll position on question change
    window.scrollTo(0, 0);
  }, [currentQuestionIndex]);

  const handleSelect = (optionId: string, category: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [assessments[currentQuestionIndex].id]: { optionId, category, value }
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessments.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Process completed assessment
      processResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const processResults = () => {
    // Calculate interests based on answers
    const newInterests: { [key: string]: number } = {};
    
    Object.values(answers).forEach(answer => {
      const { category, value } = answer;
      newInterests[category] = (newInterests[category] || 0) + value;
    });
    
    setInterests(newInterests);
    updateInterests(newInterests);
    
    // Calculate recommended careers
    const recommendedCareers = findRecommendedCareers(newInterests);
    updateRecommendedCareers(recommendedCareers);
    
    setIsComplete(true);
    setAssessmentCompleted(true);
  };

  const findRecommendedCareers = (interests: { [key: string]: number }): string[] => {
    // This is a simplified matching algorithm
    // In a real app, this would be more sophisticated
    const careerScores: { id: string; score: number }[] = careers.map(career => {
      let score = 0;
      
      // Very simplified scoring based on key categories
      if (interests.analytical && career.id === 'data-scientist') score += interests.analytical;
      if (interests.technical && career.id === 'software-developer') score += interests.technical;
      if (interests.creative && career.id === 'ux-designer') score += interests.creative;
      if (interests.security && career.id === 'cybersecurity-analyst') score += interests.security;
      if (interests.people && career.id === 'marketing-specialist') score += interests.people;
      if (interests.leadership && career.id === 'healthcare-administrator') score += interests.leadership;
      
      // Additional weights
      if (interests.innovation && career.id === 'software-developer') score += interests.innovation * 0.5;
      if (interests.innovation && career.id === 'ux-designer') score += interests.innovation * 0.7;
      if (interests.analytical && career.id === 'cybersecurity-analyst') score += interests.analytical * 0.6;
      if (interests.ai && career.id === 'data-scientist') score += interests.ai * 0.8;
      
      return { id: career.id, score };
    });
    
    // Sort by score and return top 3
    return careerScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(career => career.id);
  };

  const currentQuestion: Assessment = assessments[currentQuestionIndex];
  const selectedOption = answers[currentQuestion.id]?.optionId || null;
  const isNextDisabled = selectedOption === null;

  if (isComplete) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Assessment Complete!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Based on your responses, we've found career paths that match your skills and interests.
            </p>
            
            <button
              onClick={() => navigate('/careers')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-800 hover:bg-blue-700 transition duration-300 shadow-md w-full sm:w-auto"
            >
              View Your Career Matches <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Career Interest Assessment</h2>
          <p className="mt-2 text-gray-600">
            Answer the following questions to help us find your ideal career path.
          </p>
        </div>

        <AssessmentQuestion 
          question={currentQuestion}
          selectedOption={selectedOption}
          onSelect={handleSelect}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={assessments.length}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
              currentQuestionIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </button>
          
          <button
            onClick={handleNext}
            className={`inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium ${
              isNextDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'text-white bg-blue-800 hover:bg-blue-700 shadow-md'
            }`}
            disabled={isNextDisabled}
          >
            {currentQuestionIndex < assessments.length - 1 ? (
              <>Next <ArrowRight className="ml-2 h-5 w-5" /></>
            ) : (
              <>Complete Assessment <CheckCircle className="ml-2 h-5 w-5" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;