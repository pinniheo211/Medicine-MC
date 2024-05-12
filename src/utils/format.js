import dayjs from 'dayjs';

export default function DateFormat(currentDate) {
  const provideDate = dayjs(currentDate);
  const formattedDate = provideDate.format('MMM DD, YYYY hh:mm A');
  return formattedDate;
}
