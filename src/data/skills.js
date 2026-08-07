import { FaPython, FaReact, FaNodeJs, FaDatabase, FaBrain, FaChartLine } from 'react-icons/fa';
import { SiTypescript, SiTensorflow, SiKeras, SiPandas, SiNumpy, SiFastapi, SiFlask, SiScikitlearn } from 'react-icons/si';
import { BiNetworkChart } from 'react-icons/bi';
import { TbBrain } from 'react-icons/tb';

export const skillsData = [
  // Core / AI / ML
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Machine Learning', icon: FaBrain, color: '#FF6F00' },
  { name: 'Artificial Intelligence', icon: TbBrain, color: '#00D4D4' },
  { name: 'Data Analysis', icon: FaChartLine, color: '#1572B6' },
  { name: 'SQL', icon: FaDatabase, color: '#4479A1' },

  // AI/ML specific
  { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
  { name: 'XGBoost', icon: BiNetworkChart, color: '#00D4D4' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'Keras', icon: SiKeras, color: '#D00000' },
  { name: 'Computer Vision', icon: FaChartLine, color: '#FFFFFF' },
  { name: 'Generative AI', icon: TbBrain, color: '#61DAFB' },
  { name: 'AI Agents', icon: FaBrain, color: '#339933' },
  { name: 'SHAP', icon: BiNetworkChart, color: '#E34F26' },

  // Data
  { name: 'Pandas', icon: SiPandas, color: '#150458' },
  { name: 'NumPy', icon: SiNumpy, color: '#013243' },

  // Backend
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'REST APIs', icon: BiNetworkChart, color: '#00D4D4' },

  // Frontend
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' }
];
