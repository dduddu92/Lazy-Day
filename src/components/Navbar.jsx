import React from 'react';
import { Link } from 'react-router-dom';
import { TiPencil } from 'react-icons/ti';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className="flex justify-between border-b border-stone-300 p-3 bg-brand">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <img className="w-9 mr-2" src="/images/sloth.png" alt="Lazy Day Brand Logo" />
        <h1 className="font-gangwon">Lazy Day</h1>
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/products">Products</Link>
        {user && <Link to="/carts">Carts</Link>}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <TiPencil />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text="Login" onClick={login} />}
        {user && <Button text="Logout" onClick={logout} />}
      </nav>
    </header>
  );
}
