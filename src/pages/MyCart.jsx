import React from 'react';
import CartItem from '../components/CartItem';
import { BsPlusCircle } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const SHIPPING = 3000;

export default function MyCart() {
  const navigate = useNavigate();
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);

  return (
    <section className="p-8 flex flex-col h-[calc(100vh-65px)]">
      <p className="text-3xl text-center font-bold pb-8 border-b borde-gray-300 font-gangwon">
        내 장바구니
      </p>
      {!hasProducts && (
        <div className="flex flex-col justify-center items-center flex-1">
          <img src="./images/sloth.png" className=" w-52 h-52 mb-10" alt="brand logo" />
          <Button text="상품 담으러 가기" size="equalMedium" onClick={() => navigate('/')} />
        </div>
      )}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products && products.map((product) => <CartItem key={product.id} product={product} />)}
          </ul>
          <div className="flex justify-between items-center px-2 mb-8 md:px-8 lg:px-16">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsPlusCircle className="shrink-0" />
            <PriceCard text="총 배송비" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="결제 금액" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" size="equalMedium" />
        </>
      )}
    </section>
  );
}
