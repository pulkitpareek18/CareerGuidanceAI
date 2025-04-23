import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkPlus, BookmarkCheck, BookmarkX, ArrowRight, CheckCircle } from 'lucide-react';
import { Career } from '../types';
import { useUser } from '../context/UserContext';
import * as Icons from 'lucide-react';

interface CareerCardProps {
  career: Career;
  isRecommended?: boolean;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, isRecommended = false }) => {
  const navigate = useNavigate();
  const { userProfile, saveCareer, unsaveCareer } = useUser();
  const isSaved = userProfile.savedCareers.includes(career.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      unsaveCareer(career.id);
    } else {
      saveCareer(career.id);
    }
  };

  const CareerIcon = (Icons as any)[career.icon] || Icons.Briefcase;

  return (
    <div 
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${
        isRecommended ? 'border-2 border-blue-500' : 'border border-gray-200'
      }`}
      onClick={() => navigate(`/careers/${career.id}`)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-full ${
              isRecommended ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
            }`}>
              <CareerIcon className="h-6 w-6" />
            </div>
            <h3 className="ml-3 text-xl font-semibold text-gray-900">{career.title}</h3>
          </div>
          <button
            onClick={handleSaveToggle}
            className="text-gray-500 hover:text-blue-700 focus:outline-none transition-colors duration-200"
          >
            {isSaved ? (
              <BookmarkCheck className="h-6 w-6 text-blue-800" />
            ) : (
              <BookmarkPlus className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {isRecommended && (
          <div className="flex items-center mb-3 text-blue-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Recommended for you</span>
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {career.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Avg. Salary</span>
            <span className="font-medium text-gray-900">{career.averageSalary}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Job Growth</span>
            <span className="font-medium text-green-700">{career.jobGrowth}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-end text-blue-800 text-sm font-medium">
          <span className="mr-1">View Details</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default CareerCard;