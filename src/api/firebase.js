// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get, remove, query, limitToFirst } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  //추후 에러에 맞는 적절한 ui 구현 예정
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

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

export async function getProducts() {
  const firstQuery = query(ref(database, 'products'), limitToFirst(20));
  return get(firstQuery).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

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

export async function getQuestions() {
  return get(ref(database, 'questions')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

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

export async function removeQuestion(questionId) {
  return remove(ref(database, `questions/${questionId}`));
}
