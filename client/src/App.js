import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from '@auth0/cosmos/styled';
import NavBar from './components/NavBar';
import ListBooks from './components/ListBooks';
import CreateBook from './components/CreateBook';
import Callback from './components/Callback';
import GuardedRoute from './components/GuardedRoute';
import auth from './Auth';

const Container = styled.main`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

  render() {
    return (
      <Container>
        <NavBar />
        <Route exact path="/" component={ListBooks} />
        <GuardedRoute exact path="/create" component={CreateBook} />
        <Route exact path="/callback" component={Callback} />
      </Container>
    );
  }
}

export default withRouter(App);
