import { days, monthNames, timeSlots } from "../utils/constants.js";
import { createStyledElement, initializeWeekDates } from "../utils/helpers.js";

const today = new Date();
const weekDates = initializeWeekDates();

const calendarContainer = document.querySelector(".calendar-container");
const gridContainer = createStyledElement({
  tag: "div",
  className: "calendar-grid",
});
calendarContainer.appendChild(gridContainer);

const createHeader = () => {
  for (let col = 0; col < 1 + days.length; col++) {
    const cell = document.createElement("div");
    if (col === 0) {
      cell.className = "corner-cell";
      cell.textContent = "";
    } else {
      cell.className = "day-header-cell";
      const index = col - 1;
      const dateObj = weekDates[index];

      const monthDiv = createStyledElement({
        tag: "div",
        className: "month",
        textContent: monthNames[dateObj.getMonth()],
      });

      const dateDiv = createStyledElement({
        tag: "div",
        className: "date",
        textContent: dateObj.getDate(),
      });

      const dayP = createStyledElement({
        tag: "p",
        className: "day",
        textContent: days[dateObj.getDay()],
      });

      if (dateObj.toDateString() === today.toDateString()) {
        cell.classList.add("today");
      }

      cell.appendChild(monthDiv);
      cell.appendChild(dateDiv);
      cell.appendChild(dayP);
    }
    gridContainer.appendChild(cell);
  }
};

const createCalendar = () => {
  timeSlots.forEach((time) => {
    const hourCell = createStyledElement({
      tag: "div",
      className: "hour-cell",
    });

    const hourWrapper = createStyledElement({
      tag: "div",
      className: "hour-wrapper",
      textContent: time,
    });

    hourCell.appendChild(hourWrapper);
    gridContainer.appendChild(hourCell);

    days.forEach((_) => {
      const dayCell = createStyledElement({
        tag: "div",
        className: "day-column",
      });

      gridContainer.appendChild(dayCell);
    });
  });
};

createHeader();
createCalendar();
