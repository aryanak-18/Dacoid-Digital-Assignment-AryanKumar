import React from "react";
import CalendarPage from "./pages/CalendarPage";

function App() {
  // You can populate the data by uncommenting from line-8 to line-19, then reload and comment these lines again so that localStorage is not overwritten

  //   const dummyData = {
  //   "01-12-2024": [
  //     { name: "Event 1", start: "10:00", end: "12:00", description: "Meeting with team" },
  //   ],
  //   "05-12-2024": [
  //     { name: "Event 2", start: "14:00", end: "15:00", description: "Doctor's appointment" },
  //   ],
  //   "10-12-2024": [
  //     { name: "Event 3", start: "09:00", end: "11:00", description: "Conference call" },
  //     { name: "Event 5", start: "16:00", end: "18:00", description: "Dummy" },
  //   ],
  // }
  // localStorage.setItem("events", JSON.stringify(dummyData));

  return <CalendarPage />;
}

export default App;
