const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { Author, Book } = require('./store');

const client = jwksClient({
  jwksUri: 'https://cfl.eu.auth0.com/.well-known/jwks.json',
});

const getKey = (header, cb) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
};

const options = {
  audience: '1eL4Nux9VOOeV3YDzRiDT5TPck9jhFH3',
  issuer: 'https://cfl.eu.auth0.com/',
  algorithms: ['RS256'],
};

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
    addBook: async (
      _,
      { title, cover_image_url, average_rating, authorId },
      { user },
    ) => {
      try {
        const email = await user;
        const book = await Book.create({
          title,
          cover_image_url,
          average_rating,
          authorId,
        });

        return book;
      } catch (e) {
        throw new AuthenticationError('You must be logged in to add a book');
      }
    },
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
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        resolve(decoded.email);
      });
    });

    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
