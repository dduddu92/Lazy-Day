import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.');
        setTimeout(() => setSuccess(null), 2000);
      },
    });
  };
  return (
    <section className="flex flex-col my-10 w-3/4 mx-auto md:flex-row ">
      <div className="w-6/12 object-cover mr-20 basis-5/12 h-3/6">
        <img className="w-full rounded-lg" src={image} alt={title} />
      </div>
      <div className="w-full basis-7/12 flex flex-col py-5">
        <h2 className="text-3xl font-bold py-2 ">{title}</h2>
        <p className="text-2xl font-bold py-2 border-b border-gray-400">{`₩ ${price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</p>
        <p className="pt-5 text-lg">{description}</p>
        <div className="flex items-center">
          <label className="text-brand font-bold" htmlFor="select">
            옵션 :
          </label>
          <select
            id="select"
            className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
            onChange={handleSelect}
            value={selected}
          >
            {options && options.map((option, index) => <option key={index}>{option}</option>)}
          </select>
        </div>
        {success && <p className="my-2">{success}</p>}
        <Button text="장바구니에 추가" onClick={handleClick} size="equalMedium" />
      </div>
    </section>
  );
}
