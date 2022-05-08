const MONTHS = [
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