export const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export const monthNames = [
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

export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const period = i < 12 ? "AM" : "PM";
  return `${hour} ${period}`;
});
