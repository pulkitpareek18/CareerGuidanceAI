import { Assessment } from '../types';

export const assessments: Assessment[] = [
  {
    id: '1',
    question: 'Which of these activities do you find most enjoyable?',
    options: [
      { id: '1a', text: 'Solving complex puzzles or problems', category: 'analytical', value: 5 },
      { id: '1b', text: 'Creating visual designs or artwork', category: 'creative', value: 5 },
      { id: '1c', text: 'Helping others learn or understand concepts', category: 'people', value: 5 },
      { id: '1d', text: 'Building or fixing things', category: 'technical', value: 5 }
    ]
  },
  {
    id: '2',
    question: 'In a group project, which role do you naturally take?',
    options: [
      { id: '2a', text: 'The organizer who plans and coordinates', category: 'leadership', value: 5 },
      { id: '2b', text: 'The creative one who generates ideas', category: 'creative', value: 5 },
      { id: '2c', text: 'The analyst who evaluates options', category: 'analytical', value: 5 },
      { id: '2d', text: 'The supporter who helps team members', category: 'people', value: 5 }
    ]
  },
  {
    id: '3',
    question: 'Which subject do you find most interesting?',
    options: [
      { id: '3a', text: 'Mathematics or physics', category: 'analytical', value: 5 },
      { id: '3b', text: 'Art or design', category: 'creative', value: 5 },
      { id: '3c', text: 'Psychology or sociology', category: 'people', value: 5 },
      { id: '3d', text: 'Computer science or engineering', category: 'technical', value: 5 }
    ]
  },
  {
    id: '4',
    question: 'Which skill would you most like to develop?',
    options: [
      { id: '4a', text: 'Coding or software development', category: 'technical', value: 5 },
      { id: '4b', text: 'Communication and negotiation', category: 'people', value: 5 },
      { id: '4c', text: 'Data analysis and interpretation', category: 'analytical', value: 5 },
      { id: '4d', text: 'Design and visual storytelling', category: 'creative', value: 5 }
    ]
  },
  {
    id: '5',
    question: 'What kind of work environment do you prefer?',
    options: [
      { id: '5a', text: 'Fast-paced with changing priorities', category: 'adaptability', value: 5 },
      { id: '5b', text: 'Structured with clear expectations', category: 'organization', value: 5 },
      { id: '5c', text: 'Collaborative with team interactions', category: 'people', value: 5 },
      { id: '5d', text: 'Independent with focus time', category: 'autonomy', value: 5 }
    ]
  },
  {
    id: '6',
    question: 'How do you approach learning something new?',
    options: [
      { id: '6a', text: 'Research thoroughly before starting', category: 'analytical', value: 5 },
      { id: '6b', text: 'Jump in and learn by doing', category: 'practical', value: 5 },
      { id: '6c', text: 'Find someone to teach or guide you', category: 'people', value: 5 },
      { id: '6d', text: 'Watch videos or demonstrations first', category: 'observational', value: 5 }
    ]
  },
  {
    id: '7',
    question: 'What achievement would make you most proud?',
    options: [
      { id: '7a', text: 'Creating an innovative solution to a problem', category: 'innovation', value: 5 },
      { id: '7b', text: 'Being recognized as an expert in your field', category: 'mastery', value: 5 },
      { id: '7c', text: 'Making a positive impact on people\'s lives', category: 'impact', value: 5 },
      { id: '7d', text: 'Building something tangible that lasts', category: 'creation', value: 5 }
    ]
  },
  {
    id: '8',
    question: 'Which technology interests you most?',
    options: [
      { id: '8a', text: 'Artificial intelligence and machine learning', category: 'ai', value: 5 },
      { id: '8b', text: 'Virtual or augmented reality', category: 'immersive', value: 5 },
      { id: '8c', text: 'Clean energy and sustainability tech', category: 'environmental', value: 5 },
      { id: '8d', text: 'Cybersecurity and privacy', category: 'security', value: 5 }
    ]
  }
];