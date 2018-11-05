import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { Heading, Form } from '@auth0/cosmos';

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

    const selectOptions = authors
      ? authors.map(author => ({
          text: `${author.first_name} ${author.last_name}`,
          value: author.id,
        }))
      : [];

    return (
      <>
        <Heading size={2}>Add new book</Heading>
        <Form onSubmit={this.handleSubmit}>
          <Form.FieldSet label="Book details">
            <Form.TextInput
              label="Title"
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="title"
              required
            />
            <Form.TextInput
              label="Cover image URL"
              type="text"
              name="cover_image_url"
              value={cover_image_url}
              onChange={this.handleChange}
              placeholder="cover image url"
              required
            />
            <Form.TextInput
              label="Average rating"
              type="number"
              name="average_rating"
              value={average_rating}
              onChange={this.handleChange}
              placeholder="rating"
              required
              min={1}
              max={5}
            />
            <Form.Select
              label="Author"
              name="authorId"
              value={authorId}
              onChange={this.handleChange}
              options={selectOptions}
            />
            <Form.Actions primaryAction={{ label: 'Add Book' }} />
          </Form.FieldSet>
        </Form>
      </>
    );
  }
}

export default compose(
  graphql(GET_AUTHORS),
  graphql(ADD_BOOK),
)(CreateBook);
