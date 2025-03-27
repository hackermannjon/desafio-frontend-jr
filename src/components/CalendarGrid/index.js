import { days, timeSlots } from "../../../utils/constants.js";
import { createStyledElement } from "../../../utils/helpers.js";

const gridContainer = document.querySelector(".calendar-grid");

export const createCalendar = () => {
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
