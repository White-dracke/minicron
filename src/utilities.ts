import {
  createCurrentTime,
  createCronTimeAndCommand,
  CronTime,
  includesHourWildcard,
  isBigger,
  isSmaller,
  includesMinuteWildcard,
  TODAY,
  TOMORROW,
  CronDateTime,
  CronDate,
  MAX_TIME,
  MIN_TIME,
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
    minutes: dateTime.minutes,
    date: dateTime.hours === MAX_TIME ? TOMORROW : dateTime.date,
  };
};

const getDateString = (cronTime: CronTime, currentTime: CronTime): CronDate => {
  if (isBigger(cronTime, currentTime)) {
    return TODAY;
  }
  if (isSmaller(cronTime, currentTime)) {
    return TOMORROW;
  }
  return TODAY;
};

const getHours = (cronTime: CronTime, currentTime: CronTime): string => {
  if (
    includesHourWildcard(cronTime) &&
    !includesMinuteWildcard(cronTime) &&
    cronTime.minutes < currentTime.minutes
  ) {
    return `${Number.parseInt(currentTime.hours) + 1}`;
  }
  return includesHourWildcard(cronTime) ? currentTime.hours : cronTime.hours;
};

const getMinutes = (cronTime: CronTime, currentTime: CronTime): string => {
  if (
    !includesHourWildcard(cronTime) &&
    (cronTime.hours > currentTime.hours ||
      (includesMinuteWildcard(cronTime) &&
        cronTime.minutes < currentTime.minutes))
  ) {
    return MIN_TIME;
  } else {
    return includesMinuteWildcard(cronTime)
      ? currentTime.minutes
      : cronTime.minutes;
  }
};
