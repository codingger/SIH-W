// Application UI Constants & Multilingual Configuration Store

export const STEPS = [
  'Submitted',
  'Under Review',
  'Adopted',
  'Project Created',
  'Team Formed',
  'Industry Collaboration',
  'In Development',
  'Deployed'
];

// Database seed placeholders - all dynamic data is fetched live from Supabase PostgreSQL
export const INITIAL_CHALLENGES = [];
export const INITIAL_PROJECTS = [];
export const INITIAL_COLLABS = [];
export const INITIAL_TEAMS = [];
export const INITIAL_PARTNERS = [];
export const INITIAL_APPLICATIONS = [];

export const TRANSLATIONS = {
  en: {
    platformTitle: 'Societal Innovation Platform',
    govtSubtitle: 'Government-backed initiative',
    challengesNav: 'Challenges',
    howItWorksNav: 'How It Works',
    universitiesNav: 'Universities',
    industryNav: 'Industry',
    helpNav: 'Help',
    submitCta: 'Submit a Challenge',
    login: 'Login',
    heroTitle: 'Turn Local Problems Into Real Solutions',
    heroSubtitle: 'Report a challenge in your community. Leading universities adopt it as a student-faculty project, and verified industry partners help fund and build the solution.',
    exploreCta: 'Explore Challenges',
    challengesReported: 'Challenges Reported',
    projectsUnderway: 'Projects Underway',
    activeUniversities: 'Universities Enrolled',
    industryPartners: 'Industry Partners',
    featuredTitle: 'Challenges with the Highest Community Support',
    stepCommunity: 'Community',
    stepUniversity: 'University',
    stepIndustry: 'Industry',
    stepSolution: 'Solution',
    viewChallenge: 'View Problem',
    supportBtn: 'Support Challenge',
    supportedBtn: 'Supported',
    underReview: 'Under Review',
    takenUp: 'Taken Up',
    inProgress: 'In Progress',
    completed: 'Completed',
    highPriority: 'High Priority',
    medPriority: 'Medium Priority',
    lowPriority: 'Low Priority'
  },
  hi: {
    platformTitle: 'सामाजिक नवाचार मंच',
    govtSubtitle: 'भारत सरकार समर्थित पहल',
    challengesNav: 'चुनौतियाँ',
    howItWorksNav: 'यह कैसे काम करता है',
    universitiesNav: 'विश्वविद्यालय',
    industryNav: 'उद्योग भागीदार',
    helpNav: 'सहायता',
    submitCta: 'चुनौती दर्ज करें',
    login: 'लॉग इन',
    heroTitle: 'स्थानीय समस्याओं को बनाएं वास्तविक समाधान',
    heroSubtitle: 'अपने समुदाय की समस्या दर्ज करें। प्रतिष्ठित विश्वविद्यालय इसे एक शोध परियोजना के रूप में अपनाते हैं और उद्योग साझेदार समाधान तैयार करने में मदद करते हैं।',
    exploreCta: 'चुनौतियां देखें',
    challengesReported: 'दर्ज चुनौतियाँ',
    projectsUnderway: 'सक्रिय परियोजनाएं',
    activeUniversities: 'भागीदार विश्वविद्यालय',
    industryPartners: 'उद्योग साझेदार',
    featuredTitle: 'सर्वाधिक जनसमर्थन वाली चुनौतियाँ',
    stepCommunity: 'समुदाय',
    stepUniversity: 'विश्वविद्यालय',
    stepIndustry: 'उद्योग',
    stepSolution: 'समाधान',
    viewChallenge: 'विवरण देखें',
    supportBtn: 'समर्थन दें',
    supportedBtn: 'समर्थित',
    underReview: 'समीक्षाधीन',
    takenUp: 'स्वीकृत',
    inProgress: 'प्रगति पर',
    completed: 'पूर्ण',
    highPriority: 'उच्च प्राथमिकता',
    medPriority: 'मध्यम प्राथमिकता',
    lowPriority: 'सामान्य'
  }
};
