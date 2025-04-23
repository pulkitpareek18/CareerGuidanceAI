import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Loader, 
  PenTool, Award, Activity, Scale, Briefcase, Zap, BookOpen
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getCareerSuggestions } from '../services/geminiService';

// Define Indian exam data directly in the component for now
const indianExams = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    description: 'National level examination for admission to undergraduate engineering programs at NITs, IIITs, and other Centrally Funded Technical Institutions across India.',
    fields: ['Engineering', 'Technology', 'Architecture'],
    icon: 'PenTool',
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination Advanced',
    description: 'Entrance examination for admission to 23 Indian Institutes of Technology (IITs) across India. Top rankers of JEE Main are eligible to appear.',
    fields: ['Engineering', 'Technology', 'Architecture', 'Science'],
    icon: 'Award',
  },
  {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    description: 'Entrance examination for admission to MBBS, BDS, AYUSH, and other medical courses in India.',
    fields: ['Medicine', 'Dentistry', 'Ayurveda', 'Homeopathy'],
    icon: 'Activity',
  },
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    description: 'Entrance examination for admission to undergraduate and postgraduate law programs in National Law Universities across India.',
    fields: ['Law'],
    icon: 'Scale',
  },
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    description: 'Entrance examination for admission to postgraduate management programs at Indian Institutes of Management (IIMs) and other management institutes in India.',
    fields: ['Management', 'Business Administration'],
    icon: 'Briefcase',
  },
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    description: 'Examination for admission to postgraduate programs in engineering and technology across India and for recruitment in public sector companies.',
    fields: ['Engineering', 'Technology', 'Science'],
    icon: 'Zap',
  },
  {
    id: 'cucet',
    name: 'CUCET',
    fullName: 'Central Universities Common Entrance Test',
    description: 'Entrance examination for admission to undergraduate, postgraduate, and research programs in central universities across India.',
    fields: ['Arts', 'Science', 'Commerce', 'Humanities'],
    icon: 'BookOpen',
  }
];

// Create an icon map to properly reference imported icons
const iconMap = {
  PenTool,
  Award,
  Activity,
  Scale,
  Briefcase,
  Zap,
  BookOpen
};

const IndianAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    userProfile,
    updateInterests,
    updateRecommendedCareers,
    setAssessmentCompleted,
    setExamType,
    setExamScore,
    setPreferences,
    setStrengths,
    setSuggestedInstitutes,
    setSuggestedCourses,
    setRecommendationRationale
  } = useUser();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedExam, setSelectedExam] = useState('');
  const [score, setScore] = useState('');
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const strengthOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Critical Thinking', 'Problem Solving', 'Creativity', 'Communication',
    'Analytical Skills', 'Memory', 'Spatial Reasoning', 'Verbal Ability'
  ];

  const preferenceOptions = [
    'Work-Life Balance', 'High Salary', 'Job Stability', 'Research Opportunities',
    'Entrepreneurship', 'Working with People', 'Working with Technology',
    'Creative Expression', 'Public Service', 'Working Abroad', 'Field Work',
    'Desk Job', 'Prestigious Career', 'Fast Career Growth'
  ];

  const handleExamSelect = (examId: string) => {
    setSelectedExam(examId);
    const exam = indianExams.find(e => e.id === examId);
    if (exam) {
      setExamType(exam.fullName);
    }
  };

  const handleStrengthToggle = (strength: string) => {
    setSelectedStrengths(prev => 
      prev.includes(strength)
        ? prev.filter(s => s !== strength)
        : [...prev, strength]
    );
  };

  const handlePreferenceToggle = (preference: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedExam) {
      setError('Please select an exam type');
      return;
    }
    
    if (currentStep === 2 && !score) {
      setError('Please enter your score/percentile');
      return;
    }
    
    if (currentStep === 3 && selectedStrengths.length === 0) {
      setError('Please select at least one strength');
      return;
    }
    
    if (currentStep === 4 && selectedPreferences.length === 0) {
      setError('Please select at least one preference');
      return;
    }
    
    setError('');
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(e.target.value);
    setExamScore(e.target.value);
  };

  const processResults = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      // Set these values in context
      setStrengths(selectedStrengths);
      setPreferences(selectedPreferences);
      
      // Mock interests for now if they're empty
      const mockInterests = userProfile.interests && Object.keys(userProfile.interests).length > 0 
        ? userProfile.interests
        : { "Technology": 5, "Science": 4, "Engineering": 4 };
      
      // Get recommendations from Gemini API
      const result = await getCareerSuggestions(
        indianExams.find(e => e.id === selectedExam)?.fullName || '',
        score,
        mockInterests,
        selectedStrengths,
        selectedPreferences
      );
      
      // Update user profile with recommendations
      updateRecommendedCareers(result.recommendedCareers);
      setSuggestedInstitutes(result.suggestedInstitutes);
      setSuggestedCourses(result.suggestedCourses);
      setRecommendationRationale(result.rationale);
      setAssessmentCompleted(true);
      
      // Navigate to results
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('An error occurred while processing your assessment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Reset scroll position on step change
    window.scrollTo(0, 0);
  }, [currentStep]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Which entrance exam have you taken or are preparing for?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {indianExams.map((exam) => {
                // Use the icon map instead of trying to access the icon from global scope
                const IconComponent = iconMap[exam.icon as keyof typeof iconMap];
                
                return (
                  <div
                    key={exam.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedExam === exam.id
                        ? 'border-blue-800 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                    onClick={() => handleExamSelect(exam.id)}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        {IconComponent && <IconComponent className="h-5 w-5 text-blue-800" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{exam.name}</h4>
                        <p className="text-sm text-gray-600">{exam.fullName}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What was your score or percentile?
            </h3>
            <div className="space-y-2">
              <label htmlFor="score" className="block text-sm font-medium text-gray-700">
                Enter your score/percentile
              </label>
              <input
                type="text"
                id="score"
                value={score}
                onChange={handleScoreChange}
                placeholder="e.g., 95.6 percentile or 520/720"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-800 focus:border-blue-800"
              />
              <p className="text-sm text-gray-500">
                You can enter either your raw score, rank, or percentile.
              </p>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What are your academic strengths?
            </h3>
            <p className="text-gray-600 mb-4">Select all that apply (up to 5)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {strengthOptions.map((strength) => (
                <div
                  key={strength}
                  onClick={() => {
                    if (!selectedStrengths.includes(strength) && selectedStrengths.length >= 5) {
                      return;
                    }
                    handleStrengthToggle(strength);
                  }}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedStrengths.includes(strength)
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-blue-300'
                  } ${
                    !selectedStrengths.includes(strength) && selectedStrengths.length >= 5
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {strength}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Selected: {selectedStrengths.length}/5
            </p>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What are your career preferences?
            </h3>
            <p className="text-gray-600 mb-4">Select all that apply (up to 5)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {preferenceOptions.map((preference) => (
                <div
                  key={preference}
                  onClick={() => {
                    if (!selectedPreferences.includes(preference) && selectedPreferences.length >= 5) {
                      return;
                    }
                    handlePreferenceToggle(preference);
                  }}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedPreferences.includes(preference)
                      ? 'border-blue-800 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-blue-300'
                  } ${
                    !selectedPreferences.includes(preference) && selectedPreferences.length >= 5
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {preference}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Selected: {selectedPreferences.length}/5
            </p>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-blue-800" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Ready to Generate Your Personalized Career Path
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Based on your {indianExams.find(e => e.id === selectedExam)?.name} results, academic strengths,
              and career preferences, we'll use AI to generate personalized career recommendations tailored
              specifically for you.
            </p>
            
            <button
              onClick={processResults}
              disabled={isProcessing}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-800 hover:bg-blue-700 transition duration-300 shadow-md w-full sm:w-auto disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader className="animate-spin mr-2 h-5 w-5" />
                  Generating Recommendations...
                </>
              ) : (
                <>
                  Generate My Career Path
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Indian Education Career Assessment</h2>
          <p className="mt-2 text-gray-600">
            Let us help you find the perfect career path after your entrance exams
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step
                      ? 'bg-blue-800 text-white'
                      : currentStep > step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                <span className="text-xs mt-2 hidden sm:block">
                  {step === 1 ? 'Exam' : 
                   step === 2 ? 'Score' : 
                   step === 3 ? 'Strengths' : 
                   step === 4 ? 'Preferences' : 'Summary'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full mt-4 mb-8">
            <div
              className="h-1 bg-blue-800 rounded-full"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto mb-8 transition-all duration-500">
          {renderStepContent()}
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 1 && currentStep < 5 ? (
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 5 && (
            <button
              onClick={handleNext}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-800 hover:bg-blue-700 shadow-md"
            >
              Next <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndianAssessmentPage;