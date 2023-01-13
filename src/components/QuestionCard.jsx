import React from 'react';
import User from './User';

export default function QuestionCard({ user }) {
  return (
    <li className=" flex justify-between items-center py-8 border-b w-full">
      <div className="flex flex-col justify-between h-full basis-10/12 pl-4">
        <p className="text-xl font-bold mb-2">이 옷 어디껀가요?</p>
        <p className="mr-2 line-clamp-3 h-18">
          안녕하세요. 무신사 스토어입니다. 무신사 스토어를 이용하는 회원님의 편의성을 높이기 위해
          1/13(금)부터 1/26(목)까지 일부 상품에 한하여 ‘무료 반품 서비스’를 시범 운영합니다. ■ ‘무료
          반품 서비스’란? 상품을 반품할 때, 추가 결제 금액(반품 배송비) 없이 무료로 교환 또는 환불을
          받을 수 있는 서비스입니다. ■ 시범 서비스 기간: 1/13(금) 밤 0시 ~ 1/26(목) 오후 11시 59분 *
          본 서비스는 약 2주간 시범(Beta) 서비스로 진행합니다. * 시범 서비스 기간 내 무료 반품
          상품을 구매한 경우에만 서비스 이용이 가능합니다.
        </p>
        <div className="flex text-sm mt-2">
          {user && <User user={user} status="block" imgSize="small" />}
          <span className="ml-2 text-gray-400">1분전</span>
          <span className="ml-2 text-gray-400">댓글 0</span>
          <span className="ml-2 text-gray-400">조회 0</span>
        </div>
      </div>
      <div className="w-24 rounded-xl border border-black overflow-hidden">
        <img src="./images/sloth.png" alt="나무늘보" />
      </div>
    </li>
  );
}
