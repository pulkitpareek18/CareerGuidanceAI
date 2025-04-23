import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">CareerGuide<span className="text-blue-400">AI</span></span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Helping students find their ideal career path through personalized AI-powered guidance.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-base text-gray-400 hover:text-white">
                  Assessment
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-base text-gray-400 hover:text-white">
                  Courses
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">
                  Career Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">
                  Interview Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">
                  Career Events
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:info@careerguideai.com" className="text-base text-gray-400 hover:text-white flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>info@careerguideai.com</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} CareerGuideAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;