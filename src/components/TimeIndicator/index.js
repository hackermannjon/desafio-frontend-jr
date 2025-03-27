export const RenderTimeIndicator = ({ weekDates }) => {
  const existing = document.querySelector(".time-indicator-bar");
  const grid = document.querySelector(".calendar-grid");

  if (existing) existing.remove();

  const now = new Date();
  const date = now.getDay();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  const inWeek = weekDates.some((data) => {
    return (
      data.getDate() === now.getDate() &&
      data.getMonth() === now.getMonth() &&
      data.getFullYear() === now.getFullYear()
    );
  });

  if (!inWeek) return;

  const headerHeight = 128;
  const rowHeight = 64;

  const top = (currentHour + currentMinutes / 60) * rowHeight + headerHeight;
  const baseLeft = 133;

  const bar = document.createElement("div");
  bar.className = "time-indicator-bar";
  bar.style.top = `${top}px`;
  bar.style.left = `${baseLeft}px`;

  const percentOfDay = (currentHour + currentMinutes / 60) / 24;
  const index = ((date + 6) % 7) + 1;

  const ball = document.createElement("div");
  ball.className = "time-indicator-ball";
  const ballLeft = index * 171 + 173 * percentOfDay;

  ball.style.left = `${ballLeft}px`;

  bar.appendChild(ball);
  grid.appendChild(bar);
};
