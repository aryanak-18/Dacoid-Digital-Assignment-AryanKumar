import React, { useEffect, useState } from "react";

function EventModal({
  status,
  edit = {},
  selectedDay,
  events,
  onSave,
  onClose,
}) {
  const editStatus = Object.keys(edit).length !== 0;

  const [newEvent, setNewEvent] = useState({
    name: "",
    start: "",
    end: "",
    description: "",
  });

  useEffect(() => {
    if (editStatus) {
      setNewEvent(edit.data);
    } else {
      setNewEvent({
        name: "",
        start: "",
        end: "",
        description: "",
      });
    }
  }, [edit, editStatus]);

  const handleSave = () => {
    if (!newEvent?.name || !newEvent?.start || !newEvent?.end) {
      alert("Event name, start time, and end time are required!");
      return;
    }

    if (editStatus) {
      const x = events?.filter(
        (event) =>
          event?.name !== edit?.data.name ||
          event?.start !== edit?.data.start ||
          event?.end !== edit?.data.end ||
          event?.description !== edit?.data.description
      );

      if (
        x &&
        x.some(
          (event) =>
            (newEvent.start >= event.start && newEvent.start <= event.end) ||
            (newEvent.end >= event.start && newEvent.end <= event.end) ||
            (event.start >= newEvent.start && event.start <= newEvent.end) ||
            (event.end >= newEvent.start && event.end <= newEvent.end)
        )
      ) {
        alert("An event already exists at this time.");
        return;
      }
    } else {
      if (
        events &&
        events.some(
          (event) =>
            (newEvent.start >= event.start && newEvent.start <= event.end) ||
            (newEvent.end >= event.start && newEvent.end <= event.end) ||
            (event.start >= newEvent.start && event.start <= newEvent.end) ||
            (event.end >= newEvent.start && event.end <= newEvent.end)
        )
      ) {
        alert("An event already exists at this time.");
        return;
      }
    }

    onSave(selectedDay, newEvent);
    setNewEvent({ name: "", start: "", end: "", description: "" });
    onClose();
  };

  return (
    status && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {editStatus ? (
            <></>
          ) : (
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Events for {selectedDay}
            </h2>
          )}

          <div className="space-y-4 mb-4"></div>

          <div className="space-y-4">
            <input
              required={true}
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-4">
              <input
                required={true}
                type="time"
                value={newEvent.start}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                required={true}
                type="time"
                value={newEvent.end}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default EventModal;
