import { 
  FaPython, FaJava, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaGitAlt, FaDocker
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiPostgresql, 
  SiTensorflow, SiScikitlearn, SiJavascript
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { BiNetworkChart } from 'react-icons/bi'; // for REST APIs / ML
import { TbBrain } from 'react-icons/tb'; // for ML

export const skillsData = [
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Java', icon: FaJava, color: '#007396' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
  { name: 'REST APIs', icon: BiNetworkChart, color: '#00D4D4' },
  
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
  { name: 'GitHub', icon: FaGithub, color: '#FFFFFF' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' },
  { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
  
  { name: 'Machine Learning', icon: TbBrain, color: '#FF6F00' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' }
];
