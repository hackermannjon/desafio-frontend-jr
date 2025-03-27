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
