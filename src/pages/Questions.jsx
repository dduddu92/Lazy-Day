import React from 'react';
import QuestionList from '../components/QuestionList';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useRedirectPage from '../hooks/useRedirectPage';

export default function Questions() {
  const [setPage] = useRedirectPage();
  const { user } = useAuthContext();

  return (
    <section className="flex flex-col h-[calc(100vh-65px)]">
      <div className=" p-8 flex flex-col justify-center items-center border-b borde-gray-300 font-gangwon">
        <p className="text-3xl text-center font-bold mb-3">질문과 답변</p>
        <p className="text-xl text-center">
          자유롭게 질문 남겨주세요. <br />
          운영자 답변은 최소 하루에서 최대 이틀이 소요됩니다.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-2/3 md:w-1/2 mx-auto">
        <div className="py-7 w-full text-right">
          <Button
            text="질문하기"
            size="large"
            onClick={() => {
              if (!user) {
                alert('로그인 후 이용해주세요. 홈으로 돌아갑니다.');
                return setPage('/');
              }
              return setPage('/questions/new');
            }}
          />
        </div>
        <QuestionList />
      </div>
    </section>
  );
}
