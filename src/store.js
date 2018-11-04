const Sequelize = require('sequelize');
const casual = require('casual');
import { times } from 'lodash';

const db = new Sequelize('coolreads', null, null, {
  dialect: 'sqlite',
  storage: './coolreads.sqlite',
});

const AuthorModel = db.define('author', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
});

const BookModel = db.define('book', {
  title: Sequelize.STRING,
  cover_image_url: Sequelize.STRING,
  average_rating: Sequelize.FLOAT,
});

AuthorModel.hasMany(BookModel);
BookModel.belongsTo(AuthorModel);

casual.seed(123);

db.sync({ force: true }).then(() =>
  times(10, () =>
    AuthorModel.create({
      first_name: casual.first_name,
      last_name: casual.last_name,
    }).then(author =>
      author.createBook({
        title: casual.title,
        cover_image_url: casual.url,
        average_rating: casual.integer(-10, 10),
      }),
    ),
  ),
);
