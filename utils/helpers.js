export const initializeWeekDates = () => {
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

  return weekDates;
};

export const createStyledElement = ({ tag, className, textContent }) => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textContent;
  return element;
};

export const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getWeekDates = (weekStart) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    dates.push(d);
  }
  return dates;
};

export const mapEventsByDay = (events) => {
  const mappedEvents = {};

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.data_inicio) - new Date(b.data_inicio)
  );

  sortedEvents.forEach((event) => {
    const dayKey = event.data_inicio.split("T")[0];

    if (!mappedEvents[dayKey]) {
      mappedEvents[dayKey] = [];
    }

    mappedEvents[dayKey].push(event);
  });

  return mappedEvents;
};

export const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

export const truncateText = (text, limitPerRow, numberOfRows) => {
  const maxChars = limitPerRow * numberOfRows;
  const words = text.split(" ");
  let result = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (result === "") {
      if (word.length > limitPerRow) {
        return word.slice(0, limitPerRow - 3) + "...";
      } else {
        result = word;
      }
    } else {
      const test = result + " " + word;
      if (test.length > maxChars) {
        return result.trim() + "...";
      }
      if (word.length > limitPerRow) {
        const truncatedWord = word.slice(0, limitPerRow - 3) + "...";
        result += " " + truncatedWord;
        return result.trim();
      }
      result = test;
    }
  }
  return result;
};

export function groupConflictingEvents(events) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.data_inicio) - new Date(b.data_inicio)
  );
  const groups = [];
  let currentGroup = [];
  let currentMaxEnd = null;

  for (const event of sorted) {
    const start = new Date(event.data_inicio);
    const end = new Date(event.data_fim);
    if (currentGroup.length === 0) {
      currentGroup.push(event);
      currentMaxEnd = end;
    } else {
      if (start < currentMaxEnd) {
        currentGroup.push(event);
        if (end > currentMaxEnd) {
          currentMaxEnd = end;
        }
      } else {
        groups.push(currentGroup);
        currentGroup = [event];
        currentMaxEnd = end;
      }
    }
  }
  if (currentGroup.length) {
    groups.push(currentGroup);
  }
  return groups;
}
