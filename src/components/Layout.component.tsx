import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getRandomColor } from '../utils';
import { Footer, Navbar } from '.';

interface Colors {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
}

export const Layout: React.FC = () => {
  const [colors, setColors] = useState<Colors>({
    color1: getRandomColor(),
    color2: getRandomColor(),
    color3: getRandomColor(),
    color4: getRandomColor(),
  });

  useEffect(() => {
    // Initialize colors only once on component mount
    setColors({
      color1: getRandomColor(),
      color2: getRandomColor(),
      color3: getRandomColor(),
      color4: getRandomColor(),
    });
  }, []);

  return (
    <div
      className='layoutContainer'
      style={{
        minHeight: '100vh',
        '--color1': colors.color1,
        '--color2': colors.color2,
        '--color3': colors.color3,
        '--color4': colors.color4,
      } as React.CSSProperties}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
