export const DEFAULT_CITY = "Brooklyn, NY";

export enum Day {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export const daysOfWeek = [
  Day.Sunday,
  Day.Monday,
  Day.Tuesday,
  Day.Wednesday,
  Day.Thursday,
  Day.Friday,
  Day.Saturday,
];

export const today = daysOfWeek[new Date().getDay()];

export enum Time {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
}

export const timeOfDay = [Time.Morning, Time.Afternoon, Time.Evening];

export const MORNING_HOURS = [
  "06:00:00",
  "07:00:00",
  "08:00:00",
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
];
export const AFTERNOON_HOURS = [
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
];
export const EVENING_HOURS = [
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
  "20:00:00",
  "21:00:00",
  "22:00:00",
  "23:00:00",
];
