/**
 * 简单处理，通过年份相减得到岁数。
 * @param input - 出生信息 ISO格式
 * @returns - 计算的年龄
 */
export const calculateAge = (input: string): number => {
  const birthday = new Date(input);
  const today = new Date();

  const birthY = birthday.getFullYear();
  const currY = today.getFullYear();

  return Math.abs(birthY - currY);
};

/**
 * 将 ISO 格式的日期字符串转换为 'YYYY-MM-DD' 格式的日期字符串。
 * @param isoDate - ISO格式的日期字符串
 * @returns - 转换后的日期字符串，格式为 'YYYY-MM-DD'
 */
export const formateDate = (input: string): string => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，所以需要 +1，并确保是两位数
  const day = String(date.getDate()).padStart(2, "0"); // 确保日期是两位数

  return `${year}-${month}-${day}`;
};

/**
 * 简单处理，用作创建用户的新id
 * @returns 随机生成长度为8的字符串
 */
export const generateRandomId = (): string => {
  // 生成一个指定长度的随机字符串
  return [...Array(8)]
    .map(() => Math.floor(Math.random() * 36).toString(36)) // 36为字符集长度
    .join("");
};
