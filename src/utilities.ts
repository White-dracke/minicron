export const transform = (cronString: string, currentTime: string): string => {
  const [currentTimeHours, currentTimeMinutes] = currentTime.split(":");
  const splittedCronString = cronString.split(" ");
  const [minutes, hours] = splittedCronString;
  const command = splittedCronString[2];
  const dateString = getDateString(
    hours,
    minutes,
    currentTimeHours,
    currentTimeMinutes
  );

  return `${getHours(hours, currentTimeHours)}:${getMinutes(
    hours,
    minutes,
    currentTimeHours,
    currentTimeMinutes
  )} ${dateString} - ${command}`;
};

const getDateString = (
  hours: string,
  minutes: string,
  currentTimeHours: string,
  currentTimeMinutes: string
): string => {
  if (hours !== "*" && hours > currentTimeHours) {
    return "today";
  }
  if (hours !== "*" && hours < currentTimeHours) {
    return "tomorrow";
  }
  if (
    hours !== "*" &&
    hours === currentTimeHours &&
    minutes !== "*" &&
    minutes > currentTimeMinutes
  ) {
    return "today";
  }
  if (
    hours !== "*" &&
    hours === currentTimeHours &&
    minutes !== "*" &&
    minutes < currentTimeMinutes
  ) {
    return "tomorrow";
  }
  return "today";
};

const getHours = (hours: string, currentTimeHours: string): string => {
  return hours === "*" ? currentTimeHours : hours;
};

const getMinutes = (
  hours: string,
  minutes: string,
  currentTimeHours: string,
  currentTimeMinutes: string
): string => {
  const parsedHours = Number.parseInt(hours);
  const parsedCurrentTimeHours = Number.parseInt(currentTimeHours);
  if (!Number.isNaN(parsedHours) && parsedHours > parsedCurrentTimeHours) {
    return "00";
  } else {
    return minutes === "*" ? currentTimeMinutes : minutes;
  }
};
