import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useQuestion from '../hooks/useQuestion';
import useRedirectPage from '../hooks/useRedirectPage';

export default function QuestionDetail() {
  const {
    state: {
      question: { id, uid, createdAt, displayName, image, photoURL, title, question: content },
    },
  } = useLocation();
  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { removeItem } = useQuestion();
  const [setPage] = useRedirectPage();
  return (
    <section className="w-full h-[calc(100vh-65px)] flex justify-center items-center">
      <div className="w-full mx-5 h-4/5 flex flex-col md:w-1/2 md:m-0">
        <form className="flex flex-col h-full justify-between">
          <div className="flex flex-col flex-1">
            <div className={`${editMode && 'border-b'} mb-10 bg-transparent relative`}>
              {editMode ? (
                <input
                  type="text"
                  name="title"
                  placeholder="제목을 입력해주세요."
                  required
                  maxLength={30}
                  className="text-3xl outline-none w-full border-none bg-transparent py-4 px-0"
                  autoFocus
                />
              ) : (
                <div>
                  <p className="text-lg font-bold md:text-3xl">{title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center shrink-0 mt-6">
                      <img
                        className=" w-10 h-10 rounded-full mr-2 md:w-12 md:h-12"
                        src={photoURL}
                        alt={displayName}
                      />
                      <div className="flex flex-col justify-center items-start text-sm md:text-base">
                        <span>{displayName}</span>
                        <span className="text-gray-400">{createdAt}</span>
                      </div>
                    </div>
                    {user.uid === uid && (
                      <div className="flex justify-end mt-3 ">
                        <Button
                          text="삭제"
                          size="small"
                          design="cancel"
                          onClick={() => {
                            if (window.confirm('정말 삭제하시겠습니까?')) {
                              removeItem.mutate(id);
                              setPage('/questions');
                            }
                          }}
                        />
                        <Button
                          text={isUploading ? '업로드 중...' : '수정'}
                          size="small"
                          margin="left3"
                          disabled={isUploading}
                          onClick={() => setEditMode(true)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col flex-1">
              {editMode ? (
                <textarea
                  name="question"
                  placeholder="내용을 입력해주세요."
                  required
                  spellCheck="false"
                  className="bg-transparent outline-none w-full flex-1 resize-none scrollbar-hide"
                />
              ) : (
                <>
                  <img src={image} alt="attached file" className="max-w-xs object-contain" />
                  <p className=" my-8 whitespace-pre-line">{content}</p>
                </>
              )}
            </div>
          </div>
          {editMode && <input type="file" accept="image/*" name="file" required />}
        </form>
      </div>
    </section>
  );
}
