const { ApolloServer, gql } = require('apollo-server');
const { Author, Book } = require('./store');

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
      authorId: Int!
    ): Book!
  }
`;

const resolvers = {
  Query: {
    books: () => Book.findAll(),
    book: (_, args) => Book.find({ where: args }),
    authors: () => Author.findAll(),
    author: (_, args) => Author.find({ where: args }),
  },

  Mutation: {
    addBook: (_, { title, cover_image_url, average_rating, authorId }) =>
      Book.create({
        title,
        cover_image_url,
        average_rating,
        authorId,
      }),
  },

  Book: {
    author: book => book.getAuthor(),
  },

  Author: {
    books: author => author.getBooks(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
