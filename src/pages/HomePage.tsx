import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Bookmark, BarChart3, Compass, ActivitySquare, GraduationCap } from 'lucide-react';
import { useUser } from '../context/UserContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                Your AI guide for choosing the perfect career after JEE, NEET & other exams
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl">
                Discover career paths tailored to your exam results, interests, and aptitude. Get personalized guidance for top institutes in India.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => navigate('/indian-assessment')}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-blue-800 bg-white hover:bg-blue-50 transition duration-300"
                >
                  Start Career Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/careers')}
                  className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-lg text-base font-medium text-white hover:bg-blue-700 transition duration-300"
                >
                  Explore All Careers
                </button>
              </div>
            </div>
            <div className="relative lg:block hidden">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Students collaborating"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How CareerGuideAI works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Our AI-powered platform guides you from assessment to career success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ActivitySquare className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personalized Assessment
              </h3>
              <p className="text-gray-600">
                Complete our in-depth assessment to identify your unique skills, interests, and aptitudes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Matching
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your profile and matches you with career paths that align with your strengths.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Compass className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Guided Roadmap
              </h3>
              <p className="text-gray-600">
                Receive a personalized education and career roadmap to help you achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                Find the perfect courses for your career path
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Discover curated courses and certifications that will help you develop the skills needed for your dream career.
              </p>
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-teal-700 hover:bg-teal-800 transition duration-300"
              >
                Browse Courses <GraduationCap className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col space-y-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">CS50: Introduction to Computer Science</h4>
                    <p className="text-sm text-gray-500">Harvard via edX • 12 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Machine Learning</h4>
                    <p className="text-sm text-gray-500">Stanford via Coursera • 11 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">UX Design Fundamentals</h4>
                    <p className="text-sm text-gray-500">Interaction Design Foundation • 8 weeks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Join thousands of successful students
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
              Students across the globe are discovering career paths they love
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="User testimonial"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Sarah J.</h4>
                  <p className="text-sm text-gray-600">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "CareerGuideAI helped me discover my passion for UX design when I was unsure about my career path. The assessment was spot-on!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.pexels.com/photos/3831729/pexels-photo-3831729.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="User testimonial"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Miguel R.</h4>
                  <p className="text-sm text-gray-600">Engineering Graduate</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The course recommendations were incredibly helpful. I landed my dream job in cybersecurity after completing the suggested certifications."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.pexels.com/photos/5412238/pexels-photo-5412238.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="User testimonial"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Aisha T.</h4>
                  <p className="text-sm text-gray-600">Business Major</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I was surprised when CareerGuideAI suggested data science as a career path. Now I'm thriving in a role that perfectly matches my skills."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
            Ready to discover your ideal career path?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Take our comprehensive assessment and get personalized career recommendations in minutes.
          </p>
          <button
            onClick={() => navigate('/assessment')}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-lg text-lg font-medium text-blue-900 bg-white hover:bg-blue-50 shadow-lg transition duration-300"
          >
            Start Your Journey Now <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;