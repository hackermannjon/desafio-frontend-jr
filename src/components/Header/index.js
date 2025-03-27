import { days, monthNames } from "../../../utils/constants.js";
import { createStyledElement } from "../../../utils/helpers.js";

const gridContainer = document.querySelector(".calendar-grid");

export const createHeader = () => {
  const totalCols = 1 + days.length;
  for (let col = 0; col < totalCols; col++) {
    const cell = document.createElement("div");
    if (col === 0) {
      cell.className = "corner-cell";
      cell.textContent = "";
    } else {
      cell.className = "day-header-cell";
      const monthDiv = document.createElement("div");
      monthDiv.className = "month";
      const dateDiv = document.createElement("div");
      dateDiv.className = "date";
      const dayP = document.createElement("p");
      dayP.className = "day";

      cell.appendChild(monthDiv);
      cell.appendChild(dateDiv);
      cell.appendChild(dayP);
    }
    gridContainer.appendChild(cell);
  }
};

export const updateHeader = ({ weekDates }) => {
  const today = new Date();
  const totalCols = 1 + days.length;
  // Remova a linha abaixo que redefinia o currentWeekStart e weekDates!
  // let currentWeekStart = getWeekStart(today);
  // weekDates = getWeekDates(currentWeekStart);

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
    cell.style.animation = "none";
    void cell.offsetWidth;
    cell.style.animation = "headerIn 0.8s ease forwards";
  }
};
