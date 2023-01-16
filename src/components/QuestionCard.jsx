import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuestionCard({
  question,
  question: { id, createdAt, displayName, image, photoURL, title, question: content },
}) {
  const navigate = useNavigate();
  console.log(question);
  return (
    <li
      onClick={() => {
        navigate(`/questions/${id}`, { state: { question } });
      }}
      className="flex justify-between items-center py-8 border-b w-full hover:bg-brand cursor-pointer"
    >
      <div className="flex flex-col justify-between h-full basis-10/12 pl-4">
        <p className="text-xl font-bold mb-2">{title}</p>
        <p className="mr-2 line-clamp-3 h-18">{content}</p>
        <div className="flex text-sm mt-2">
          <div className="flex items-center shrink-0">
            <img className="w-5 h-5 rounded-full mr-2" src={photoURL} alt={displayName} />
            <span>{displayName}</span>
          </div>
          <span className="ml-2 text-gray-400">{createdAt}</span>
          {/* <span className="ml-2 text-gray-400">댓글 0</span>
          <span className="ml-2 text-gray-400">조회 0</span> */}
        </div>
      </div>
      <div className="w-24 h-24 rounded-xl border border-brand overflow-hidden bg-white mr-4">
        <img src={image} alt="attached file" />
      </div>
    </li>
  );
}
