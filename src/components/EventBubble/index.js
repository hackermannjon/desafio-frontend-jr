import { hexToRgb, truncateText } from "../../../utils/helpers.js";

export const createEventBubble = (
  nome,
  dataInicio,
  dataFim,
  baseColor,
  isConflicted
) => {
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

  const bubbleWidth = isConflicted ? null : 141;

  bubble.className = "event-bubble";

  const p = document.createElement("p");
  bubble.appendChild(p);

  bubble.style.top = `${top - 16}px`;
  bubble.style.height = `${bubbleHeight}px`;
  bubble.style.margin = `${margin}px`;
  if (bubbleWidth) {
    bubble.style.width = `${bubbleWidth}px`;
  }

  const { r, g, b } = hexToRgb(baseColor);
  bubble.style.setProperty("--base-color", `rgba(${r}, ${g}, ${b}, 0.32)`);
  bubble.style.setProperty("--hover-color", `rgba(${r}, ${g}, ${b}, 0.8)`);

  const limitPerRow = bubbleWidth === 141 ? 14 : 3;
  const NumberOfRows = durationHours * 2;

  p.textContent = truncateText(nome, limitPerRow, NumberOfRows);
  bubble.dataset.fullText = nome;
  bubble.dataset.charLimit = limitPerRow * NumberOfRows;

  const initialWidth = bubbleWidth ? bubbleWidth : bubble.offsetWidth || 141;
  bubble.dataset.initialWidth = initialWidth;

  bubble.addEventListener("mouseenter", () => {
    p.textContent = bubble.dataset.fullText;
    bubble.style.width = "141px";
    const initialHeight =
      parseFloat(bubble.dataset.initialHeight) || bubbleHeight;
    const requiredHeight = bubble.scrollHeight;
    bubble.style.height = Math.max(requiredHeight, initialHeight) + "px";
    bubble.style.zIndex = "1000";
  });

  bubble.addEventListener("mouseleave", () => {
    p.textContent = truncateText(nome, limitPerRow, NumberOfRows);
    bubble.style.width = `${bubble.dataset.initialWidth}px`;
    bubble.style.height = `${bubbleHeight}px`;
    bubble.style.zIndex = "0";
  });

  return bubble;
};

export const renderEventColumns = (mappedEvents, weekDates) => {
  const grid = document.querySelector(".calendar-grid");
  const oldBubbles = grid.querySelectorAll(".event-bubble");
  oldBubbles.forEach((bubble) => bubble.remove());

  weekDates.forEach((dateObj, dayIndex) => {
    const dayKey = dateObj.toISOString().split("T")[0];
    const eventsForDay = mappedEvents[dayKey] || [];
    const baseLeft = 133 + dayIndex * 173;

    if (eventsForDay.length === 2) {
      const firstEnd = new Date(eventsForDay[0].data_fim);
      const secondStart = new Date(eventsForDay[1].data_inicio);
      if (secondStart < firstEnd) {
        const conflictedBubbleWidth = (141 - 16) / 2;
        eventsForDay.forEach((event, index) => {
          const bubble = createEventBubble(
            event.nome,
            event.data_inicio,
            event.data_fim,
            event.cor,
            true
          );
          bubble.style.width = `${conflictedBubbleWidth}px`;
          bubble.dataset.initialWidth = conflictedBubbleWidth;
          const left =
            index === 0 ? baseLeft : baseLeft + conflictedBubbleWidth + 16;
          bubble.style.left = `${left}px`;
          grid.appendChild(bubble);
        });
        return;
      }
    }

    eventsForDay.forEach((event) => {
      const bubble = createEventBubble(
        event.nome,
        event.data_inicio,
        event.data_fim,
        event.cor
      );
      bubble.style.left = `${baseLeft}px`;
      grid.appendChild(bubble);
    });
  });
};
