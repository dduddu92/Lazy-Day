import React from 'react';

const nameDisplay = {
  hidden: 'hidden md:block',
  block: 'block',
};

const imageSize = {
  normal: 'w-10 h-10',
  small: 'w-5 h-5',
};

export default function User({ user: { photoURL, displayName }, status, imgSize }) {
  let nameStatus = nameDisplay[status];
  let image = imageSize[imgSize];
  return (
    <div className="flex items-center shrink-0">
      <img className={`${image} rounded-full mr-2`} src={photoURL} alt={displayName} />
      <span className={`${nameStatus}`}>{displayName}</span>
    </div>
  );
}
