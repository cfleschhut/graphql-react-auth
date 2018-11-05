import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListBooks from './components/ListBooks';
import CreateBook from './components/CreateBook';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={ListBooks} />
        <Route exact path="/create" component={CreateBook} />
      </div>
    );
  }
}

export default App;
