const yRegex = /^\d{1,3}$/;
const MRegex = /^\d{1,2}$/;
const yyyyRegex = /^\d{4}$/;
const yyyyDashRegex = /^\d{4}-$/;
const yyyyMRegex = /^\d{4}-\d{1}$/;
const yyyyMMRegex = /^\d{4}-\d{2}$/;
const yyyyMMDashRegex = /^\d{4}-\d{2}-$/;
const yyyyMMdRegex = /^\d{4}-\d{2}-\d{1}$/;
const yyyyMMddRegex = /^\d{4}-\d{2}-\d{2}$/;
const yyyyAddM = /^\d{5}/;
const yyyyMMAddD = /^\d{4}-\d{3}/;
const exceedValue = /^\d{4}-\d{2}-\d{2,}$/;

export const koDateFormatChecker = (value: string, isBackspace: boolean) => {
  const isY = yRegex.test(value);
  const isYYYY = yyyyRegex.test(value);
  const isYYYYDash = yyyyDashRegex.test(value);
  const isYYYYM = yyyyMRegex.test(value);
  const isYYYYMM = yyyyMMRegex.test(value);
  const isYYYYMMDash = yyyyMMDashRegex.test(value);
  const isYYYYMMD = yyyyMMdRegex.test(value);
  const isYYYYMMDD = yyyyMMddRegex.test(value);
  const isAddMonth = yyyyAddM.test(value);
  const isAddDay = yyyyMMAddD.test(value);
  const isExceedValue = exceedValue.test(value);

  if ((isYYYY || isYYYYMM) && !isBackspace) {
    return `${value}-`;
  } else if (isAddMonth) {
    return `${value.substring(0, 4)}-${value.substring(4)}`;
  } else if (isAddDay) {
    return `${value.substring(0, 4)}-${value.substring(5, 7)}-${value.substring(7)}`;
  }

  if (Number.isNaN(Number(value.substring(value.length - 1)))) {
    return value.slice(0, -1);
  }

  if (
    !isY &&
    !isYYYY &&
    !isYYYYDash &&
    !isYYYYM &&
    !isYYYYMM &&
    !isYYYYMMDash &&
    !isYYYYMMD &&
    !isYYYYMMDD &&
    !isExceedValue
  ) {
    return '';
  }

  if (value.length > 10) {
    return value.slice(0, -1);
  }

  return value;
};
