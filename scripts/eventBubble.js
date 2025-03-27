import { hexToRgb } from "../utils/helpers.js";

export const createEventBubble = (nome, dataInicio, dataFim, baseColor) => {
  const margin = 16;
  const headerHeight = 128;
  const rowHeight = 64;

  const eventStart = new Date(dataInicio);
  const eventEnd = new Date(dataFim);

  const hour = eventStart.getHours();
  const minutes = eventStart.getMinutes();
  const top = margin + (hour + minutes / 60) * rowHeight + headerHeight;

  const durationHours = (eventEnd - eventStart) / (1000 * 60 * 60);
  const bubbleHeight = durationHours * rowHeight - 32;

  const bubble = document.createElement("div");
  bubble.className = "event-bubble";
  bubble.textContent = nome;

  bubble.style.top = `${top - 16}px`;
  bubble.style.height = `${bubbleHeight}px`;
  bubble.style.margin = `${margin}px`;

  const { r, g, b } = hexToRgb(baseColor);

  bubble.style.setProperty("--base-color", `rgba(${r}, ${g}, ${b}, 0.32)`);
  bubble.style.setProperty("--hover-color", `rgba(${r}, ${g}, ${b}, 0.8)`);

  return bubble;
};

export const renderEventColumns = (mappedEvents, weekDates) => {
  const grid = document.querySelector(".calendar-grid");
  const oldBubbles = grid.querySelectorAll(".event-bubble");
  oldBubbles.forEach((bubble) => bubble.remove());

  weekDates.forEach((dateObj, dayIndex) => {
    const dayKey = dateObj.toISOString().split("T")[0];
    const eventsForDay = mappedEvents[dayKey] || [];

    eventsForDay.forEach((event) => {
      const bubble = createEventBubble(
        event.nome,
        event.data_inicio,
        event.data_fim,
        event.cor
      );

      const left = 133 + dayIndex * 173;
      bubble.style.left = `${left}px`;

      grid.appendChild(bubble);
    });
  });
};
