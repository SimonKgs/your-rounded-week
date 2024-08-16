import React from 'react'
import { aboutSectionStyles } from '../styles'

export const AboutSection: React.FC = () =>  {
  return (
    <section className={ aboutSectionStyles['about-container']} >
      <h2 className={aboutSectionStyles['about-title']}>About This Application</h2>
      <p className={aboutSectionStyles['about-text']}>
        This application was developed to help me organize my weekly schedule more effectively. 
        It also serves as a project to practice my skills in React, TypeScript, and Three.js. 
        The interactive 3D scene adds a unique touch, making it not only functional but visually engaging. 
        By exploring this app, you’ll see how modern web technologies can create compelling and useful experiences.
      </p>
      <p className={aboutSectionStyles['about-text']}>
        The application features a dynamic 3D scene created with Three.js, showcasing my ability to 
        integrate complex libraries with React. The goal is to demonstrate a practical use of my 
        programming skills while also providing a tool that can aid in personal organization.
      </p>
    </section>
  )
}
