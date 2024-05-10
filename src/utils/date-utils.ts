import {
  AFTERNOON_HOURS,
  Day,
  EVENING_HOURS,
  MORNING_HOURS,
  Time,
  daysOfWeek,
} from "./constants";

/** Calculates the next occurrence of a specific day of the week based on the current date ("Day" to "yyyy-mm-dd") */
export function getNextDayOfWeek(dayOfWeek: Day, offset: number = 0): string {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const targetDayOfWeek = daysOfWeek.indexOf(dayOfWeek);

  let difference = targetDayOfWeek - currentDayOfWeek + offset * 7; // multiply weeks offset by 7 days
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + difference);

  const formattedNextDate = `${nextDate.getFullYear()}-${String(
    nextDate.getMonth() + 1
  ).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;
  return formattedNextDate;
}

/** Filters the data by time of day */
export function filterTimeData(targetDayData: any, userSelection: Time) {
  let selectedHours: string[];

  switch (userSelection) {
    case Time.Afternoon:
      selectedHours = AFTERNOON_HOURS;
      break;
    case Time.Evening:
      selectedHours = EVENING_HOURS;
      break;
    default:
      selectedHours = MORNING_HOURS;
      break;
  }

  // Filter data based on selected hours
  const filteredData = targetDayData?.hours?.filter(
    (hour: { datetime: string }) => selectedHours.includes(hour.datetime)
  );

  return filteredData;
}

/** Extracts the Day from a date string ("yyyy-mm-dd" to "Nth") */
export function getDayFromDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00Z`);
  const day = date.getUTCDate();
  const suffix = getDaySuffix(day);
  return day + suffix;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/** Converts time to 12 hour format ("hh:mm:ss" to "h:mm Xm") */
export function convertTo12HourFormat(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);

  const time = new Date(0, 0, 0, hours, minutes);

  const formattedTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
}
