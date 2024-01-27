import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  return (
    <button
      className="lg:btn xl:btn-lg btn-sm btn-ghost xl:text-lg text-base bg-base-300 rounded-lg"
      onClick={handleToggle}
    >
      {theme === 'light' && (
        <span>Current: &#9788;</span>
      )}
      {theme === 'dark' && (
        <span>Current: &#9728;</span>
      )}
    </button>
  );
};

export default ThemeSwitcher;
