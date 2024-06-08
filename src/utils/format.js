import dayjs from 'dayjs';

export default function DateFormat(currentDate) {
  const provideDate = dayjs(currentDate);
  const formattedDate = provideDate.format('MMM DD, YYYY hh:mm A');
  return formattedDate;
}

export const formatMoney = (amount) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  });

  return formatter.format(amount);
};

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
