import { Career } from '../types';

export const careers: Career[] = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    description: 'Design, develop, and maintain software applications across various platforms. Work with programming languages, frameworks, and collaborate with teams to build efficient solutions.',
    skillsRequired: ['Programming', 'Problem Solving', 'Algorithm Design', 'Testing'],
    averageSalary: '$110,000',
    jobGrowth: '22% (Much faster than average)',
    educationRequired: 'Bachelor\'s degree in Computer Science or related field',
    icon: 'code',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to identify patterns and trends. Build models using machine learning and statistical techniques to help organizations make data-driven decisions.',
    skillsRequired: ['Statistics', 'Machine Learning', 'Programming', 'Data Visualization'],
    averageSalary: '$122,000',
    jobGrowth: '36% (Much faster than average)',
    educationRequired: 'Master\'s or PhD in Data Science, Statistics, or related field',
    icon: 'bar-chart',
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Create intuitive, user-centered designs for digital products. Conduct user research, develop wireframes, and collaborate with developers to implement effective user experiences.',
    skillsRequired: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    averageSalary: '$85,000',
    jobGrowth: '13% (Faster than average)',
    educationRequired: 'Bachelor\'s degree in Design, HCI, or related field',
    icon: 'layout',
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect systems and networks from cyber threats. Monitor for security breaches, implement security measures, and develop policies to safeguard digital information.',
    skillsRequired: ['Network Security', 'Threat Analysis', 'Security Protocols', 'Risk Assessment'],
    averageSalary: '$99,000',
    jobGrowth: '35% (Much faster than average)',
    educationRequired: 'Bachelor\'s degree in Cybersecurity, Computer Science, or related field',
    icon: 'shield',
  },
  {
    id: 'marketing-specialist',
    title: 'Digital Marketing Specialist',
    description: 'Develop and implement marketing strategies for digital platforms. Manage social media, email campaigns, and analyze performance metrics to optimize marketing efforts.',
    skillsRequired: ['Social Media', 'Content Creation', 'Analytics', 'SEO'],
    averageSalary: '$63,000',
    jobGrowth: '10% (Faster than average)',
    educationRequired: 'Bachelor\'s degree in Marketing, Communications, or related field',
    icon: 'megaphone',
  },
  {
    id: 'healthcare-administrator',
    title: 'Healthcare Administrator',
    description: 'Manage healthcare facilities, services, and staff. Ensure regulatory compliance, quality patient care, and efficient operations of healthcare organizations.',
    skillsRequired: ['Leadership', 'Healthcare Regulations', 'Budgeting', 'Staff Management'],
    averageSalary: '$104,000',
    jobGrowth: '32% (Much faster than average)',
    educationRequired: 'Bachelor\'s or Master\'s degree in Healthcare Administration or related field',
    icon: 'heart-pulse',
  }
];