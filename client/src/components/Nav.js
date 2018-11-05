import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <div>
      <Link to="/">Cool Reads</Link>
    </div>

    <ul>
      <li>
        <Link to="/">All Books</Link>
      </li>
      <li>
        <Link to="/create">Add new Book</Link>
      </li>
    </ul>

    <button>Log In</button>
  </nav>
);

export default Nav;
