import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-brandBrown text-white px-4 py-2 rounded-md hover:brightness-110"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
