// Unified Data Store with Mock Fallback for Societal Innovation Platform

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

export const INITIAL_CHALLENGES = [
  {
    id: 1,
    title: 'Water shortage and arsenic contamination in Tola village',
    category: 'Water',
    cat: 'Water',
    district: 'Ranchi',
    area: 'Tola',
    affected_people: 450,
    affected: 450,
    supporters: 28,
    votes: 28,
    step: 2,
    status: 'Adopted',
    description: 'Households receive piped water for under an hour every three days. Existing deep borewells show heavy fluoride and arsenic levels causing dental and bone fluorosis.',
    desc: 'Households receive piped water for under an hour every three days. Existing deep borewells show heavy fluoride and arsenic levels causing dental and bone fluorosis.',
    additional_info: 'Nearest alternate tanker supply is 7 km away and charges exorbitant fees.',
    media: [
      { id: 101, file_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?auto=format&fit=crop&w=800&q=80', file_type: 'image/jpeg' }
    ],
    created_at: '2026-09-18T10:00:00.000Z'
  },
  {
    id: 2,
    title: 'Damaged link bridge to primary health centre',
    category: 'Infrastructure',
    cat: 'Infrastructure',
    district: 'Dhanbad',
    area: 'Baliapur',
    affected_people: 1200,
    affected: 1200,
    supporters: 42,
    votes: 42,
    step: 3,
    status: 'Project Created',
    description: 'The culvert bridge connecting Baliapur village to the Primary Health Centre washed away during monsoon flooding. Ambulances cannot cross, causing extreme medical delays.',
    desc: 'The culvert bridge connecting Baliapur village to the Primary Health Centre washed away during monsoon flooding. Ambulances cannot cross, causing extreme medical delays.',
    additional_info: 'Local community has constructed a temporary bamboo pontoon which is unsafe for heavy rainfall.',
    media: [],
    created_at: '2026-09-15T08:30:00.000Z'
  },
  {
    id: 3,
    title: 'Zero cold storage causing 35% crop spoilage for vegetable farmers',
    category: 'Agriculture',
    cat: 'Agriculture',
    district: 'Bokaro',
    area: 'Chas',
    affected_people: 320,
    affected: 320,
    supporters: 19,
    votes: 19,
    step: 1,
    status: 'Under Review',
    description: 'Smallholder tomato and cauliflower farmers lose a massive portion of harvest due to high temperatures and lack of decentralized solar cold storage before local weekly haat.',
    desc: 'Smallholder tomato and cauliflower farmers lose a massive portion of harvest due to high temperatures and lack of decentralized solar cold storage before local weekly haat.',
    additional_info: 'Farmers cooperative has 200 sqm of open panchayat land ready for solar installation.',
    media: [],
    created_at: '2026-09-20T11:15:00.000Z'
  },
  {
    id: 4,
    title: 'Irregular doctor presence and missing emergency triage at sub-centre',
    category: 'Healthcare',
    cat: 'Healthcare',
    district: 'Ranchi',
    area: 'Namkum',
    affected_people: 600,
    affected: 600,
    supporters: 8,
    votes: 8,
    step: 0,
    status: 'Submitted',
    description: 'Sub-centre is staffed by a nurse only two half-days a week. Villagers travel 22 km to Ranchi Sadar Hospital even for diabetic screening and basic emergency dressing.',
    desc: 'Sub-centre is staffed by a nurse only two half-days a week. Villagers travel 22 km to Ranchi Sadar Hospital even for diabetic screening and basic emergency dressing.',
    additional_info: 'Broadband optical fiber (BharatNet) cable exists at Panchayat Bhavan next door.',
    media: [],
    created_at: '2026-09-22T09:40:00.000Z'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 1,
    challenge_id: 1,
    title: 'IoT-enabled Arsenic & Fluoride Water Filtration Unit',
    description: 'Solar-powered multi-stage low-cost activated alumina filter with telemetry monitoring real-time flow and filter life.',
    university: 'Birla Institute of Technology, Mesra',
    uni: 'BIT Mesra',
    status: 'In Progress',
    progress: 55,
    tags: ['Water', 'IoT', 'CleanTech'],
    looking: 'Industrial fabrication & sensor casing partner',
    faculty_mentor: 'Dr. S. K. Mukherjee (Dept of Chemical Engineering)',
    industry_partner: 'Tata CleanTech Innovations',
    created_at: '2026-09-19T14:00:00.000Z'
  },
  {
    id: 2,
    challenge_id: 2,
    title: 'Pre-cast Flood-Resilient Rural Culvert Bridge',
    description: 'Rapid-deployment modular concrete bridge design capable of withstanding flash floods with hydraulic flow bypass channels.',
    university: 'IIT (ISM) Dhanbad',
    uni: 'IIT (ISM) Dhanbad',
    status: 'In Development',
    progress: 35,
    tags: ['Civil', 'Disaster Resilience', 'GIS'],
    looking: 'Precast structural cement partner & geotech lab test support',
    faculty_mentor: 'Prof. Ananya Roy (Dept of Civil Engineering)',
    industry_partner: null,
    created_at: '2026-09-17T11:20:00.000Z'
  },
  {
    id: 3,
    challenge_id: 3,
    title: 'Micro-Cold-Storage Solar Chambers for Farmers Co-ops',
    description: 'Phase-change material thermal storage coupled with 3kW rooftop PV array maintaining 4°C-8°C for perishables without grid power.',
    university: 'National Institute of Technology, Jamshedpur',
    uni: 'NIT Jamshedpur',
    status: 'Taken Up',
    progress: 75,
    tags: ['Agriculture', 'Solar Energy', 'Thermal'],
    looking: 'Compressor manufacturer & battery BMS sponsor',
    faculty_mentor: 'Dr. Rajesh Verma (Dept of Mechanical Engineering)',
    industry_partner: 'AgriTech Solutions Pvt Ltd',
    created_at: '2026-09-21T16:00:00.000Z'
  }
];

export const INITIAL_COLLABS = [
  {
    id: 1,
    project_id: 1,
    company_id: 4,
    status: 'Accepted',
    created_at: '2026-09-20T10:00:00.000Z',
    date: '20 Sep 2026',
    project: 'IoT-enabled Arsenic & Fluoride Water Filtration Unit',
    projects: {
      id: 1,
      title: 'IoT-enabled Arsenic & Fluoride Water Filtration Unit',
      description: 'Solar-powered multi-stage low-cost activated alumina filter with telemetry monitoring real-time flow and filter life.',
      status: 'In Progress',
      progress: 55
    }
  },
  {
    id: 2,
    project_id: 2,
    company_id: 4,
    status: 'Requested',
    created_at: '2026-09-22T14:30:00.000Z',
    date: '22 Sep 2026',
    project: 'Pre-cast Flood-Resilient Rural Culvert Bridge',
    projects: {
      id: 2,
      title: 'Pre-cast Flood-Resilient Rural Culvert Bridge',
      description: 'Rapid-deployment modular concrete bridge design capable of withstanding flash floods with hydraulic flow bypass channels.',
      status: 'In Development',
      progress: 35
    }
  }
];

export const INITIAL_TEAMS = [
  {
    id: 1,
    team_name: 'Jal-Shuddhi Innovation Team',
    project_id: 1,
    student_count: 3,
    students: [
      { name: 'Aditya Sharma', roll_no: 'BTECH/1024/23', course: 'B.Tech Chemical' },
      { name: 'Pooja Kumari', roll_no: 'BTECH/1089/23', course: 'B.Tech Electrical & Electronics' },
      { name: 'Rohan Verma', roll_no: 'BTECH/1142/23', course: 'B.Tech Computer Science' }
    ],
    faculty_count: 1,
    faculty: [
      { name: 'Dr. S. K. Mukherjee', department: 'Chemical Engineering', designation: 'Professor' }
    ]
  },
  {
    id: 2,
    team_name: 'Setu Rural Infrastructure Lab',
    project_id: 2,
    student_count: 2,
    students: [
      { name: 'Neha Gupta', roll_no: 'CIV/2022/45', course: 'M.Tech Structural Engineering' },
      { name: 'Vikram Singh', roll_no: 'CIV/2022/88', course: 'B.Tech Civil' }
    ],
    faculty_count: 1,
    faculty: [
      { name: 'Prof. Ananya Roy', department: 'Civil Engineering', designation: 'Associate Professor' }
    ]
  }
];

export const INITIAL_PARTNERS = [
  {
    id: 1,
    company_name: 'Tata CleanTech Innovations',
    industry: 'Clean Energy & Water',
    description: 'Corporate sustainability arm providing sensor hardware, field enclosures, and calibration grants.',
    contact_person: 'Vivek Malhotra',
    email: 'v.malhotra@tatacleantech.example.com',
    status: 'Accepted'
  },
  {
    id: 2,
    company_name: 'AgriTech Solutions Pvt Ltd',
    industry: 'Agriculture Logistics',
    description: 'Manufacturer of solar cold chambers and cold-chain cold vans operating across eastern India.',
    contact_person: 'Sunita Murmu',
    email: 'sunita@agritechsol.example.com',
    status: 'Accepted'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 101,
    company_name: 'Bharat Cement & Precast Works',
    industry: 'Infrastructure & Materials',
    description: 'Interested in sponsoring rural culvert construction and providing structural testing equipment.',
    contact_person: 'Manoj Agarwal',
    email: 'manoj@bharatprecast.example.com',
    status: 'Pending'
  }
];

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
