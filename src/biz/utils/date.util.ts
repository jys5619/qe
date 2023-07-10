type DateType = Date | string | number;

const zero = (value: number | string) => value.toString().length === 1 ? `0${value}` : `${value}`;

const week = new Array(7);
week[0] = 'Sunday';
week[1] = 'Monday';
week[2] = 'Tuesday';
week[3] = 'Wednesday';
week[4] = 'Thursday';
week[5] = 'Friday';
week[6] = 'Saturday';

const shortWeek = new Array(7);
shortWeek[0] = 'Sun';
shortWeek[1] = 'Mon';
shortWeek[2] = 'Tue';
shortWeek[3] = 'Wed';
shortWeek[4] = 'Thu';
shortWeek[5] = 'Fri';
shortWeek[6] = 'Sat';

const korWeek = new Array(7);
korWeek[0] = '일';
korWeek[1] = '월';
korWeek[2] = '화';
korWeek[3] = '수';
korWeek[4] = '목';
korWeek[5] = '금';
korWeek[6] = '토';




const dateFormater = (format: string, date: DateType = Date.now()): string => {
  const allowForm = date.toString().replace(/\.|\-|\s+/g, '/');
  const _date = new Date(+allowForm); // Date 객체로 만들어줍니다.

  return format.replace(/(yyyy|mm|dd|MM|DD|HH|hh|MI|mi|SS|ss|fff|a|k|EE|SE|KE)/g, (t: string): string => {
    switch (t) {
      case 'yyyy':
        return _date.getFullYear() + '';
      case 'mm':
        return (_date.getMonth() + 1)+ '';
      case 'dd':
        return _date.getDate() + '';
      case 'MM':
        return zero(_date.getMonth() + 1);
      case 'DD':
        return zero(_date.getDate());
      case 'HH':
        return zero(_date.getHours());
      case 'hh':
        return _date.getHours() + '';
      case 'MI':
        return zero(_date.getMinutes());
      case 'mi':
        return _date.getMinutes() + '';
      case 'SS':
        return zero(_date.getSeconds());
      case 'ss':
        return _date.getSeconds() + '';
      case 'fff':
        return _date.getMilliseconds() + '';
      case 'a':
        return (_date.getHours() / 12) <= 0 ? 'AM' : 'PM';
      case 'k':
        return (_date.getHours() / 12) <= 0 ? '오전' : '오후';
      case 'EE':
        return week[_date.getDay()];
      case 'SE':
        return shortWeek[_date.getDay()];
      case 'KE':
        return korWeek[_date.getDay()];
      default:
        return '';
    }
  });
};

const dateUtil = {
  dateFormater,
};

export { dateUtil };
