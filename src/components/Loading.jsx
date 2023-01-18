import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-449px)]">
      <div className="flex animate-spin items-center justify-center rounded-full w-14 h-14 bg-gradient-to-tr  from-brand  to-orange-50">
        <div className="h-11 w-11 rounded-full bg-white" />
      </div>
      <p className="text-xl font-gangwon font-bold text-brand mt-3">불러오는 중</p>
    </div>
  );
}
