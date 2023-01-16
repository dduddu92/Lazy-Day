import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import useRedirectPage from '../hooks/useRedirectPage';
import { useAuthContext } from '../context/AuthContext';
import useQuestion from '../hooks/useQuestion';

export default function Writing() {
  const { user } = useAuthContext();
  const { addQuestion } = useQuestion();
  const [setPage] = useRedirectPage();
  const [text, setText] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const hasTitle = text.title === undefined || text.title === '';

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setText((text) => ({
      ...text,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addQuestion.mutate(
          { text, url, user },
          {
            onSuccess: () => {
              alert('성공적으로 질문이 업로드 되었습니다.');
              setIsUploading(false);
              setPage('/questions');
            },
          },
        );
      });
  };

  return (
    <section className="w-full h-[calc(100vh-65px)] flex justify-center items-center">
      <div className="w-full mx-5 h-4/5 flex flex-col md:w-1/2 md:m-0">
        <form className="flex flex-col h-full justify-between" onSubmit={handleSubmit}>
          <div className="flex flex-col flex-1">
            <div
              className={`text-3xl border-b ${
                hasTitle ? 'border-red-300' : 'border-gray-400'
              } mb-10 bg-transparent relative`}
            >
              <input
                type="text"
                name="title"
                placeholder="제목을 입력해주세요."
                required
                maxLength={30}
                className="outline-none w-full border-none bg-transparent py-4 px-0"
                onChange={handleChange}
                autoFocus
              />
              <p
                className={`${
                  hasTitle ? 'block' : 'hidden'
                } absolute left-0 my-2 text-sm text-red-500`}
              >
                필수 입력 항목 입니다.
              </p>
            </div>
            <div className="flex flex-col justify-between flex-1">
              <textarea
                name="question"
                placeholder="내용을 입력해주세요."
                required
                spellCheck="false"
                className="bg-transparent outline-none w-full flex-1 resize-none"
                onChange={handleChange}
              />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            name="file"
            required
            onChange={handleChange}
            className="mt-3"
          />
          <div className="flex justify-end mt-3">
            <Button text="취소" size="large" design="cancel" onClick={() => setPage('/')} />
            <Button
              text={isUploading ? '업로드 중...' : '올리기'}
              size="large"
              margin="left3"
              disabled={isUploading}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
