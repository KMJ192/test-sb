import React, { useRef } from 'react';
import { koDateFormatChecker } from './DateFormatChecker';

const yRegex = /^\d{1,3}$/;
const MRegex = /^\d{1,2}$/;
const yyyyRegex = /^\d{4}$/;
const yyyyDashRegex = /^\d{4}-$/;
const yyyyMRegex = /^\d{4}-\d{1}$/;
const yyyyMMRegex = /^\d{4}-\d{2}$/;
const yyyyMMDashRegex = /^\d{4}-\d{2}-$/;
const yyyyMMddRegex = /^\d{4}-\d{2}-\d{2}$/;
const yyyyAddM = /^\d{5}/;
const yyyyMMAddD = /^\d{4}-\d{3}/;

function Lab() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isBackspace = useRef(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      isBackspace.current = true;
    } else {
      isBackspace.current = false;
    }
  };

  const onChange = () => {
    const input = inputRef.current;
    if (!input) return;

    input.value = koDateFormatChecker(input.value, isBackspace.current);
  };

  const onPaste = () => {
    const input = inputRef.current;
    if (!input) return;
    input.value = '';
    return false;
  };

  return (
    <div>
      <input
        ref={inputRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
      ></input>
      <div>test</div>
    </div>
  );
}

export default Lab;
