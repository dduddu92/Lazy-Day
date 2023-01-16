import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import MyCart from './pages/MyCart';
import NewProduct from './pages/NewProduct';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Questions from './pages/Questions';
import Writing from './pages/Writing';
import QuestionDetail from './pages/QuestionDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      { path: '/products', element: <AllProducts /> },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      { path: '/products/:id', element: <ProductDetail /> },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/questions',
        element: <Questions />,
      },
      {
        path: '/questions/new',
        element: (
          <ProtectedRoute>
            <Writing />
          </ProtectedRoute>
        ),
      },
      {
        path: '/questions/:id',
        element: <QuestionDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
