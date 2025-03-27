const calendarContainer = document.querySelector(".calendar-container");

const gridContainer = document.createElement("div");
gridContainer.className = "calendar-grid";
calendarContainer.appendChild(gridContainer);

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const totalCols = 1 + days.length;

for (let col = 0; col < totalCols; col++) {
  const cell = document.createElement("div");
  if (col === 0) {
    cell.className = "corner-cell";
    cell.textContent = "";
  } else {
    cell.className = "day-header-cell";
    const dayTitle = document.createElement("p");
    dayTitle.textContent = days[col - 1];
    cell.appendChild(dayTitle);
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
