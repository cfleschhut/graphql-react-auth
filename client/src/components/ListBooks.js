import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const LIST_BOOKS = gql`
  query AllBooks {
    books {
      id
      title
      cover_image_url
      average_rating
    }
  }
`;

const ListBooks = () => (
  <Query query={LIST_BOOKS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading…</p>;
      if (error) return `Error! ${error.message}`;

      return (
        <ul>
          {data.books.map(book => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <div>{book.cover_image_url}</div>
              <div>{book.average_rating}</div>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default ListBooks;
