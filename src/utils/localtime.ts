import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export function isOpenMarket() {
  const nowInKorea = dayjs().tz('Asia/Seoul');
  const nowInNewYork = nowInKorea.tz('America/New_York');

  const openingTimeNY = nowInNewYork.hour(9).minute(30).second(0);
  const closingTimeNY = nowInNewYork.hour(16).minute(0).second(0);

  // Check if current time in NY is during the Nasdaq operating hours
  const isOpenInNY =
    nowInNewYork.isAfter(openingTimeNY) && nowInNewYork.isBefore(closingTimeNY);

  // Check if today is a weekday in New York
  const dayOfWeekNY = nowInNewYork.day(); // Sunday as 0 through Saturday as 6
  const isWeekdayNY = dayOfWeekNY !== 0 && dayOfWeekNY !== 6;

  return isOpenInNY && isWeekdayNY;
}

export const getDate = () => {
  const koreaTime = dayjs().tz('Asia/Seoul');
  const newYorkTime = dayjs().tz('America/New_York');

  return {
    koreaTime,
    newYorkTime,
  };
};
