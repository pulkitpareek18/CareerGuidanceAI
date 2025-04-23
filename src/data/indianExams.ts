import { IndianExam } from '../types';

export const indianExams: IndianExam[] = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    description: 'National level examination for admission to undergraduate engineering programs at NITs, IIITs, and other Centrally Funded Technical Institutions across India.',
    fields: ['Engineering', 'Technology', 'Architecture'],
    icon: 'pen-tool',
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination Advanced',
    description: 'Entrance examination for admission to 23 Indian Institutes of Technology (IITs) across India. Top rankers of JEE Main are eligible to appear.',
    fields: ['Engineering', 'Technology', 'Architecture', 'Science'],
    icon: 'award',
  },
  {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    description: 'Entrance examination for admission to MBBS, BDS, AYUSH, and other medical courses in India.',
    fields: ['Medicine', 'Dentistry', 'Ayurveda', 'Homeopathy'],
    icon: 'activity',
  },
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    description: 'Entrance examination for admission to undergraduate and postgraduate law programs in National Law Universities across India.',
    fields: ['Law'],
    icon: 'scale',
  },
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    description: 'Entrance examination for admission to postgraduate management programs at Indian Institutes of Management (IIMs) and other management institutes in India.',
    fields: ['Management', 'Business Administration'],
    icon: 'briefcase',
  },
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    description: 'Examination for admission to postgraduate programs in engineering and technology across India and for recruitment in public sector companies.',
    fields: ['Engineering', 'Technology', 'Science'],
    icon: 'zap',
  },
  {
    id: 'cucet',
    name: 'CUCET',
    fullName: 'Central Universities Common Entrance Test',
    description: 'Entrance examination for admission to undergraduate, postgraduate, and research programs in central universities across India.',
    fields: ['Arts', 'Science', 'Commerce', 'Humanities'],
    icon: 'book-open',
  }
];