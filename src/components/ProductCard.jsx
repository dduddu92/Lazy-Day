import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, product: { id, image, title, category, price } }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full max-h-72 object-cover" src={image} alt={title} />
      <p className="mt-2 px-2 text-gray-400 text-sm font-bold">{category}</p>
      <h3 className="truncate px-2 text-base">{title}</h3>
      <p className="px-2 pb-2 text-lg font-bold">{`₩ ${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</p>
    </li>
  );
}
