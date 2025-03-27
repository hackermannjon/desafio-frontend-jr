import { days, monthNames, timeSlots } from "../utils/constants.js";

const calendarContainer = document.querySelector(".calendar-container");
const gridContainer = document.createElement("div");
gridContainer.className = "calendar-grid";
calendarContainer.appendChild(gridContainer);

const today = new Date();
const currentDayOfWeek = today.getDay();
const sunday = new Date(today);
sunday.setDate(today.getDate() - currentDayOfWeek);

const weekDates = [];
for (let i = 0; i < 7; i++) {
  const d = new Date(sunday);
  d.setDate(sunday.getDate() + i);
  weekDates.push(d);
}

fetch("eventos.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.error("Erro ao carregar eventos:", err));

const totalCols = 1 + days.length;

const createDateElement = ({ tag, className, textContent }) => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textContent;
  return element;
};

for (let col = 0; col < totalCols; col++) {
  const cell = document.createElement("div");
  if (col === 0) {
    cell.className = "corner-cell";
    cell.textContent = "";
  } else {
    cell.className = "day-header-cell";
    const index = col - 1;
    const dateObj = weekDates[index];

    const monthDiv = createDateElement({
      tag: "div",
      className: "month",
      textContent: monthNames[dateObj.getMonth()],
    });

    const dateDiv = createDateElement({
      tag: "div",
      className: "date",
      textContent: dateObj.getDate(),
    });

    const dayP = createDateElement({
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

timeSlots.forEach((time) => {
  const hourCell = createDateElement({
    tag: "div",
    className: "hour-cell",
  });

  const hourWrapper = createDateElement({
    tag: "div",
    className: "hour-wrapper",
    textContent: time,
  });

  hourCell.appendChild(hourWrapper);
  gridContainer.appendChild(hourCell);

  days.forEach((_) => {
    const dayCell = createDateElement({
      tag: "div",
      className: "day-column",
    });

    gridContainer.appendChild(dayCell);
  });
});
console.log(timeSlots);
