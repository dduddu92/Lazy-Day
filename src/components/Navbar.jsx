import React from 'react';
import { Link } from 'react-router-dom';
import { TiPencil } from 'react-icons/ti';

export default function Navbar() {
  return (
    <header>
      <Link to="/">
        <img src="/images/sloth.png" alt="Lazy Day Brand Logo" />
        <h1>Lazy Day</h1>
      </Link>
      <nav>
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new">
          <TiPencil />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
