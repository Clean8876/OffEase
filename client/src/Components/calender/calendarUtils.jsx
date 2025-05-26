export const getMonthMatrix = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // Sunday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const matrix = [];
  let dayCounter = 1 - startDay;

  for (let week = 0; week < 6; week++) {
    const row = [];
    for (let day = 0; day < 7; day++) {
      if (dayCounter > 0 && dayCounter <= daysInMonth) {
        row.push(new Date(year, month, dayCounter));
      } else {
        row.push(null);
      }
      dayCounter++;
    }
    matrix.push(row);
  }

  return matrix;
};
