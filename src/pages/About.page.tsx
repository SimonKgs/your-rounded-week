import React, { useEffect, useRef } from 'react'

import { aboutStyles, titleStyles } from '../styles'

const About: React.FC = () => {

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
        <div className={aboutStyles['about-container']}>
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2Q3YWtzamo2bGh1ZTBkZngxeDl0aG10OThsaGVlaHR4b3FucWF3ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mwKJ0P6AN4yddpKhr1/giphy.gif" alt="That's how it started" />
            
            <h1 className={titleStyles['title-component']} ref={titleRef}>
                <div className={titleStyles['word-container']}>
                    <span>A</span><span>b</span><span>o</span><span>u</span><span>t</span>
                </div>
                <div className={titleStyles['word-container']}>
                    <span>T</span><span>h</span><span>i</span><span>s</span>
                </div>
                <div className={titleStyles['word-container']}>
                    <span>A</span><span>p</span><span>p</span>
                </div>
            </h1>
            <div className={aboutStyles['about-text-container']}>
                <p>
                    This application was born after spending a long time without using React,
                    following a year of working with PHP, and then taking a Python course for
                    about 3 months. The main objective was to create a simple application to
                    refresh my knowledge of React before enrolling in my next courses. These
                    courses will cover Vue, Angular, and more Python, with each subject divided
                    by the week. However, I delayed it by 4 days (I initially expected to spend
                    3 days on the application at most, but there were some complications)
                    to develop this app, which is a weekly schedule generator.
                </p>
                <p>
                    In this application, you can fill the cells for the 7 days of the week, each
                    representing 24 hours, as you prefer. You can add tasks, edit, move, or delete
                    them in the provided cells. If the duration of a task exceeds the end of the day,
                    it will fill the day up to its end. I found this approach more flexible than
                    throwing an error, as you can later change the duration, the day, or delete 
                    the task. You can also download the schedule as an Excel file because I didn’t 
                    make the data persistent—it wasn’t the objective of this practice—so I needed a 
                    method to allow users (myself included) to download the schedule. While I could 
                    have used Firebase, I wanted to explore some other options.
                </p>
                <p>
                    The technologies I used for this project were TypeScript. I love using TypeScript, 
                    but it’s more straightforward without frameworks, as the types for some things can 
                    be tricky and sometimes slow down development. However, TypeScript ensures type 
                    safety, so it's a balance. 
                </p>
                <p>
                    For the first time, I used Three.js because I wanted to add a 3D object to my page, 
                    something I had never done before. Finally, I managed to insert a simple predefined 
                    figure and provide the user with a bit of interaction by allowing them to turn it 
                    left or right when they move the mouse near the donut or by clicking on mobile.
                </p>
                <p>
                    Additionally, for the first time, I worked with CSV files using TypeScript. 
                    Recently, I used the Python Pandas library, which is very flexible, but this time I
                    used JavaScript. Initially, I tried using PapaParse, which generates a CSV file, 
                    but after implementing it, I realized that it couldn't handle colors. So, I 
                    switched to ExcelJS, which is similar but allows me to apply styles and perform 
                    other tasks in Excel. Finally, to save and download the file, I used FileSaver, a 
                    utility for working with files in memory. I used it to generate the content, save 
                    it as an XLSX file, and download it.
                </p>
            </div>
        </div>
    )
}

export {
    About
}