import { useEffect, useState } from 'react';
import images from './images';

const DarkModeToggle = ({ onChildClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    setIsDarkMode(savedMode === 'true');
    onChildClick(savedMode === 'true');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    onChildClick(newMode);
  };

  return (
    isDarkMode ? <img onClick={toggleDarkMode} className="light" src={images.lightMode} alt="light_mode" /> : <img className="dark" onClick={toggleDarkMode} src={images.darkMode} alt="dark_mode" />
  );
};

export default DarkModeToggle;
