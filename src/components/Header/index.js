import { updateComponents } from "../../../app.js";
import { days, monthNames } from "../../../utils/constants.js";
import { createStyledElement, getWeekDates } from "../../../utils/helpers.js";

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

export const createSelect = ({ weekDates, currentWeekStart }) => {
  const headerContainer = document.querySelector(".calendar-nav");
  const selectContainer = createStyledElement({
    tag: "select",
    className: "select",
    textContent: "",
  });
  selectContainer.id = "select";

  for (let i = 0; i < monthNames.length; i++) {
    const monthDiv = createStyledElement({
      tag: "option",
      className: "month",
      textContent: monthNames[i],
    });
    monthDiv.id = i;
    selectContainer.appendChild(monthDiv);
  }

  headerContainer.appendChild(selectContainer);

  document.getElementById("select").addEventListener("change", (e) => {
    const index = monthNames.indexOf(e.target.value);
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setMonth(index - 1);
    weekDates = getWeekDates(prevWeek);
    updateComponents({ weekByMonth: weekDates });
  });
};

export const updateHeader = ({ weekDates }) => {
  const today = new Date();
  const totalCols = 1 + days.length;

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
