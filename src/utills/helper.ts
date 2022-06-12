export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const dateFormatter = (date: string) => {
  if (!date) return '';
  const [dateString] = String(date).split(' ');
  const theDate = new Date(dateString);
  const month = MONTHS[theDate.getMonth()];
  const year = theDate.getFullYear();
  const dateVal = theDate.getDate();

  return `${month || ''} ${dateVal || ''}, ${year || ''}`;
};
export const cleanNumber = (number:number) => {
    if(String(number).includes(',')){
      return String(number).split(',').join('');
    }
    return number;
  };
export const formatCurrency = (num = 0) => {
    if(!num) return 0;
    const cleanNum = cleanNumber(num);
    const numb = Number(cleanNum);
    return String(numb.toFixed(0)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  export const getDoubleValuDate = (date:number) => {
    return String(date).length < 2 ? `0${date}` : date;
  };
  // get current week start date and end date
  export const getDayStartEndDate = () => {
    const today = new Date();
    const startDate = new Date(today.setDate(today.getDate() - today.getDay()));
  
    const startDateString = `${startDate.getFullYear()}-${getDoubleValuDate(
      startDate.getMonth() + 1
    )}-${getDoubleValuDate(startDate.getDate())}`;
  
    const endDateString = `${startDate.getFullYear()}-${getDoubleValuDate(
      startDate.getMonth() + 1
    )}-${getDoubleValuDate(startDate.getDate())}`;
  
    return { startDateString, endDateString };
  };
  // get current week start date and end date
export const getWeekStartEndDate = () => {
  const today = new Date();
  const startDate = new Date(today.setDate(today.getDate() - today.getDay()));
  const endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));

  const startDateString = `${startDate.getFullYear()}-${getDoubleValuDate(
    startDate.getMonth() + 1
  )}-${getDoubleValuDate(startDate.getDate())}`;

  const endDateString = `${endDate.getFullYear()}-${getDoubleValuDate(
    endDate.getMonth() + 1
  )}-${getDoubleValuDate(endDate.getDate())}`;

  return { startDateString, endDateString };
};

// get current month start date and end date
export const getMonthStartEndDate = () => {
  var date = new Date();
  var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const startDateString = `${startDate.getFullYear()}-${getDoubleValuDate(
    startDate.getMonth() + 1
  )}-${getDoubleValuDate(startDate.getDate())}`;

  const endDateString = `${endDate.getFullYear()}-${getDoubleValuDate(
    endDate.getMonth() + 1
  )}-${getDoubleValuDate(endDate.getDate())}`;

  return { startDateString, endDateString };
};

// get current year start and end date
export const getYearStartEndDate = () => {
  var date = new Date();
  var startDate = new Date(date.getFullYear(), 0, 1);
  var endDate = new Date(date.getFullYear(), 11 + 1, 0);

  const startDateString = `${startDate.getFullYear()}-${getDoubleValuDate(
    startDate.getMonth() + 1
  )}-${getDoubleValuDate(startDate.getDate())}`;

  const endDateString = `${endDate.getFullYear()}-${getDoubleValuDate(
    endDate.getMonth() + 1
  )}-${getDoubleValuDate(endDate.getDate())}`;

  return { startDateString, endDateString };
};