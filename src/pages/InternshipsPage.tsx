import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { internships } from '../data/internships';
import InternshipCard from '../components/InternshipCard';
import { useUser } from '../context/UserContext';

const InternshipsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInternships, setFilteredInternships] = useState(internships);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const { userProfile } = useUser();

  useEffect(() => {
    let filtered = internships.filter(internship => 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (remoteOnly) {
      filtered = filtered.filter(internship => internship.remote);
    }
    
    setFilteredInternships(filtered);
  }, [searchTerm, remoteOnly]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Internship Opportunities
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Discover internships that align with your career interests and help build your experience
          </p>
        </div>

        <div className="mb-8">
          <div className="max-w-lg mx-auto">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600 shadow-sm"
                placeholder="Search by title, company, or keywords..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex items-center justify-center">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  className="sr-only peer"
                  checked={remoteOnly}
                  onChange={() => setRemoteOnly(!remoteOnly)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">Remote Only</span>
              </label>
            </div>
          </div>
        </div>

        {userProfile.recommendedCareers.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recommended Internships Based on Your Career Interests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internships
                .filter(internship => {
                  return internship.relevantCareers.some(careerId => 
                    userProfile.recommendedCareers.includes(careerId)
                  );
                })
                .slice(0, 2)
                .map(internship => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))
              }
            </div>
          </div>
        )}
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Internships
          </h2>
          <span className="text-sm text-gray-600">{filteredInternships.length} opportunities found</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInternships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
          
          {filteredInternships.length === 0 && (
            <div className="col-span-2 py-12 text-center">
              <p className="text-gray-600 text-lg">No internships found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipsPage;