import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const format = (date) => dayjs(date).format('dddd MMMM D, YYYY h:mm A');

export const fromNow = (date) => dayjs(date).fromNow();
