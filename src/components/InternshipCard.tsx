import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
            <p className="text-gray-700 font-medium mt-1">{internship.company}</p>
          </div>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
            <span>{internship.location}</span>
          </div>
          {internship.remote && (
            <span className="ml-3 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
              Remote Available
            </span>
          )}
        </div>
        
        <div className="mt-3 text-gray-600 text-sm">
          <span className="font-medium">Duration:</span> {internship.duration}
        </div>
        
        <p className="mt-3 text-gray-600 text-sm line-clamp-3">
          {internship.description}
        </p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            {internship.requirements.slice(0, 2).map((requirement, index) => (
              <li key={index} className="line-clamp-1">{requirement}</li>
            ))}
            {internship.requirements.length > 2 && (
              <li className="text-gray-500">+ {internship.requirements.length - 2} more</li>
            )}
          </ul>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <a 
            href={internship.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-800 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            Apply Now <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;