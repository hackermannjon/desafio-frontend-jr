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
