import React, { useRef, useState } from 'react';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';
import useProducts from '../hooks/useProducts';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const fileRef = useRef();
  const { addProduct } = useProducts();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };

  const resetFileRef = () => {
    fileRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess('성공적으로 제품이 업로드 되었습니다.');
              setTimeout(() => {
                setSuccess(null);
              }, 3000);
            },
          },
        );
      })
      .finally(() => {
        setIsUploading(false);
        setProduct({});
        setFile(null);
        resetFileRef();
      });
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-4xl font-bold my-4 text-brand font-gangwon">새로운 제품 등록</h2>
      {success && <p className="my-2">👍 {success}</p>}
      <div className="flex justify-center items-center h-[calc(100vh-105px)]">
        {file ? (
          <img
            className="w-96 mb-2 border border-gray-300 rounded-md"
            src={URL.createObjectURL(file)}
            alt="local file"
          />
        ) : (
          <div className="w-96 h-3/4 mb-2 border border-gray-300 rounded-md flex justify-center items-center">
            <p className="text-center text-gray-400">업로드 사진 미리 보기</p>
          </div>
        )}
        <form className="flex flex-col ml-12" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            name="file"
            required
            onChange={handleChange}
            ref={fileRef}
          />
          <input
            type="text"
            name="title"
            value={product.title ?? ''}
            placeholder="제품명"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={product.price ?? ''}
            placeholder="가격"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={product.category ?? ''}
            placeholder="카테고리"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={product.description ?? ''}
            placeholder="제품 설명"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="options"
            value={product.options ?? ''}
            placeholder="옵션들은 콤마(,)로 구분"
            required
            onChange={handleChange}
          />
          <Button
            text={isUploading ? '업로드 중...' : '제품 등록하기'}
            size="equalMedium"
            disabled={isUploading}
          />
        </form>
      </div>
    </section>
  );
}
