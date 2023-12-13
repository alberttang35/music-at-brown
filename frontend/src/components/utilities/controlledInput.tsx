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
  // onSubmit: () => void;
}

// This is a component that handles all input submissions for really anything. 
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  className, 
  placeholder,
  text 
}: ControlledInputProps) {

  return (
    <input
      type={text}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}

  // Event handler for what should happen when the enter key is pressed 
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     onSubmit();
  //   }
  // };
