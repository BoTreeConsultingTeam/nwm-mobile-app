import moment from 'moment-timezone';
import { capitalize } from './string';

// moment.tz.setDefault("Asia/Tokyo");

export const formatDate = date => date && moment(date).format('MM/DD/YYYY');

export const formatDateBySpecifiedFormat = (date, format) =>
  date && format && moment(date).format(format);

export const formatTime = time => time && moment(time).format('hh:mm A');

export const fromNow = date => moment(date).fromNow();

export const timeTo = date => {
  let returnValue = 'few minutes';
  if (date) {
    const today = moment();
    const checkingDate = moment(date);
    const diff = moment.duration(checkingDate.diff(today));

    const hoursDiff = parseInt(diff.asHours(), 10);

    const minutesDiff = parseInt(diff.asMinutes(), 10) % 60;

    if (hoursDiff > 24) {
      returnValue = capitalize(moment(date).toNow(true));
    } else {
      returnValue = `${hoursDiff} ${hoursDiff > 0 ? (hoursDiff > 1 ? 'hours' : 'hour') : ''
        } ${minutesDiff} ${minutesDiff > 0 ? (minutesDiff > 1 ? 'minutes' : 'minute') : ''
        }`;
    }
  }
  return returnValue;
};
