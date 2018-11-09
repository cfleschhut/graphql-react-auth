import React from 'react';
import { Route } from 'react-router-dom';
import styled from '@auth0/cosmos/styled';
import NavBar from './components/NavBar';
import ListBooks from './components/ListBooks';
import CreateBook from './components/CreateBook';
import Callback from './components/Callback';

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
    <Route exact path="/callback" component={Callback} />
  </Container>
);

export default App;
