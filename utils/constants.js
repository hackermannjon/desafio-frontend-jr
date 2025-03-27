export const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const period = i < 12 ? "AM" : "PM";
  return `${hour} ${period}`;
});
