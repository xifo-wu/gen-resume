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

/**
 * 安全地解析出 JSON
 * @param jsonString JSON 字符串
 * @returns 解析后的 JSON
 */
const safelyParseJSON = (jsonString: string) => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return {}
  }
}

export default {
  isDate,
  safelyParseJSON,
};
