# Your Rounded Week

This is a web app created from scratch using TypeScript, React, and libraries like Three.js and ExcelJS. 

The app was developed to refresh my knowledge of React after a long period using other technologies. It served as a valuable exercise in state management, integrating new libraries, and problem-solving.

You can see the app:
[Your rounded week](https://your-rounded-week.netlify.app/)

## Installation

To install and run this app locally, follow these steps:

1. **Install Node.js**

   Ensure you have Node.js installed on your computer. You can download it from [Node.js official website](https://nodejs.org/en/download/package-manager/current).

2. **Download the Project**

   Clone or download the project repository to your local machine.

3. **Install Dependencies**

   Navigate to the project folder in your terminal and install the necessary Node modules:

   ```bash
   npm install
   ```
4. Run the App
  To start the app locally, run:
  ```bash
  npm run dev
  ```

## Usage

To use the app:

Navigate

Use the navbar to navigate. The main functionality is on the /schedule page. The other pages contain information and text.

Add Notes

On the schedule page, you'll see a table with cells for each hour of each day of the week. Above the table, there are input fields to add a note. Fill in all the fields and click the "Add Note" button on the right to add it.

Edit or Delete Notes

To modify a note, click on the cell containing the note. The note's details will be loaded into the form. You can then choose to delete or edit the note.

Delete: This will remove the entire note. If you need to adjust its duration or change its time, it's better to use the edit option.
Edit: You can change the note's day, hour, color, text, or duration.
View and Download

The app displays a limited number of characters for each note to keep the view clean. For longer notes, only part of the text will be visible until you download it.

To download your schedule, click the button at the bottom of the page, below the table. You can download the schedule as an Excel file.

## Tags

- TypeScript
- React
- Three.js
- ExcelJS
- Web Application
- Node.js
