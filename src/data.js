// Content below comes from your resume and your edits. Re-check before publishing.
export const profile = {
  name: 'Riya Kumari',
  role: 'Java Software Developer',
  years: '2 Years',
  company: 'Via.com',
  tagline: 'Building scalable backend systems for better travel experiences.',
  location: 'Noida, India',
  openToWork: true,
  resumeUrl: 'resume.pdf', // file lives at public/resume.pdf
  about: [
    'I’m a Java Software Developer with 2 years of experience at Via.com, working on flight booking systems. I enjoy building scalable, reliable and efficient backend solutions that power real-world travel experiences.',
    'I’m passionate about clean code, problem solving and continuously learning new technologies — especially in the areas of backend development, system design and AI.',
  ],
  quote: 'Turning complex problems into simple, scalable solutions.',
  facts: [['2 Years', 'Experience'], ['Java', 'Primary Language'], ['Via.com', 'Current Company'], ['Flight Booking', 'Domain']],
}

export const journey = [
  {
    period: 'Aug 2024 – Present',
    title: 'Software Developer Engineer',
    org: 'Via.com',
    points: [
      'Post-booking baggage, meal and seat flows in Navitaire NDC; meal and baggage SSR for Lion/Vedaleon',
      'Pre-booking seat, meal and baggage flows for Sriwijaya, Batik Air and Pelita',
      'Passenger-wise baggage and meal SSR selection in Amadeus NDC',
      'Welcome email flow enhanced with WhatsApp support and UI update',
    ],
  },
]

export const skills = [
  'Java', 'SQL', 'Spring Boot', 'REST APIs', 'MySQL', 'PostgreSQL', 'Git', 'Postman', 'Maven',
  'OOP', 'API Design', 'Debugging', 'Exception Handling', 'System Design Basics',
  'OpenAI API Basics', 'Prompt Engineering Basics',
]

export const projects = [
  { name: 'Post-MMB SSR Integration', desc: 'Implemented post-booking baggage, meal and seat flows in Navitaire NDC, and meal and baggage SSR for Lion/Vedaleon Airlines via request/response mapping.', stack: ['Navitaire NDC', 'Lion/Vedaleon', 'SSR'], link: '' },
  { name: 'Pre-Booking SSR Integration', desc: 'Built pre-booking seat, meal and baggage flows for Sriwijaya, Batik Air and Pelita, mapping ancillary availability, pricing and selection before confirmation.', stack: ['Sriwijaya', 'Batik Air', 'Pelita', 'SSR'], link: '' },
  { name: 'Amadeus NDC SSR Enhancement', desc: 'Enhanced baggage and meal SSR flows so ancillaries can be selected per passenger type and passenger mapping.', stack: ['Amadeus NDC', 'Baggage', 'Meal'], link: '' },
  { name: 'Welcome Email & WhatsApp Communication', desc: 'Added WhatsApp support to the welcome email flow and updated the UI to improve onboarding communication.', stack: ['Email', 'WhatsApp', 'UI'], link: '' },
]

export const contact = [
  { label: 'Email', icon: 'email', short: '@', value: 'mail2riya2001@gmail.com', href: 'mailto:mail2riya2001@gmail.com' },
  { label: 'LinkedIn', icon: 'linkedin', short: 'in', value: 'linkedin.com/in/riya-kumari-994b6a20a', href: 'https://www.linkedin.com/in/riya-kumari-994b6a20a' },
  { label: 'GitHub', icon: 'github', short: 'gh', value: 'github.com/beacoder024', href: 'https://github.com/beacoder024' },
  { label: 'LeetCode', icon: 'leetcode', short: 'LC', value: 'leetcode.com/u/YOUR-USERNAME', href: 'https://leetcode.com/u/Riyaaa_01/' },
  { label: 'CodeChef', icon: 'codechef', short: 'CC', value: 'codechef.com/users/YOUR-USERNAME', href: 'https://www.codechef.com/users/code_riya' },
  { label: 'HackerRank', icon: 'hackerrank', short: 'HR', value: 'hackerrank.com/profile/YOUR-USERNAME', href: 'https://www.hackerrank.com/profile/riyakumariaks_c1' },
]