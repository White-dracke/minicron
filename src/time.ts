export const TODAY = "today";
export const TOMORROW = "tomorrow";
export const WILD = "*";
export const MAX_TIME = "24";
export const MIN_TIME = "00";
export type CronDate = "today" | "tomorrow";

export interface CronTime {
  hours: string;
  minutes: string;
}

export interface CronDateTime extends CronTime {
  date: CronDate;
}

export function createCurrentTime(timeString: string): CronTime {
  const [hours, minutes] = timeString.split(":");
  return {
    hours,
    minutes,
  };
}

export function createCronTimeAndCommand(
  cronString: string
): [CronTime, string] {
  const splittedCronString = cronString.split(" ");
  const [minutes, hours] = splittedCronString;
  return [
    {
      hours,
      minutes,
    },
    splittedCronString[2],
  ];
}

export function includesWildcards(time: CronTime): boolean {
  return includesHourWildcard(time) || includesMinuteWildcard(time);
}

export function includesHourWildcard(time: CronTime): boolean {
  return time.hours === WILD;
}

export function includesMinuteWildcard(time: CronTime): boolean {
  return time.minutes === WILD;
}

export function isBigger(cronTime: CronTime, currentTime: CronTime) {
  if (
    !includesHourWildcard(cronTime) &&
    (cronTime.hours > currentTime.hours ||
      (cronTime.hours === currentTime.hours &&
        cronTime.minutes > currentTime.hours))
  ) {
    return true;
  }
  return false;
}

export function isSmaller(cronTime: CronTime, currentTime: CronTime) {
  if (
    !includesHourWildcard(cronTime) &&
    (cronTime.hours < currentTime.hours ||
      (cronTime.hours === currentTime.hours &&
        cronTime.minutes < currentTime.hours))
  ) {
    return true;
  }
  return false;
}
