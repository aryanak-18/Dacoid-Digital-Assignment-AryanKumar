import React, { useState } from "react";

function EventList({ selectedDay, events, onDelete, onAdd, onEdit }) {
  const [keyword, setKeyword] = useState("");

  const filteredEvents = events?.filter(
    (event) =>
      event.name.toLowerCase().includes(keyword.toLowerCase()) ||
      event.description?.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Events for {selectedDay}
      </h2>
      <div className="flex gap-5 my-auto items-center mb-5">
        <button
          onClick={onAdd}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Event
        </button>
        <input
          className="w-fit h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 flex items-center"
          type="text"
          placeholder="Search Events"
          onChange={(e) => {
            setTimeout(() => {
              setKeyword(e.target.value);
            }, 300);
          }}
        />
      </div>

      {filteredEvents && filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <div
            key={index}
            className="p-4 mb-4 border rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
          >
            <h3 className="text-xl font-medium">{event.name}</h3>
            <p className="text-gray-700">
              <strong>Time:</strong> {event.start} - {event.end}
            </p>
            {event.description && (
              <p className="text-gray-600 mt-2">{event.description}</p>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => onEdit(selectedDay, index)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(selectedDay, index)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No events scheduled for this day.
        </p>
      )}
    </div>
  );
}

export default EventList;
