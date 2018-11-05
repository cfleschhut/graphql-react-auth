import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $cover_image_url: String!
    $average_rating: Float!
    $authorId: Int!
  ) {
    addBook(
      title: $title
      cover_image_url: $cover_image_url
      average_rating: $average_rating
      authorId: $authorId
    ) {
      id
      title
      cover_image_url
      average_rating
    }
  }
`;

const GET_AUTHORS = gql`
  query AllAuthors {
    authors {
      id
      first_name
      last_name
    }
  }
`;

class CreateBook extends Component {
  state = {
    title: '',
    cover_image_url: '',
    average_rating: 1,
    authorId: 1,
  };

  handleChange = ({ target: { value, name } }) => {
    value =
      name === 'average_rating' || name === 'authorId'
        ? parseFloat(value)
        : value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          ...this.state,
        },
      })
      .then(() => {
        this.setState({
          title: '',
          cover_image_url: '',
          average_rating: 1,
          authorId: 1,
        });

        this.props.history.push('/');
      });
  };

  render() {
    const { title, cover_image_url, average_rating, authorId } = this.state;
    const { authors } = this.props.data;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            placeholder="title"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="cover_image_url"
            value={cover_image_url}
            onChange={this.handleChange}
            placeholder="cover image url"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="average_rating"
            value={average_rating}
            onChange={this.handleChange}
            placeholder="rating"
            required
            min={1}
            max={5}
          />
        </div>
        <div>
          <select name="authorId" value={authorId} onChange={this.handleChange}>
            {authors &&
              authors.map(author => (
                <option key={author.id} value={author.id}>
                  {`${author.first_name} ${author.last_name}`}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button>Add Book</button>
        </div>
      </form>
    );
  }
}

export default compose(
  graphql(GET_AUTHORS),
  graphql(ADD_BOOK),
)(CreateBook);
