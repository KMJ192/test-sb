import React, { useRef } from 'react';
import { koDateFormatChecker } from './DateFormatChecker';

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
