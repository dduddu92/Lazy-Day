import React from 'react';

const buttonSizes = {
  small: 'px-3 py-2',
  medium: 'px-4 py-2',
  large: 'px-5 py-2',
  equalMedium: 'p-4',
};

const buttonMargins = {
  left3: 'ml-3',
};

const buttonDesigns = {
  default: 'bg-brandBrown text-white',
  cancel: 'bg-white text-brand border border-brand ',
};

export default function Button({ text, onClick, size, margin, design = 'default' }) {
  let buttonSize = buttonSizes[size];
  let buttonMargin = buttonMargins[margin];
  let buttonDesign = buttonDesigns[design];
  return (
    <button
      className={`${buttonDesign} ${buttonSize} rounded-md hover:brightness-110 ${buttonMargin}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
