import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { navbarStyles } from '../styles'; 


export const Navbar: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={navbarStyles.nav}>
        <div className={navbarStyles.navbar}>
          <button className={navbarStyles.menuToggle} onClick={handleToggleMenu}>
          ☰
          </button>
          <ul className={`${navbarStyles.menu} ${isMenuOpen ? navbarStyles.open : ''}`}>
              <li onClick={handleToggleMenu}><Link to="/">Home</Link></li>
              <li onClick={handleToggleMenu}><Link to="/about">About</Link></li>
              <li onClick={handleToggleMenu}><Link to="/schedule">Schedule</Link></li>
          </ul>
      </div>
    </nav>
  )
}
