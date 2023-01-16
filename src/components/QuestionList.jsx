import React from 'react';
import QuestionCard from '../components/QuestionCard';
import useQuestion from '../hooks/useQuestion';

export default function QuestionList() {
  const {
    questionsQuery: { isLoading, error, data: questions },
  } = useQuestion();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="flex flex-col justify-center w-full mb-10">
        {questions &&
          questions.map((question) => <QuestionCard key={question.id} question={question} />)}
      </ul>
    </>
  );
}
