import { fetchEvents } from "../services/events.js";
import { days, monthNames, timeSlots } from "../utils/constants.js";
import {
  createStyledElement,
  getWeekDates,
  getWeekStart,
  mapEventsByDay,
} from "../utils/helpers.js";
import { renderEventColumns } from "./eventBubble.js";

const gridContainer = document.querySelector(".calendar-grid");

const today = new Date();
let events = await fetchEvents();
const mappedEvents = mapEventsByDay(events.eventos);
const mappedEventKeys = Object.keys(mappedEvents);
let currentWeekStart = getWeekStart(today);
let weekDates = getWeekDates(currentWeekStart);
const earliestDate = mappedEventKeys[0];
const latestDate = mappedEventKeys[mappedEventKeys.length - 1];
const totalCols = 1 + days.length;

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

function updateHeader() {
  weekDates = getWeekDates(currentWeekStart);
  for (let col = 1; col < totalCols; col++) {
    const cell = gridContainer.children[col];
    cell.innerHTML = "";
    const dateObj = weekDates[col - 1];
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
    cell.appendChild(monthDiv);
    cell.appendChild(dateDiv);
    cell.appendChild(dayP);
    if (dateObj.toDateString() === today.toDateString()) {
      cell.classList.add("today");
    } else {
      cell.classList.remove("today");
    }
  }
}

function updateNavButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  if (earliestDate) {
    prevBtn.disabled = currentWeekStart <= getWeekStart(earliestDate);
  }
  if (latestDate) {
    nextBtn.disabled = currentWeekStart >= getWeekStart(latestDate);
  }
}

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

const buttonListeners = () => {
  document.getElementById("next-btn").addEventListener("click", () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    if (!latestDate || nextWeek <= getWeekStart(latestDate)) {
      currentWeekStart = nextWeek;
      updateHeader();
      updateNavButtons();
      weekDates = getWeekDates(currentWeekStart);
      renderEventColumns(mappedEvents, weekDates);
    }
  });

  document.getElementById("prev-btn").addEventListener("click", () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);
    if (!earliestDate || prevWeek >= getWeekStart(earliestDate)) {
      currentWeekStart = prevWeek;
      updateHeader();
      updateNavButtons();
      weekDates = getWeekDates(currentWeekStart);
      renderEventColumns(mappedEvents, weekDates);
    }
  });

  document.getElementById("today-btn").addEventListener("click", () => {
    currentWeekStart = getWeekStart(today);
    updateHeader();
    updateNavButtons();
    weekDates = getWeekDates(currentWeekStart);
    renderEventColumns(mappedEvents, weekDates);
  });
};

createHeader();
createCalendar();
buttonListeners();
renderEventColumns(mappedEvents, weekDates);
