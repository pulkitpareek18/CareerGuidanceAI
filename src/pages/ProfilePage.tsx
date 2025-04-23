import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { careers } from '../data/careers';
import { courses } from '../data/courses';
import { BookmarkX, Briefcase, GraduationCap, ChevronRight, AlertCircle, BarChart3, Activity } from 'lucide-react';
import CareerCard from '../components/CareerCard';
import CourseCard from '../components/CourseCard';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, unsaveCareer, unsaveCourse } = useUser();
  
  const savedCareers = careers.filter(career => 
    userProfile.savedCareers.includes(career.id)
  );
  
  const savedCourses = courses.filter(course => 
    userProfile.savedCourses.includes(course.id)
  );
  
  const recommendedCareers = careers.filter(career => 
    userProfile.recommendedCareers.includes(career.id)
  );

  // Get the top 3 interest categories
  const interestCategories = Object.entries(userProfile.interests || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category]) => category);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Manage your saved careers and courses
          </p>
        </div>

        {!userProfile.assessmentCompleted ? (
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 flex items-start mb-10">
            <div className="text-orange-600 flex-shrink-0 mr-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-orange-800">Assessment Not Completed</h3>
              <p className="text-orange-700 mt-1">Complete the assessment to get personalized career recommendations.</p>
              <button
                onClick={() => navigate('/assessment')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
              >
                Take Assessment <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-800" />
              Your Assessment Results
            </h2>
            
            {interestCategories.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">Your Top Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interestCategories.map((category, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 capitalize"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            
            {recommendedCareers.length > 0 ? (
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Recommended Career Paths</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedCareers.map(career => (
                    <div 
                      key={career.id}
                      onClick={() => navigate(`/careers/${career.id}`)}
                      className="p-4 border border-gray-200 rounded-lg flex items-start hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="mr-3 mt-1 text-blue-800">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{career.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{career.averageSalary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {savedCareers.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Briefcase className="mr-2 h-6 w-6" />
              Saved Careers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCareers.map(career => (
                <CareerCard 
                  key={career.id} 
                  career={career} 
                  isRecommended={userProfile.recommendedCareers.includes(career.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {savedCareers.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center mb-10">
            <Briefcase className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No Saved Careers</h3>
            <p className="text-gray-600 mb-4">You haven't saved any careers yet.</p>
            <button
              onClick={() => navigate('/careers')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-800 hover:bg-blue-700"
            >
              Explore Careers <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        )}

        {savedCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <GraduationCap className="mr-2 h-6 w-6" />
              Saved Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
        
        {savedCourses.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center">
            <GraduationCap className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No Saved Courses</h3>
            <p className="text-gray-600 mb-4">You haven't saved any courses yet.</p>
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-700 hover:bg-teal-800"
            >
              Browse Courses <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;