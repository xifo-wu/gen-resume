import dayjs from 'dayjs';

const isDate = (value: any) => {
  if (!value) {
    return true;
  }

  let needValid = value;
  if (typeof needValid === 'string') {
    needValid = dayjs(needValid);
  }

  if (needValid.isValid()) {
    return true;
  }

  return '时间存在错误有误';
};

export default {
  isDate,
};
