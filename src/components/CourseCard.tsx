import React from 'react';
import { ExternalLink, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { Course } from '../types';
import { useUser } from '../context/UserContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { userProfile, saveCourse, unsaveCourse } = useUser();
  const isSaved = userProfile.savedCourses.includes(course.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      unsaveCourse(course.id);
    } else {
      saveCourse(course.id);
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 flex-1">{course.title}</h3>
          <button
            onClick={handleSaveToggle}
            className="text-gray-500 hover:text-blue-700 focus:outline-none transition-colors duration-200 ml-2"
          >
            {isSaved ? (
              <BookmarkCheck className="h-6 w-6 text-blue-800" />
            ) : (
              <BookmarkPlus className="h-6 w-6" />
            )}
          </button>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <span className="font-medium">{course.provider}</span>
          <span className="mx-2">•</span>
          <span>{course.duration}</span>
        </div>
        
        <div className="mt-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        
        <p className="mt-3 text-gray-600 text-sm">
          {course.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <a 
            href={course.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-800 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            View Course <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;