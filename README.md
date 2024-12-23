# Dynamic Event Calendar Application

A simple and intuitive event scheduler app built with React, designed to help users manage their daily events efficiently. The app supports adding, editing, searching, and deleting events, with validation to prevent overlapping schedules.

---

## Features

1. **Add Events**  
-  Users can create events for a specific day with details like name, start time, end time, and description.  
- Ensures no overlapping events are allowed.  

2. **Edit Events**  
- Modify existing events with pre-filled forms for a seamless editing experience.  

3. **Delete Events**  
- Easily remove any unwanted events.  

4. **Search Events**  
- Filter events based on name or description using a keyword search.  

5. **Event Validation**  
- Validates input fields to ensure required data is provided and prevents scheduling conflicts.  

6. **Persistent Storage**  
- Events are saved in `localStorage` for persistence across sessions.  

7. **Dynamic UI**  
- Highlights weekends and weekdays in the calendar for better visual clarity.  

---

## How to Run Locally

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/aryanak-18/Dacoid-Digital-Assignment-AryanKumar.git
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Deployed App

The app is deployed and can be accessed via the following link:  
https://dacoidassignment-aryankumar18.vercel.app

---

## Technologies Used

- **Frontend**: React, TailwindCSS
- **State Management**: React Hooks
- **Storage**: localStorage