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

const incompleteTimeRegex = /^\d{1,2}/;
const timeRegex = /^\d{2}/;

const completeFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

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

const timeFormatChecker = (value: string, isBackspace: boolean) => {
  const [hh, mm, ss] = value.split(':');
  const isIncompleteHH = incompleteTimeRegex.test(hh);
  const isIncompleteMM = incompleteTimeRegex.test(mm);
  const isIncompleteSS = incompleteTimeRegex.test(ss);

  const isHH = timeRegex.test(hh);
  const isMM = timeRegex.test(mm);
  const isSS = timeRegex.test(ss);

  if (isHH && !mm && !isBackspace) {
    return `${value}:`;
  }

  if (isMM && !ss && !isBackspace) {
    return `${value}:`;
  }

  return value;
};

export const koDateFormatChecker = (value: string, isBackspace: boolean) => {
  const [date, time] = value.split(' ');

  const isY = yRegex.test(date);
  const isYYYY = yyyyRegex.test(date);
  const isYYYYDash = yyyyDashRegex.test(date);
  const isYYYYM = yyyyMRegex.test(date);
  const isYYYYMM = yyyyMMRegex.test(date);
  const isYYYYMMDash = yyyyMMDashRegex.test(date);
  const isYYYYMMD = yyyyMMdRegex.test(date);
  const isYYYYMMDD = yyyyMMddRegex.test(date);
  const isAddMonth = yyyyAddM.test(date);
  const isAddDay = yyyyMMAddD.test(date);
  const isExceedValue = exceedValue.test(date);

  // yyyy or yyyyMM일 경우 hyphen을 붙여주어 반환
  if ((isYYYY || isYYYYMM) && !isBackspace) {
    const monthCheck = date.split('-');
    // 입력된 Month가 12를 초과할 경우 12로 고정하여 반환
    if (monthCheck.length === 2 && Number(monthCheck[1]) > 12) {
      return `${monthCheck[0]}-${12}-`;
    }
    return `${date}-`;
  }

  // month나 day가 추가되는 경우 문자열을 yyyy-MM-dd 형식으로 반환
  if (isAddMonth) {
    return `${date.substring(0, 4)}-${date.substring(4)}`;
  }
  if (isAddDay) {
    return `${date.substring(0, 4)}-${date.substring(5, 7)}-${date.substring(7)}`;
  }

  // 입력된 문자열이 숫자 타입이 아닌 경우 거부
  if (Number.isNaN(Number(date.substring(date.length - 1)))) {
    return date.slice(0, -1);
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

  // 입력받은 문자열의 길이가 19자(yyyy-MM-dd hh:mm:ss)를 초과할 경우 거부
  if (value.length > 19) {
    return value.slice(0, -1);
  }

  // 입력받은 날짜가 초과되면 Month에 맞춰 최대값으로 고정
  const monthCheck = date.split('-');
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

  if (time) {
    return `${date} ${timeFormatChecker(time, isBackspace)}`;
  }

  return value;
};
