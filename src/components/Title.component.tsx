import React, { useEffect, useRef } from 'react'

import { titleStyles } from '../styles'


export const TitleComponent: React.FC = () => {

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (titleRef.current) {
        titleRef.current.classList.add(titleStyles['paused']);
      }
    };
  }, []);
  return (
    <h1 className={titleStyles['title-component']} ref={titleRef}>
        <div className={titleStyles['word-container']}>
            <span>Y</span><span>o</span><span>u</span><span>r</span>
        </div>
        <div className={titleStyles['word-container']}>
            <span>R</span><span>o</span><span>u</span><span>n</span>
            <span>d</span><span>e</span><span>d</span>
        </div>
        <div className={titleStyles['word-container']}>
            <span>W</span><span>e</span><span>e</span><span>k</span>
        </div>
    </h1>
  )
}
