import { fetchEvents } from "./services/events.js";
import { createCalendar } from "./src/components/CalendarGrid/index.js";
import { renderEventColumns } from "./src/components/EventBubble/index.js";
import {
  createHeader,
  createSelect,
  updateHeader,
} from "./src/components/Header/index.js";
import { TimeIndicator } from "./src/components/TimeIndicator/index.js";
import { getWeekDates, getWeekStart, mapEventsByDay } from "./utils/helpers.js";

const today = new Date();
let events = await fetchEvents();
const mappedEvents = mapEventsByDay(events.eventos);
const mappedEventKeys = Object.keys(mappedEvents);
let currentWeekStart = getWeekStart(today);
let weekDates = getWeekDates(currentWeekStart);
const earliestDate = mappedEventKeys[0];
const latestDate = mappedEventKeys[mappedEventKeys.length - 1];

const updateNavButtons = () => {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  if (earliestDate) {
    prevBtn.disabled = currentWeekStart <= getWeekStart(earliestDate);
  }
  if (latestDate) {
    nextBtn.disabled = currentWeekStart >= getWeekStart(latestDate);
  }
};

const buttonListeners = () => {
  document.getElementById("next-btn").addEventListener("click", () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    if (!latestDate || nextWeek <= getWeekStart(latestDate)) {
      currentWeekStart = nextWeek;
      weekDates = getWeekDates(currentWeekStart);

      updateComponents();
    }
  });

  document.getElementById("prev-btn").addEventListener("click", () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);
    if (!earliestDate || prevWeek >= getWeekStart(earliestDate)) {
      currentWeekStart = prevWeek;
      weekDates = getWeekDates(currentWeekStart);
      updateComponents();
    }
  });

  document.getElementById("next-year-btn").addEventListener("click", () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 365);
    console.log(nextWeek);
    currentWeekStart = nextWeek;
    weekDates = getWeekDates(currentWeekStart);

    updateComponents();
  });

  document.getElementById("last-year-btn").addEventListener("click", () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 365);
    console.log(prevWeek);

    currentWeekStart = prevWeek;

    weekDates = getWeekDates(currentWeekStart);
    updateComponents();
  });

  document.getElementById("today-btn").addEventListener("click", () => {
    currentWeekStart = getWeekStart(today);
    weekDates = getWeekDates(currentWeekStart);

    const grid = document.querySelector(".calendar-grid");
    grid.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      updateComponents();
    }, 300);
  });
};

export const updateComponents = ({ weekByMonth } = {}) => {
  weekDates = weekByMonth ?? weekDates;
  updateHeader({ weekDates });
  updateNavButtons();
  renderEventColumns(mappedEvents, weekDates);
  TimeIndicator({ weekDates });
};

createHeader({ weekDates });
createCalendar();
buttonListeners();
updateComponents();
createSelect({ weekDates, currentWeekStart });
