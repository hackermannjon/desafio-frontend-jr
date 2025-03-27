export const RenderTimeIndicator = ({ weekDates }) => {
  // Remove qualquer indicador anterior
  const existing = document.querySelector(".time-indicator-bar");
  const grid = document.querySelector(".calendar-grid");
  if (existing) existing.remove();

  const now = new Date();
  const inWeek = weekDates.some((data) => {
    return (
      data.getDate() === now.getDate() &&
      data.getMonth() === now.getMonth() &&
      data.getFullYear() === now.getFullYear()
    );
  });
  if (!inWeek) return;

  const margin = 16;
  const headerHeight = 128;
  const rowHeight = 64;
  const baseLeft = 133;

  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const percentOfDay = (currentHour + currentMinutes / 60) / 24;
  const top =
    margin + (currentHour + currentMinutes / 60) * rowHeight + headerHeight;

  const bar = document.createElement("div");
  bar.className = "time-indicator-bar";
  bar.style.top = `${top}px`;
  bar.style.left = `${baseLeft}px`;

  const dia = now.getDay();
  const index = ((dia + 6) % 7) + 1;
  const ball = document.createElement("div");
  ball.className = "time-indicator-ball";
  const ballLeft = index * 171 + 173 * percentOfDay;
  ball.style.left = `${ballLeft}px`;

  // Armazena as dimensões iniciais definidas via CSS (assumindo 10px)
  ball.dataset.initialWidth = ball.style.width || "10px";
  ball.dataset.initialHeight = ball.style.height || "10px";

  ball.addEventListener("mouseenter", () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    ball.textContent = `${hours}:${minutes}`;
    ball.style.width = "30px";
    ball.style.padding = "5px";
  });
  ball.addEventListener("mouseleave", () => {
    ball.textContent = "";
    ball.style.width = "15px";
    ball.style.padding = "0";
  });

  bar.appendChild(ball);
  grid.appendChild(bar);
  return bar;
};

export const TimeIndicator = ({ weekDates }) => {
  RenderTimeIndicator({ weekDates });
  setInterval(() => {
    RenderTimeIndicator({ weekDates });
  }, 10000);
  return null;
};
