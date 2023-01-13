import React, { useRef, useState } from 'react';
import Button from '../components/ui/Button';
import useRedirectPage from '../hooks/useRedirectPage';

export default function Writing() {
  const [text, setText] = useState({});
  const [file, setFile] = useState();
  const fileRef = useRef();
  const [setPage] = useRedirectPage();

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

  const resetFileRef = () => {
    fileRef.current.value = '';
  };

  return (
    <section className="w-full h-[calc(100vh-65px)] flex justify-center items-center">
      <div className="w-full mx-5 h-4/5 flex flex-col md:w-1/2 md:m-0">
        <form className="flex flex-col h-full justify-between">
          <div className="flex flex-col flex-1">
            <div
              className={`text-3xl border-b ${
                text.title === '' ? 'border-red-300' : 'border-gray-400'
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
              />
              <p
                className={`${
                  text.title === '' ? 'block' : 'hidden'
                } absolute left-0 my-2 text-sm text-red-500`}
              >
                필수 입력 항목 입니다.
              </p>
            </div>
            <div className="flex flex-col justify-between flex-1">
              <textarea
                name="text"
                placeholder="내용을 입력해주세요."
                required
                spellCheck="false"
                className="bg-transparent outline-none w-full flex-1 resize-none scrollbar-hide"
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
            ref={fileRef}
          />
          <div className="flex justify-end mt-3">
            <Button text="취소" size="large" design="cancel" onClick={() => setPage('/')} />
            <Button text="올리기" size="large" margin="left3" />
          </div>
        </form>
      </div>
    </section>
  );
}
