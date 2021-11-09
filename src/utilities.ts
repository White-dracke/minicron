import {
  createCurrentTime,
  createCronTimeAndCommand,
  CronTime,
  includesHourWildcard,
  isSmaller,
  includesMinuteWildcard,
  TODAY,
  TOMORROW,
  CronDateTime,
  CronDate,
  MAX_TIME,
  MIN_TIME,
  zeroPad,
} from "./time";

export const transform = (
  cronString: string,
  currentTimeStr: string
): string => {
  const currentTime = createCurrentTime(currentTimeStr);
  const [cronTime, command] = createCronTimeAndCommand(cronString);

  const dateTime = getDateTime(cronTime, currentTime);

  return `${dateTime.hours}:${dateTime.minutes} ${dateTime.date} - ${command}`;
};

const getDateTime = (
  cronTime: CronTime,
  currentTime: CronTime
): CronDateTime => {
  const hours = getHours(cronTime, currentTime);
  const minutes = getMinutes(cronTime, currentTime);
  const date = getDateString(cronTime, currentTime);

  return sanitizeDateTime({
    hours,
    minutes,
    date,
  });
};

const sanitizeDateTime = (dateTime: CronDateTime): CronDateTime => {
  return {
    hours: dateTime.hours === MAX_TIME ? MIN_TIME : dateTime.hours,
    minutes: zeroPad(dateTime.minutes),
    date: dateTime.hours === MAX_TIME ? TOMORROW : dateTime.date,
  };
};

const getDateString = (cronTime: CronTime, currentTime: CronTime): CronDate => {
  if (isSmaller(cronTime, currentTime)) {
    return TOMORROW;
  }
  return TODAY;
};

const getHours = (cronTime: CronTime, currentTime: CronTime): string => {
  if (
    includesHourWildcard(cronTime) &&
    !includesMinuteWildcard(cronTime) &&
    Number.parseInt(cronTime.minutes) < Number.parseInt(currentTime.minutes)
  ) {
    return `${Number.parseInt(currentTime.hours) + 1}`;
  }
  return includesHourWildcard(cronTime) ? currentTime.hours : cronTime.hours;
};

const getMinutes = (cronTime: CronTime, currentTime: CronTime): string => {
  if (
    !includesHourWildcard(cronTime) &&
    (Number.parseInt(cronTime.hours) > Number.parseInt(currentTime.hours) ||
      (includesMinuteWildcard(cronTime) &&
        Number.parseInt(cronTime.hours) < Number.parseInt(currentTime.hours)))
  ) {
    return MIN_TIME;
  } else {
    return includesMinuteWildcard(cronTime)
      ? currentTime.minutes
      : cronTime.minutes;
  }
};
