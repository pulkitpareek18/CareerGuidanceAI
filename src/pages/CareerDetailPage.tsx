import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookmarkPlus, BookmarkCheck, ExternalLink, TrendingUp, DollarSign, GraduationCap, Briefcase, Loader } from 'lucide-react';
import { Career, Course, Internship } from '../types';
import { useUser } from '../context/UserContext';
import { useCareers } from '../context/CareersContext';
import { courses } from '../data/courses';
import { internships } from '../data/internships';
import CourseCard from '../components/CourseCard';
import InternshipCard from '../components/InternshipCard';
import CareerInsight from '../components/CareerInsight';

const CareerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile, saveCareer, unsaveCareer } = useUser();
  const { fetchCareerById } = useCareers();
  
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isSaved = userProfile.savedCareers.includes(id || '');
  const isRecommended = userProfile.recommendedCareers.includes(id || '');

  // Get relevant courses and internships
  const relevantCourses = courses.filter(course => 
    course.relevantCareers.includes(id || '')
  );
  
  const relevantInternships = internships.filter(internship => 
    internship.relevantCareers.includes(id || '')
  );

  useEffect(() => {
    async function loadCareer() {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const careerData = await fetchCareerById(id);
        
        if (careerData) {
          setCareer(careerData);
        } else {
          setError('Career not found');
        }
      } catch (err) {
        console.error('Error loading career:', err);
        setError('Failed to load career details');
      } finally {
        setLoading(false);
      }
    }
    
    loadCareer();
  }, [id, fetchCareerById]);

  const handleSaveToggle = () => {
    if (!id) return;
    
    if (isSaved) {
      unsaveCareer(id);
    } else {
      saveCareer(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-800 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading career details...</p>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 text-red-800 p-6 rounded-xl mb-6">
            <p className="text-lg font-medium">Error: {error}</p>
          </div>
          <button
            onClick={() => navigate('/careers')}
            className="inline-flex items-center text-blue-800 hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/careers')}
            className="inline-flex items-center text-blue-800 hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Careers
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <Briefcase className="h-8 w-8 text-blue-800" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{career.title}</h1>
                  {isRecommended && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                      Recommended for You
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleSaveToggle}
                className={`inline-flex items-center px-4 py-2 border rounded-lg ${
                  isSaved 
                    ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-5 w-5 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-5 w-5 mr-2" />
                    Save Career
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-6 prose max-w-none">
              <p className="text-gray-700">{career.description}</p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-blue-800 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Average Salary</h3>
                </div>
                <p className="text-gray-700">{career.averageSalary}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-800 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Job Growth</h3>
                </div>
                <p className="text-gray-700">{career.jobGrowth}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <GraduationCap className="h-5 w-5 text-blue-800 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Education Required</h3>
                </div>
                <p className="text-gray-700">{career.educationRequired}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {career.skillsRequired.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {userProfile.assessmentCompleted && (
          <div className="mb-8">
            <CareerInsight careerId={career.id} careerTitle={career.title} />
          </div>
        )}
        
        {relevantCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recommended Courses for {career.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relevantCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
        
        {relevantInternships.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Internship Opportunities
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {relevantInternships.map(internship => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerDetailPage;