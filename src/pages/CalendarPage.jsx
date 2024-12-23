import React, { useState } from "react";
import CalendarGrid from "../components/CalendarGrid";
import EventModal from "../components/EventModal";
import EventList from "../components/EventList";

function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modal, setModal] = useState(false);

  const [data, setData] = useState({});
  const [index, setIndex] = useState(-1);

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      return parsedEvents;
    }
    return {};
  });

  const handleDayClick = (day) => setSelectedDay(day);

  const saveEvent = (day, event) => {

    if(index>=0){
      events[day]?.splice(index, 1);
    }

    const dayEvents = events[day] || [];
    const updatedEvents = { ...events, [day]: [...dayEvents, event] };
    Object.keys(updatedEvents).forEach((date) => {
      updatedEvents[date].sort((a, b) => {
        return a.start.localeCompare(b.start);
      });
    });
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    setIndex(-1);
  };

  const deleteEvent = (day, index) => {
    const dayEvents = events[day] || [];
    dayEvents.splice(index, 1);
    const updatedEvents = { ...events, [day]: dayEvents };

    if (updatedEvents[day].length === 0) {
      let data = JSON.parse(localStorage.getItem("events"));
      delete data[day];

      Object.keys(data).forEach((date) => {
        data[date].sort((a, b) => {
          return a.start.localeCompare(b.start);
        });
      });
      localStorage.setItem("events", JSON.stringify(data));
      setEvents(data);
    } 
    else {
      Object.keys(updatedEvents).forEach((date) => {
        updatedEvents[date].sort((a, b) => {
          return a.start.localeCompare(b.start);
        });
      });
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setIndex(-1);
  };

  const editHandler = (selectedDay, index) => {
    const data1 = { data: events[selectedDay][index], day: selectedDay };
    setData(data1);
    setIndex(index);
    openModal();
  };

  const addHandler = () => {
    setData({});
    openModal();
  };

  return (
    <div>
      <div className="w-fit mx-auto text-5xl font-bold underline mt-5">
        Calendar
      </div>
      <div className="flex mt-20">
        <CalendarGrid events={events} onDayClick={handleDayClick} />
        {selectedDay && (
          <div className="mr-10">
            <EventList
              selectedDay={selectedDay}
              events={events[selectedDay] || []}
              onDelete={deleteEvent}
              onAdd={addHandler}
              onEdit={editHandler}
            />
            <EventModal
              status={modal}
              edit={data}
              selectedDay={selectedDay}
              events={events[selectedDay] || []}
              onSave={saveEvent}
              onClose={() => {
                closeModal();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
