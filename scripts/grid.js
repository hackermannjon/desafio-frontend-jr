const calendarContainer = document.querySelector(".calendar-container");
const gridContainer = document.createElement("div");
gridContainer.className = "calendar-grid";
calendarContainer.appendChild(gridContainer);

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
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

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
const totalCols = 1 + days.length;

for (let col = 0; col < totalCols; col++) {
  const cell = document.createElement("div");
  if (col === 0) {
    cell.className = "corner-cell";
    cell.textContent = "";
  } else {
    cell.className = "day-header-cell";
    const index = col - 1;
    const dateObj = weekDates[index];

    const monthDiv = document.createElement("div");
    monthDiv.className = "day-month";
    monthDiv.textContent = monthNames[dateObj.getMonth()];

    const dateDiv = document.createElement("div");
    dateDiv.className = "day-date";
    dateDiv.textContent = dateObj.getDate();

    const dayP = document.createElement("p");
    dayP.className = "day-abbr";
    dayP.textContent = days[dateObj.getDay()];

    if (dateObj.toDateString() === today.toDateString()) {
      cell.classList.add("today");
    }

    cell.appendChild(monthDiv);
    cell.appendChild(dateDiv);
    cell.appendChild(dayP);
  }
  gridContainer.appendChild(cell);
}

const times = [
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
];

for (let i = 0; i < times.length; i++) {
  const hourCell = document.createElement("div");
  hourCell.className = "hour-cell";

  const hourWrapper = document.createElement("div");
  hourWrapper.className = "hour-wrapper";
  hourWrapper.textContent = times[i];

  hourCell.appendChild(hourWrapper);
  gridContainer.appendChild(hourCell);

  for (let j = 0; j < days.length; j++) {
    const dayCell = document.createElement("div");
    dayCell.className = "day-column";
    gridContainer.appendChild(dayCell);
  }
}
