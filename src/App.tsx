import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CareersProvider } from './context/CareersContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import CareersPage from './pages/CareersPage';
import CareerDetailPage from './pages/CareerDetailPage';
import CoursesPage from './pages/CoursesPage';
import InternshipsPage from './pages/InternshipsPage';
import ProfilePage from './pages/ProfilePage';
import IndianAssessmentPage from './pages/IndianAssessmentPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <UserProvider>
      <CareersProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/assessment" element={<AssessmentPage />} />
                <Route path="/indian-assessment" element={<IndianAssessmentPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/careers/:id" element={<CareerDetailPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/internships" element={<InternshipsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CareersProvider>
    </UserProvider>
  );
}

export default App;