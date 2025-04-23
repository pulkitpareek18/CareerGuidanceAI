import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { courses } from '../data/courses';
import CourseCard from '../components/CourseCard';
import { useUser } from '../context/UserContext';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const { userProfile } = useUser();

  useEffect(() => {
    let filtered = courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filterLevel !== 'all') {
      filtered = filtered.filter(course => course.level === filterLevel);
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, filterLevel]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Discover Courses & Certifications
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Find courses that will help you build the skills needed for your ideal career
          </p>
        </div>

        <div className="mb-8">
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-600 focus:border-teal-600 shadow-sm"
                placeholder="Search courses by title or keywords..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Courses
          </h2>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filterLevel === 'all' 
                  ? 'bg-teal-700 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Levels
            </button>
            <button
              onClick={() => setFilterLevel('Beginner')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filterLevel === 'Beginner' 
                  ? 'bg-green-700 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Beginner
            </button>
            <button
              onClick={() => setFilterLevel('Intermediate')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filterLevel === 'Intermediate' 
                  ? 'bg-blue-700 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Intermediate
            </button>
            <button
              onClick={() => setFilterLevel('Advanced')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filterLevel === 'Advanced' 
                  ? 'bg-purple-700 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Advanced
            </button>
          </div>
        </div>

        {userProfile.recommendedCareers.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recommended Courses Based on Your Career Interests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => {
                  return course.relevantCareers.some(careerId => 
                    userProfile.recommendedCareers.includes(careerId)
                  );
                })
                .slice(0, 3)
                .map(course => (
                  <CourseCard key={course.id} course={course} />
                ))
              }
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-3 py-12 text-center">
              <p className="text-gray-600 text-lg">No courses found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;