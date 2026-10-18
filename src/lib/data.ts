export interface Profile {
  name: string;
  firstName: string;
  initials: string;
  role: string;
  secondaryRole: string;
  headingMain: string;
  headingAccent: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  shortAbout: string;
  github: string;
  linkedin: string | null;
  hackerrank: string;
  codechef: string;
  portfolio: string;
  resumePath: string;
  degree: string;
  dept: string;
  idNo: string;
  validTill: string;
  cgpa: string;
  college: string;
  quote: string;
}

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export type SkillFamily =
  | 'Languages'
  | 'AI & ML'
  | 'Data Science'
  | 'Generative AI'
  | 'Frontend'
  | 'Backend & APIs'
  | 'Databases'
  | 'Tools'
  | 'CS Fundamentals';

export interface SkillItem {
  atomic: number;
  symbol: string;
  name: string;
  family: SkillFamily;
  projects: string[];
  logo: string;
  isBrand: boolean;
  glow?: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  liveUrl: string | null;
  date: string;
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'experience';
  year: string;
  title: string;
  place: string;
  score?: string;
  details: string[];
}

export interface AchievementItem {
  index: string;
  platform: string;
  count: number;
  decimals?: number;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  logo: string;
  link: string | null;
  glowColor?: string;
}

export const PROFILE: Profile = {
  name: "Preetham Anand",
  firstName: "PREETHAM",
  initials: "PA",
  role: "AI & ML Engineer",
  secondaryRole: "Full-Stack Developer · Python · Intelligent Applications",
  headingMain: "AI & ML",
  headingAccent: "Engineer.",
  email: "preetham0802@gmail.com",
  phone: "+91 8121078989",
  phoneHref: "tel:+918121078989",
  location: "Hyderabad",
  resumeSummary:
    "Computer Science (AI & ML) undergraduate skilled in Python, Machine Learning, Generative AI, RAG, AI agents, and full-stack development. Seeking internships in AI/ML, Data Science, or Software Development to apply skills in building real-world, production-ready solutions.",
  shortAbout:
    "Computer Science & Engineering undergraduate specializing in Artificial Intelligence and Machine Learning, with a strong focus on full-stack web applications, Python programming, and AI-powered systems.",
  github: "https://github.com/PreethamAnand",
  linkedin: null, // Omitted as per Rule 1: Not present in the résumé PDF
  hackerrank: "https://www.hackerrank.com/profile/P_23891A6650",
  codechef: "https://www.codechef.com/users/preetham82",
  portfolio: "https://preetham.live",
  resumePath: "/resume.pdf",
  degree: "B.Tech, Computer Science And Engineering (Artificial Intelligence & Machine Learning)",
  dept: "CSE (AI & ML)",
  idNo: "P_23891A6650",
  validTill: "2027",
  cgpa: "8.66 / 10",
  college: "Vignan Institute Of Technology & Science",
  quote:
    "Engineering real-world, production-ready solutions by uniting modern full-stack development with intelligent machine learning architectures.",
};

export const NAV: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "certifications", label: "Certifications", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "achievements", label: "Achievements", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export const SKILL_GROUPS: SkillItem[] = [
  // Programming Languages
  { atomic: 1, symbol: "Py", name: "Python", family: "Languages", projects: ["PulseConnect 2.0", "Enterprise ATS Resume Analyzer", "NSE Intelligence", "ResearchPilot AI", "DeepFake Face Detection", "Airfare Price Prediction"], logo: "python", isBrand: true, glow: "rgba(55,118,171,0.25)" },
  { atomic: 2, symbol: "Ja", name: "Java", family: "Languages", projects: ["Data Structures & Algorithms", "Object-Oriented Programming"], logo: "java", isBrand: true, glow: "rgba(234,45,46,0.2)" },
  { atomic: 3, symbol: "Js", name: "JavaScript", family: "Languages", projects: ["Nirvaha Wellness Platform", "Interactive Frontends"], logo: "javascript", isBrand: true, glow: "rgba(247,223,30,0.25)" },
  { atomic: 4, symbol: "Ts", name: "TypeScript", family: "Languages", projects: ["Full Stack Features", "Typed API Contracts"], logo: "typescript", isBrand: true, glow: "rgba(49,120,198,0.25)" },
  { atomic: 5, symbol: "Ht", name: "HTML 5", family: "Languages", projects: ["Responsive Interfaces", "Semantic Web Layouts"], logo: "html5", isBrand: true, glow: "rgba(227,76,38,0.2)" },
  { atomic: 6, symbol: "Cs", name: "CSS3", family: "Languages", projects: ["User Experience", "Modern Styling & Systems"], logo: "css3", isBrand: true, glow: "rgba(38,77,228,0.2)" },

  // AI & Machine Learning
  { atomic: 7, symbol: "Ml", name: "Machine Learning", family: "AI & ML", projects: ["PulseConnect 2.0", "Airfare Price Prediction", "NSE Intelligence"], logo: "ml", isBrand: false },
  { atomic: 8, symbol: "Dl", name: "Deep Learning", family: "AI & ML", projects: ["DeepFake Face Detection"], logo: "dl", isBrand: false },
  { atomic: 9, symbol: "Nl", name: "Natural Language Processing (NLP)", family: "AI & ML", projects: ["ResearchPilot AI", "Enterprise ATS Resume Analyzer"], logo: "nlp", isBrand: false },
  { atomic: 10, symbol: "Cv", name: "Computer Vision", family: "AI & ML", projects: ["DeepFake Face Detection"], logo: "opencv", isBrand: true, glow: "rgba(92,168,231,0.25)" },
  { atomic: 11, symbol: "Fe", name: "Feature Engineering", family: "AI & ML", projects: ["NSE Intelligence", "Airfare Price Prediction"], logo: "feature", isBrand: false },
  { atomic: 12, symbol: "Me", name: "Model Evaluation", family: "AI & ML", projects: ["Airfare Price Prediction", "NSE Intelligence"], logo: "eval", isBrand: false },

  // Python Libraries & Data Science
  { atomic: 13, symbol: "Pd", name: "Pandas", family: "Data Science", projects: ["NSE Intelligence", "Airfare Price Prediction"], logo: "pandas", isBrand: true, glow: "rgba(19,7,84,0.2)" },
  { atomic: 14, symbol: "Np", name: "NumPy", family: "Data Science", projects: ["NSE Intelligence", "Airfare Price Prediction"], logo: "numpy", isBrand: true, glow: "rgba(77,171,207,0.2)" },
  { atomic: 15, symbol: "Sk", name: "Scikit-learn", family: "Data Science", projects: ["Airfare Price Prediction", "NSE Intelligence"], logo: "ml", isBrand: false },
  { atomic: 16, symbol: "Xg", name: "XGBoost", family: "Data Science", projects: ["NSE Intelligence"], logo: "xgboost", isBrand: true, glow: "rgba(255,107,53,0.25)" },
  { atomic: 17, symbol: "Tf", name: "TensorFlow", family: "Data Science", projects: ["DeepFake Face Detection"], logo: "tensorflow", isBrand: true, glow: "rgba(255,111,0,0.25)" },
  { atomic: 18, symbol: "Ke", name: "Keras", family: "Data Science", projects: ["DeepFake Face Detection"], logo: "keras", isBrand: true, glow: "rgba(208,0,0,0.25)" },
  { atomic: 19, symbol: "Oc", name: "OpenCV", family: "Data Science", projects: ["DeepFake Face Detection"], logo: "opencv", isBrand: true, glow: "rgba(92,168,231,0.25)" },

  // Generative AI & LLM Applications
  { atomic: 20, symbol: "Rg", name: "RAG", family: "Generative AI", projects: ["ResearchPilot AI"], logo: "rag", isBrand: false },
  { atomic: 21, symbol: "Ag", name: "AI Agents", family: "Generative AI", projects: ["Enterprise ATS Resume Analyzer", "ResearchPilot AI"], logo: "agents", isBrand: false },
  { atomic: 22, symbol: "Lc", name: "LangChain", family: "Generative AI", projects: ["Enterprise ATS Resume Analyzer", "ResearchPilot AI"], logo: "langchain", isBrand: true, glow: "rgba(28,100,242,0.2)" },
  { atomic: 23, symbol: "Lg", name: "LangGraph", family: "Generative AI", projects: ["Enterprise ATS Resume Analyzer"], logo: "agents", isBrand: false },
  { atomic: 24, symbol: "Cb", name: "ChromaDB", family: "Generative AI", projects: ["ResearchPilot AI"], logo: "chromadb", isBrand: true, glow: "rgba(255,94,98,0.2)" },
  { atomic: 25, symbol: "Ga", name: "Generative AI Tools", family: "Generative AI", projects: ["AI-Assisted Workflow", "Prompt Grounding"], logo: "prompt", isBrand: false },
  { atomic: 26, symbol: "Pe", name: "Prompt Engineering", family: "Generative AI", projects: ["LLM Grounding & Prompt Templates"], logo: "prompt", isBrand: false },

  // Frontend & Full-Stack
  { atomic: 27, symbol: "Re", name: "React", family: "Frontend", projects: ["PulseConnect 2.0", "Nirvaha Wellness Platform"], logo: "react", isBrand: true, glow: "rgba(97,218,251,0.25)" },
  { atomic: 28, symbol: "St", name: "Streamlit", family: "Frontend", projects: ["Enterprise ATS", "DeepFake Detection", "Airfare Prediction"], logo: "streamlit", isBrand: true, glow: "rgba(255,75,75,0.25)" },

  // Backend Development & APIs
  { atomic: 29, symbol: "Fa", name: "FastAPI", family: "Backend & APIs", projects: ["Model Inference Endpoints", "Microservices"], logo: "fastapi", isBrand: true, glow: "rgba(5,153,139,0.25)" },
  { atomic: 30, symbol: "Fl", name: "Flask", family: "Backend & APIs", projects: ["DeepFake Face Detection Web App"], logo: "flask", isBrand: true, glow: "rgba(0,0,0,0.15)" },
  { atomic: 31, symbol: "Ra", name: "REST API", family: "Backend & APIs", projects: ["PulseConnect 2.0", "Backend Service Integration"], logo: "rest", isBrand: false },
  { atomic: 32, symbol: "Gq", name: "GraphQL", family: "Backend & APIs", projects: ["API Schemas & Queries"], logo: "graphql", isBrand: true, glow: "rgba(229,53,171,0.2)" },

  // Databases
  { atomic: 33, symbol: "Sq", name: "SQL", family: "Databases", projects: ["PulseConnect 2.0", "Database Querying"], logo: "sql", isBrand: true, glow: "rgba(0,117,143,0.2)" },
  { atomic: 34, symbol: "My", name: "MySQL", family: "Databases", projects: ["Application Data Storage"], logo: "mysql", isBrand: true, glow: "rgba(0,117,143,0.2)" },

  // Developer Tools & Platforms
  { atomic: 35, symbol: "Gt", name: "Git", family: "Tools", projects: ["Version Control Across All Projects"], logo: "git", isBrand: true, glow: "rgba(240,80,50,0.25)" },
  { atomic: 36, symbol: "Gh", name: "GitHub", family: "Tools", projects: ["Source Repositories & Collaboration"], logo: "github", isBrand: true, glow: "rgba(13,13,13,0.2)" },
  { atomic: 37, symbol: "Vs", name: "VS Code", family: "Tools", projects: ["Primary Development IDE"], logo: "vscode", isBrand: true, glow: "rgba(0,122,204,0.25)" },
  { atomic: 38, symbol: "Cr", name: "Cursor (GenAI)", family: "Tools", projects: ["AI-Assisted Engineering Workflow"], logo: "cursor", isBrand: false },
  { atomic: 39, symbol: "Cp", name: "GitHub Copilot (GenAI)", family: "Tools", projects: ["Code Synthesis & Acceleration"], logo: "github", isBrand: true, glow: "rgba(13,13,13,0.2)" },

  // Computer Science Fundamentals
  { atomic: 40, symbol: "Ds", name: "Data Structures & Algorithms", family: "CS Fundamentals", projects: ["315+ CodeChef Problem Solving", "HackerRank Practice"], logo: "systems", isBrand: false },
  { atomic: 41, symbol: "Oo", name: "Object-Oriented Programming", family: "CS Fundamentals", projects: ["Java Modular Design", "Production Architecture"], logo: "academic", isBrand: false },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "pulseconnect",
    index: "01",
    title: "PulseConnect 2.0",
    kicker: "AI-Powered Emergency Blood Coordination System",
    description:
      "Developed an AI-powered platform for emergency blood and plasma coordination between donors, recipients, hospitals, and responders.",
    features: [
      "Donor-recipient matching & emergency workflows",
      "Role-based dashboards & coordination features",
      "Predictive capabilities for emergency decision-making",
      "Resource planning & real-time responder dispatch",
    ],
    tech: ["Python", "Machine Learning", "React", "Streamlit", "SQL", "APIs"],
    github: "https://pulseconnectv2.me",
    liveUrl: "https://pulseconnectv2.me",
    date: "Oct 2025 - Aug 2026",
  },
  {
    id: "enterprise-ats",
    index: "02",
    title: "Enterprise ATS Resume Analyzer",
    kicker: "Multi-Agent AI System",
    description:
      "Developed a multi-agent AI system for automated resume and job-description analysis.",
    features: [
      "Specialized autonomous agents for parsing & job analysis",
      "Semantic matching & ATS scoring engine",
      "Skill-gap detection & missing keyword identification",
      "Strengths/weakness analysis & improvement suggestions",
    ],
    tech: [
      "Python",
      "LangChain",
      "LangGraph",
      "Streamlit",
      "OpenRouter",
      "Sentence Transformers",
    ],
    github: "https://preatscheck.streamlit.app/",
    liveUrl: "https://preatscheck.streamlit.app/",
    date: "May 2026",
  },
  {
    id: "researchpilot-ai",
    index: "03",
    title: "ResearchPilot AI",
    kicker: "RAG-Based Research Intelligence System",
    description:
      "Built an AI research assistant using Retrieval-Augmented Generation and agent-based workflows. Contributed to a NASSCOM-organized hackathon.",
    features: [
      "Document retrieval using vector embeddings & ChromaDB",
      "Contextual research-paper analysis & synthesis",
      "Integrated LLMs through Groq / OpenRouter",
      "NASSCOM hackathon demonstrated grounded intelligence",
    ],
    tech: [
      "Python",
      "RAG",
      "LangChain",
      "ChromaDB",
      "LLMs",
      "AI Agents",
      "NLP",
    ],
    github: "https://researchpilot-three.vercel.app/",
    liveUrl: "https://researchpilot-three.vercel.app/",
    date: "Feb 2026",
  },
  {
    id: "deepfake-detection",
    index: "04",
    title: "DeepFake Face Detection",
    kicker: "Deep Learning Forensics",
    description:
      "Developed a deep learning application to identify manipulated or synthetic facial content.",
    features: [
      "Image and video preprocessing pipeline",
      "Deep learning model inference for deepfake classification",
      "Interactive interface for demonstrating detection results",
      "Synthetic facial artifact and manipulation analysis",
    ],
    tech: [
      "Python",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "Streamlit",
      "Flask",
    ],
    github: "https://github.com/PreethamAnand/Deepfake-Face-Detection.git",
    liveUrl: null,
    date: "Mar 2025 - May 2025",
  },
  {
    id: "airfare-prediction",
    index: "05",
    title: "Airfare Price Prediction",
    kicker: "Flight Pricing ML Engine",
    description:
      "Developed a machine learning application for predicting flight ticket prices.",
    features: [
      "Data preprocessing, cleaning & feature engineering",
      "Model training, cross-validation & evaluation",
      "Interactive interface for users to obtain price predictions",
      "Real-world flight fare estimation",
    ],
    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Streamlit",
      "Machine Learning",
    ],
    github: "https://github.com/PreethamAnand/Airfare-Prediction.git",
    liveUrl: null,
    date: "Mar 2025 - May 2025",
  },
  {
    id: "nse-intelligence",
    index: "06",
    title: "NSE Intelligence",
    kicker: "Stock Market Analysis & Prediction",
    description:
      "Developed a machine learning system for analysing NSE/BSE stock market data.",
    features: [
      "Engineered features: RSI, MACD, moving averages, momentum",
      "Volatility, returns, and volume pattern metrics",
      "Random Forest, XGBoost & Logistic Regression models",
      "Automated data-processing and multi-stock prediction workflows",
    ],
    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "yFinance",
    ],
    github: null,
    liveUrl: null,
    date: "Mar 2026 - May 2026",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "deloitte-tech",
    index: "01",
    title: "Deloitte Technology Job Simulation",
    issuer: "Deloitte, Virtual",
    date: "Aug 2026",
    description:
      "Completed a Deloitte job simulation involving practical technology and problem-solving tasks, gaining exposure to professional workflows, analytical thinking, and technology-focused business scenarios.",
  },
  {
    id: "deloitte-analytics",
    index: "02",
    title: "Deloitte Australia Data Analytics Job Simulation",
    issuer: "Deloitte, Virtual",
    date: "Aug 2026",
    description:
      "Completed practical data analytics tasks involving Tableau dashboard development, telemetry and compensation analysis, and Excel-based pay equality classification. Gained hands-on experience in data analysis, visualization, and business insights.",
  },
  {
    id: "ai-tools",
    index: "03",
    title: "AI TOOLS WORKSHOP",
    issuer: "Be 10x, Virtual",
    date: "Jan 2026",
    description:
      "Completed practical training on AI tools and their applications for productivity, content generation, research, and everyday workflows. Explored practical use of modern AI tools for improving efficiency and problem-solving.",
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "vignan-btech",
    type: "education",
    year: "2023 - 2027",
    title: "B.Tech, Computer Science And Engineering (Artificial Intelligence & Machine Learning)",
    place: "Vignan Institute Of Technology & Science",
    score: "CGPA: 8.66 / 10",
    details: [
      "Undergraduate specialization in Artificial Intelligence, Machine Learning, Data Structures, Algorithms, and Software Development.",
      "Maintained an 8.66/10 cumulative grade point average across core engineering curricula.",
    ],
  },
  {
    id: "edunet-internship",
    type: "experience",
    year: "Jan 2025",
    title: "AI/ML Intern • Internship",
    place: "Edunet Foundation, Virtual (SAP × Microsoft × AICTE)",
    details: [
      "Completed an AI/ML-focused internship under the SAP × Microsoft × AICTE initiative.",
      "Worked on practical applications of artificial intelligence and machine learning.",
      "Gained exposure to machine learning workflows, data processing, model development, and AI-based problem solving.",
    ],
  },
  {
    id: "cothon-internship",
    type: "experience",
    year: "Mar 2025 - May 2025",
    title: "AI/ML Intern • Internship",
    place: "Cothon Solutions, Virtual",
    details: [
      "Developed an Airfare Price Prediction system using machine learning techniques for analyzing and forecasting flight prices.",
      "Performed data preprocessing, feature engineering, and model training to improve prediction accuracy.",
      "Built a DeepFake Face Detection system using deep learning techniques for identifying manipulated facial content.",
      "Worked with Python-based ML/DL libraries to implement, evaluate, and deploy model prototypes.",
    ],
  },
  {
    id: "nirvaha-internship",
    type: "experience",
    year: "Oct 2025 - Feb 2026",
    title: "Full Stack Developer • Internship",
    place: "Nirvaha Wellness LLP, Virtual",
    details: [
      "Developed and contributed to a wellness-tech platform by building and enhancing full-stack features across frontend and backend systems.",
      "Designed and implemented responsive user interfaces ensuring smooth user experience, performance optimization, and clean UI workflows.",
      "Integrated APIs and backend services to enable seamless data flow between application layers and improve system functionality.",
      "Collaborated with the development and product team to translate requirements into scalable, production-ready software features.",
    ],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    index: "01 / 06",
    platform: "CodeChef",
    count: 315,
    suffix: "+",
    label: "Problems Solved",
    caption: "CodeChef Profile",
    detail: "Over 315 competitive programming problems solved on CodeChef (preetham82) with continuous algorithmic practice.",
    logo: "codechef",
    link: "https://www.codechef.com/users/preetham82",
    glowColor: "rgba(91,70,56,0.3)",
  },
  {
    index: "02 / 06",
    platform: "HackerRank",
    count: 100,
    suffix: "%",
    label: "Verified Problem Solving",
    caption: "HackerRank Profile",
    detail: "Active problem solving profile (P_23891A6650) practicing foundational algorithms, data structures, and languages.",
    logo: "hackerrank",
    link: "https://www.hackerrank.com/profile/P_23891A6650",
    glowColor: "rgba(46,200,102,0.3)",
  },
  {
    index: "03 / 06",
    platform: "Academics",
    count: 8.66,
    decimals: 2,
    suffix: "",
    label: "Cumulative CGPA",
    caption: "B.Tech CSE (AI & ML)",
    detail: "8.66 / 10 CGPA at Vignan Institute Of Technology & Science across core computer science and AI coursework.",
    logo: "academic",
    link: null,
    glowColor: "rgba(13,13,13,0.15)",
  },
  {
    index: "04 / 06",
    platform: "Engineering",
    count: 6,
    suffix: "+",
    label: "Engineered Systems",
    caption: "AI & Full-Stack Systems",
    detail: "6 featured applications developed across full stack, multi-agent AI, RAG, and deep learning forensics.",
    logo: "systems",
    link: "https://github.com/PreethamAnand",
    glowColor: "rgba(13,13,13,0.2)",
  },
  {
    index: "05 / 06",
    platform: "Industry",
    count: 3,
    suffix: "",
    label: "Completed Internships",
    caption: "AI/ML & Full-Stack",
    detail: "3 internships completed across full-stack engineering and AI/ML at Nirvaha Wellness, Cothon Solutions, and Edunet.",
    logo: "experience",
    link: null,
    glowColor: "rgba(13,13,13,0.15)",
  },
  {
    index: "06 / 06",
    platform: "Hackathon",
    count: 1,
    suffix: "",
    label: "NASSCOM Contributor",
    caption: "ResearchPilot AI",
    detail: "Contributed to a NASSCOM-organized hackathon by developing ResearchPilot AI, a RAG-based research intelligence system.",
    logo: "hackathon",
    link: "https://researchpilot-three.vercel.app/",
    glowColor: "rgba(13,13,13,0.2)",
  },
];
