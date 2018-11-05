import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Heading, List, Badge } from '@auth0/cosmos';

const LIST_BOOKS = gql`
  query AllBooks {
    books {
      id
      title
      cover_image_url
      average_rating
      author {
        first_name
        last_name
      }
    }
  }
`;

const ListBooks = () => (
  <Query query={LIST_BOOKS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading…</p>;
      if (error) return `Error! ${error.message}`;

      return (
        <>
          <Heading size={2}>All Books</Heading>
          <List>
            {data.books.map(book => (
              <div key={book.id}>
                <Badge appearance="information">{`${
                  book.average_rating
                }/5`}</Badge>
                <Heading size={3}>
                  {`${book.author.first_name} ${book.author.last_name}: ${
                    book.title
                  }`}
                </Heading>
                <div>{book.cover_image_url}</div>
              </div>
            ))}
          </List>
        </>
      );
    }}
  </Query>
);

export default ListBooks;
