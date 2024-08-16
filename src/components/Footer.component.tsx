import React from 'react'

import { footerStyles } from '../styles'
 
export const Footer: React.FC = () => {
    return (
        <footer className={footerStyles['footer-container']}>
          <p className={footerStyles['footer-text']}>
            &copy; {new Date().getFullYear()} Your Rounded Week. By Simón. All rights reserved.
          </p>
        </footer>
      );
}
