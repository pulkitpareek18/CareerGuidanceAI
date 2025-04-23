import React, { useEffect, useState, useRef } from 'react';
import { Search, Filter, Loader } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useCareers } from '../context/CareersContext';
import CareerCard from '../components/CareerCard';

const CareersPage: React.FC = () => {
  const { userProfile } = useUser();
  const { careers, loading, error, generateCareersByInterests } = useCareers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCareers, setFilteredCareers] = useState(careers);
  const [filters, setFilters] = useState({
    saved: false,
    recommended: false,
  });

  // Track whether we've already triggered career generation
  const hasTriggeredGeneration = useRef(false);

  // Generate interest-based careers when component mounts - ONCE only
  useEffect(() => {
    // Only run career generation if:
    // 1. We haven't triggered it yet
    // 2. We have user interests
    // 3. We're not already loading careers
    if (
      !hasTriggeredGeneration.current && 
      userProfile.interests && 
      Object.keys(userProfile.interests).length > 0 && 
      !loading &&
      careers.length < 10 // Only generate if we don't have many careers yet
    ) {
      hasTriggeredGeneration.current = true; // Mark as triggered
      generateCareersByInterests();
    }
  }, [generateCareersByInterests, userProfile.interests, loading, careers.length]);

  // Filter careers whenever search term, filters, or careers change
  useEffect(() => {
    let result = careers;

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        career => 
          career.title.toLowerCase().includes(lowerSearchTerm) ||
          career.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply saved filter
    if (filters.saved) {
      result = result.filter(career => userProfile.savedCareers.includes(career.id));
    }

    // Apply recommended filter
    if (filters.recommended) {
      result = result.filter(career => userProfile.recommendedCareers.includes(career.id));
    }

    setFilteredCareers(result);
  }, [searchTerm, filters, careers, userProfile.savedCareers, userProfile.recommendedCareers]);

  const handleFilterChange = (filterType: 'saved' | 'recommended') => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  // Function to manually trigger career generation
  const handleGenerateMoreCareers = () => {
    if (!loading) {
      generateCareersByInterests();
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Careers</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover various career paths that align with your interests, skills, and education.
            Click on any career to learn more about requirements, salary expectations, and growth opportunities.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search careers..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-800 focus:border-blue-800"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleFilterChange('saved')}
              className={`px-4 py-2 border rounded-lg flex items-center ${
                filters.saved 
                  ? 'bg-blue-800 text-white border-blue-800' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Saved
            </button>
            
            <button
              onClick={() => handleFilterChange('recommended')}
              className={`px-4 py-2 border rounded-lg flex items-center ${
                filters.recommended 
                  ? 'bg-blue-800 text-white border-blue-800' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Recommended
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-blue-800 animate-spin mr-3" />
            <p className="text-lg text-gray-600">Generating career options...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-6 rounded-lg">
            <p>{error}</p>
          </div>
        ) : filteredCareers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredCareers.map(career => (
                <CareerCard 
                  key={career.id} 
                  career={career} 
                  isRecommended={userProfile.recommendedCareers.includes(career.id)} 
                />
              ))}
            </div>
            
            {/* Button to manually generate more careers */}
            {!loading && careers.length < 20 && (
              <div className="text-center mt-8">
                <button
                  onClick={handleGenerateMoreCareers}
                  disabled={loading}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-800 hover:bg-blue-700 transition duration-300 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin mr-2 h-5 w-5" />
                      Generating More Options...
                    </>
                  ) : (
                    "Generate More Career Options"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">No careers found</p>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersPage;