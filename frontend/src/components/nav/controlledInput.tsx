/* eslint-disable no-restricted-globals */
import React from "react";
import { Dispatch, SetStateAction, useRef } from "react";

interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  className: string; 
  placeholder: string;
  text: string;
  onSubmit: () => void;
}

export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  onSubmit,
  className, 
  placeholder,
  text 
}: ControlledInputProps) {

  // Event handler for what should happen when the enter key is pressed 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <input
      type={text}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    ></input>
  );
}
