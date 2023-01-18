import React from 'react';
import QuestionCard from '../components/QuestionCard';
import useQuestion from '../hooks/useQuestion';
import Loading from './Loading';

export default function QuestionList() {
  const {
    questionsQuery: { isLoading, error, data: questions },
  } = useQuestion();

  return (
    <>
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <ul className="flex flex-col justify-center w-full mb-10">
        {questions &&
          questions
            .sort((a, b) => {
              return b.timeStamp - a.timeStamp;
            })
            .map((question) => <QuestionCard key={question.id} question={question} />)}
      </ul>
    </>
  );
}
