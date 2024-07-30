/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// props are defined as typescript is used for type validation

interface ResourceProp {
  year: number;
  month: number;
  events: any[];
  currentDragEvent: any;
  onMouseDown: (
    e: React.MouseEvent,
    resourceIndex: number,
    dayIndex: number
  ) => void;
  onDelete: (id: number) => void;
}

// Resources component to display events in a grid format

export const Resources = ({
  year,
  month,
  events,
  currentDragEvent,
  onMouseDown,
  onDelete,
}: ResourceProp) => {
  // List of resources to be displayed in the first column
  const resources = [
    "Resource A",
    "Resource B",
    "Resource C",
    "Resource D",
    "Resource E",
    "Resource F",
    "Resource G",
    "Resource H",
    "Resource I",
    "Resource J",
    "Resource K",
    "Resource L",
    "Resource M",
    "Resource N",
    "Resource O",
  ];

  // Calculate the number of days in the selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create an array of dates for the selected month
  const days = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1)
  );

  // Format time from hours in decimal format to a 12-hour time string
  const formatTime = (hours: any) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    const period = h < 12 ? "AM" : "PM";
    const formattedHour = h % 12 === 0 ? 12 : h % 12; // Adjust hours for 12-hour format
    return `${formattedHour}:${m.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div className="grid grid-cols-12 w-full">
      {/* Column for resource names */}

      <div className="col-span-2">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="flex items-center h-12 border border-gray-300"
          >
            <span className="p-4 cursor-default font-medium">{resource}</span>
          </div>
        ))}
      </div>

      {/* Column for days and events */}

      <div className="col-span-10">
        {resources.map((_, resourceIndex) => (
          <div key={resourceIndex} className="flex h-12 relative">
            {days.map((_, dayIndex) => (
              <div
                key={dayIndex}
                className="min-w-[80px] border border-gray-300 p-2 relative cell"
                onMouseDown={(e) => onMouseDown(e, resourceIndex, dayIndex)} // Handle event creation on mouse down
              >
                {/* Render events for the current resource and day */}

                {events
                  .filter(
                    (event) =>
                      event.resource === resourceIndex && event.day === dayIndex
                  )
                  .map((event) => (
                    <div
                      key={event.id}
                      className="event absolute"
                      style={{
                        left: `${event.start}px`,
                        width: `${event.width}px`,
                        top: 0,
                        height: "100%",
                        backgroundColor: event.color,
                      }}
                      onClick={() => onDelete(event.id)} // Handle event deletion
                    >
                      <div className="event-content">
                        <div>New Event</div>
                        <div>
                          {formatTime(event.startTime)} -{" "}
                          {formatTime(event.endTime)}
                        </div>
                        <button
                          className="delete-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(event.id); // Trigger event deletion
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}

                {/* Render the current dragging event */}

                {currentDragEvent &&
                  currentDragEvent.resource === resourceIndex &&
                  currentDragEvent.day === dayIndex && (
                    <div
                      className="event absolute"
                      style={{
                        left: `${currentDragEvent.start}px`,
                        width: `${currentDragEvent.width}px`,
                        top: 0,
                        height: "100%",
                        backgroundColor: currentDragEvent.color,
                        opacity: 0.5,
                      }}
                    >
                      <div className="event-content">
                        <div>Dragging</div>
                        <div>
                          {formatTime(currentDragEvent.startTime)} -{" "}
                          {formatTime(currentDragEvent.endTime)}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
