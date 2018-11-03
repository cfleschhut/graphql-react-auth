const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');

const books = [
  {
    id: 1,
    title: 'The Trials of Brother Jero',
    cover_image_url: '',
    average_rating: 8,
    author_id: 1,
  },
  {
    id: 2,
    title: 'Half of a Yellow Sun',
    cover_image_url: '',
    average_rating: 9,
    author_id: 3,
  },
  {
    id: 3,
    title: 'Americanah',
    cover_image_url: '',
    average_rating: 9,
    author_id: 3,
  },
  {
    id: 4,
    title: 'King Baabu',
    cover_image_url: '',
    average_rating: 7,
    author_id: 1,
  },
  {
    id: 5,
    title: 'Children of Blood and Bone',
    cover_image_url: '',
    average_rating: 7,
    author_id: 2,
  },
];

const authors = [
  { id: 1, first_name: 'Wole', last_name: 'Soyinka' },
  { id: 2, first_name: 'Tomi', last_name: 'Adeyemi' },
  { id: 3, first_name: 'Chimamanda', last_name: 'Adichie' },
];

const typeDefs = gql`
  type Book {
    id: Int!
    title: String!
    cover_image_url: String!
    average_rating: Float!
    author: Author!
  }

  type Author {
    id: Int!
    first_name: String!
    last_name: String!
    books: [Book]!
  }

  type Query {
    books: [Book!]!
    book(id: Int!): Book!
    authors: [Author!]!
    author(id: Int!): Author!
  }

  type Mutation {
    addBook(
      title: String!
      cover_image_url: String!
      average_rating: Float!
      author_id: Int!
    ): Book!
  }
`;

let book_id = 5;
let author_id = 3;

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => find(books, { id }),
    authors: () => authors,
    author: (_, { id }) => find(authors, { id }),
  },

  Mutation: {
    addBook: (_, { title, cover_image_url, average_rating, author_id }) => {
      book_id++;

      const newBook = {
        id: book_id,
        title,
        cover_image_url,
        average_rating,
        author_id,
      };

      books.push(newBook);
      return newBook;
    },
  },

  Book: {
    author: book => find(authors, { id: book.author_id }),
  },

  Author: {
    books: author => filter(books, { author_id: author.id }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
