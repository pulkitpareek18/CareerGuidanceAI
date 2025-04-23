import React from 'react';
import { Assessment } from '../types';

interface AssessmentQuestionProps {
  question: Assessment;
  selectedOption: string | null;
  onSelect: (optionId: string, category: string, value: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  selectedOption,
  onSelect,
  currentQuestionIndex,
  totalQuestions
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto mb-8 transition-all duration-500">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        <div className="h-2 bg-gray-200 rounded-full w-48">
          <div 
            className="h-2 bg-blue-800 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedOption === option.id
                ? 'border-blue-800 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/30'
            }`}
            onClick={() => onSelect(option.id, option.category, option.value)}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-5 w-5 border rounded-full flex items-center justify-center ${
                selectedOption === option.id ? 'border-blue-800' : 'border-gray-400'
              }`}>
                {selectedOption === option.id && (
                  <div className="h-3 w-3 rounded-full bg-blue-800"></div>
                )}
              </div>
              <span className={`ml-3 ${
                selectedOption === option.id ? 'text-gray-900 font-medium' : 'text-gray-700'
              }`}>
                {option.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentQuestion;