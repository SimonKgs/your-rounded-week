import React from 'react';
import { ctsStyles } from '../styles';
import { Link } from 'react-router-dom';

export const CallToSchedule: React.FC = () => {
  return (
    <section className={ctsStyles['cta-container']}>
      <h2 className={ctsStyles['cta-title']}>Ready to Explore?</h2>
      <p className={ctsStyles['cta-text']}>
        Dive into our interactive schedule and start managing your week efficiently.
      </p>
      <Link to="/schedule" className={ctsStyles['cta-button']}>
        Try it Now
      </Link>
    </section>
  );
};

