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

const MMRegex = /^\d(0[1-9]|1[0-2])/;
const ddRegex = /^\d(0[1-9]|[1-2][0-9]|3[0-1])/;

const monthMap: { [month: number]: number | number[] } = {
  1: 31,
  2: [28, 29],
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

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

  // yyyy or yyyyMM일 경우 hyphen을 붙여주어 반환
  if ((isYYYY || isYYYYMM) && !isBackspace) {
    const monthCheck = value.split('-');
    // 입력된 Month가 12를 초과할 경우 12로 고정하여 반환
    if (monthCheck.length === 2 && Number(monthCheck[1]) > 12) {
      return `${monthCheck[0]}-${12}-`;
    }
    return `${value}-`;
  }

  // month나 day가 추가되는 경우 문자열을 yyyy-MM-dd 형식으로 반환
  if (isAddMonth) {
    return `${value.substring(0, 4)}-${value.substring(4)}`;
  }
  if (isAddDay) {
    return `${value.substring(0, 4)}-${value.substring(5, 7)}-${value.substring(7)}`;
  }

  // 입력된 문자열이 숫자 타입이 아닌 경우 거부
  if (Number.isNaN(Number(value.substring(value.length - 1)))) {
    return value.slice(0, -1);
  }

  // yyyy-MM-dd 포멧이 아닐 경우 빈문자열 반환
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

  // 입력받은 문자열의 길이가 10자(yyyy-MM-dd)를 초과할 경우 거부
  if (value.length > 10) {
    return value.slice(0, -1);
  }

  // 입력받은 날짜가 초과되면 Month에 맞춰 최대값으로 고정
  const monthCheck = value.split('-');
  if (!isBackspace && monthCheck.length === 3) {
    if (Number(monthCheck[1]) === 2 && Number(monthCheck[0]) % 4 === 0) {
      return `${monthCheck[0]}-02-${(monthMap[2] as number[])[1]}`;
    }
    if (Number(monthCheck[1]) === 2 && Number(monthCheck[0]) % 4 !== 0) {
      return `${monthCheck[0]}-02-${(monthMap[2] as number[])[0]}`;
    }
    if (Number(monthCheck[2]) > Number(monthMap[Number(monthCheck[1])])) {
      return `${monthCheck[0]}-${monthCheck[1]}-${monthMap[Number(monthCheck[1])]}`;
    }
  }

  return value;
};
