import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListBooks from './components/ListBooks';
import CreateBook from './components/CreateBook';
import styled from '@auth0/cosmos/styled';

const Container = styled.main`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const App = () => (
  <Container>
    <NavBar />
    <Route exact path="/" component={ListBooks} />
    <Route exact path="/create" component={CreateBook} />
  </Container>
);

export default App;
