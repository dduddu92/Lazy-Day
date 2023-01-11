import React from 'react';

const buttonSizes = {
  small: 'px-3 py-2',
  medium: 'px-4 py-2',
  large: 'px-5 py-2',
  equalMedium: 'p-4',
};

export default function Button({ text, onClick, size }) {
  let buttonSize = buttonSizes[size];
  return (
    <button
      className={`bg-brandBrown text-white ${buttonSize} rounded-md hover:brightness-110`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
