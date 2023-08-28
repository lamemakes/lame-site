import type { Project } from "@/types/projects.interface";

// Gets the date in the format of "<worded month> <number day>, <number year>"
const getPrettyDate = (dateIn: Date): string => {
  const day = (dateIn.getDate() + 1).toString(); // One is added due to the weirdness of JS String => Date parsing. See https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const month = getLongMonth(dateIn.getMonth());
  const year = dateIn.getFullYear().toString();

  return month + " " + day + ", " + year;
};

// Sort project by date, incoming dates should be in the "YYYY-dd-mm" format
const sortProjectDates = (arrayIn: Project[]): Project[] => {
  arrayIn.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );
  arrayIn.reverse();

  return arrayIn;
};

// Gets the worded month from the number month
const getLongMonth = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
};

// Export date utils for use
const dateUtils = {
  getPrettyDate,
  sortProjectDates,
  getLongMonth,
};

export default dateUtils;
