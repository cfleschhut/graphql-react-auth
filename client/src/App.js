import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './components/Nav';
import ListBooks from './components/ListBooks';
import CreateBook from './components/CreateBook';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Route exact path="/" component={ListBooks} />
        <Route exact path="/create" component={CreateBook} />
      </div>
    );
  }
}

export default App;
