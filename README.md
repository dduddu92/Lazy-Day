# Lazy Day (Shopping Mall using Firebase & React Query)

## 🍀 프로젝트 정보

1. 프로젝트 명 : Lazy Day
2. 프로젝트 기간 : 2023. 1.5 ~ 2023. 1.17
3. 프로젝트 인원: 단독 진행 프로젝트

<br />

---

## 🍀 실행 방법

```
$ git clone https://github.com/dduddu92/lazy-day.git
$ cd lazy-day
$ yarn install
$ yarn start
```

<br/>

---

## 🍀 배포 링크

<br/>

> https://lazy-day-dduddu92.vercel.app/

<br/>

---

## 🍀 기술스택

<br/>

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![react-query](https://img.shields.io/badge/react--query-4.22.0-FF4154?logo=react-query)
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.6.1-blue?logo=react-router)  
![firebase](https://img.shields.io/badge/firebase-9.15.0-E1C537?logo=firebase)
![tailwind-css](https://img.shields.io/badge/tailwind--css-3.2.4-06B6D4?logo=tailwind-css)

- **선정 이유**

  - _Tailwind Css_
    - Utility-First 컨셉을 가진 CSS 프레임워크. (미리 세팅된 유틸리티 클래스를 활용하여 HTML 코드 내에서 스타일링함) Utility-First 덕에 쉽고 빠르게 원하는 디자인을 개발할 수 있다는 장점이 있음.
    - style을 위한 코드도 HTML 코드 안에 있으므로, HTML와 CSS 파일을 별도로 관리할 필요가 없다는 장점이 존재함.
    - 그러나 초반에는 스타일의 클래스명을 익혀야 하는 과정이 필요하므로, 개발하는 내내 문서를 참고해야 하는 번거로움이 있다.
  - _Firebase RealTime DataBase_
    - 프론트엔드 단독 진행 프로젝트이므로 백엔드를 대신하여 상품 리스트 및 게시글을 저장할 데이터 구축에 활용하기 위함.
    - 구글 소셜 로그인 API를 지원함.
    - DB를 자체적으로 자유롭게 구축할 수 있으므로 개인 프로젝트에 사용하기 용이하다고 판단하였음.
  - _React-Router-Dom_

    - React의 SPA(Single Page Application)특성상 하나의 페이지에서 모든 렌더링이 이루어진다.
    - 클라이언트 측 라우팅(Client side routing)을 사용하면 서버에서 다른 문서를 요청하지 않고도 링크 클릭을 통해 URL을 업데이트 할 수 있다.
    - 브라우저가 완전히 새로운 문서를 요청하거나 다음 페이지를 위해 CSS와 자바스크립트를 다시 평가할 필요가 없기 때문에 더 빠른 사용자 경험이 가능함.

  - _TanStack Query (React-Query)_

    - React Application에서 서버 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트하는 작업을 도와주는 라이브러리
    - Client 상태 작업과 Server 상태 작업을 분리할 수 있다.
    - 쇼핑몰의 특성 상 client에서 관리하는 데이터보다 서버에서 관리하는 데이터가 더 많기 때문에 사용에 적합하다고 판단되었음.

<br />

---

## 🍀 구현 기능

1. Firebase를 이용한 구글 소셜 로그인 기능 구현

- 로그인 & 로그아웃

  - `firebase`에서 제공하는 `signInWithPopup` 메소드를 이용하여 구현.
  - firebase.js 파일에 login 함수를 만들어 사용.

  ```js
  export function login() {
    signInWithPopup(auth, provider).catch(console.error);
  }
  ```

  - 로그아웃은 `firebase`에서 제공하는 `signOut()`으로 로그아웃 처리.

  ```js
  export function logout() {
    signOut(auth);
  }
  ```

2. 상품 등록하기(Admin User만 가능)

- `RealTime DateBase`의 `set()`을 이용하여 상품 등록

```js
export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  });
}
```

3. 상품 불러오기

- `RealTime DateBase`의 `get()`을 사용하여 호출.
- 추후 infinite scroll 적용 예정

```js
export async function getProducts() {
  const firstQuery = query(ref(database, 'products'), limitToFirst(20));
  return get(firstQuery).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}
```

4. 장바구니 목록 불러오기, 수량 추가 및 수정 하기, 카트 목록에서 삭제하기

- `get()`메서드를 이용하여 카트 정보를 불러옴.
- `set()`메서드를 이용하여 현재 로그인한 유저의 uid와 상품이 가진 고유 id를 이용하여 수량을 추가하거나 업데이트 할 수 있게 하였음.
- 카트 목록에서 상품 삭제는 `remove()`메서드로 구현.

```js
export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
```

5. 게시글 작성하기

- 게시글 작성도 상품 등록과 마찬가지가 `set()`메서드를 이용하는건 동일.
- database에 저장되는 구조는 아래와 같다.
- 최신순으로 정렬하기 위해 timeStamp도 함께 저장.

```js
export async function addNewQuestion(text, image, user) {
  const id = uuid();
  return set(ref(database, `questions/${id}`), {
    ...text,
    id,
    image,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    title: text.title,
    question: text.question,
    timeStamp: Date.now(),
    createdAt: new Date().toLocaleString(),
    like: 0,
    visitor: 0,
  });
}
```

- 사용자가 입력한 값은 `handleChange()`로 관리, `text`와 `file`의 `state`는 분리하여 관리.

```js
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
```

6. 게시글 불러오기

- `get()`메서드를 이용하여 게시글을 불러옴.

```js
export async function getQuestions() {
  return get(ref(database, 'questions')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}
```

7. 게시글 수정하기

- 처음에는 게시글 작성과 수정을 하나의 함수로 관리하려고 하였으나, 처음 게시글이 작성된 날짜는 변하면 안되므로, add와 update를 분리.
- 수정된 날짜 및 시간을 알 수 있도록, `updatedAt`도 추가.

```js
export async function updateQuestion(text, image, user) {
  return set(ref(database, `questions/${text.id}`), {
    ...text,
    image,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    title: text.title,
    question: text.question,
    updatedAt: new Date().toLocaleString(),
  });
}
```

8. 게시글 삭제하기

- 마찬가지로 간단하게 `remove()`메서드를 이용하여 게시글의 고유 id를 이용해 게시글을 삭제.

```js
export async function removeQuestion(questionId) {
  return remove(ref(database, `questions/${questionId}`));
}
```

<br/>

---

## 🍀 구현 예정

- [ ] 게시글 좋아요 및 조회수 구현
- [ ] 게시글 댓글 기능
- [ ] Home에 등록된 상품들 카테고리 별 분류 작업
- [ ] 상품 리스트 : 무한 스크롤
- [ ] 게시판 : 페이지 네이션
