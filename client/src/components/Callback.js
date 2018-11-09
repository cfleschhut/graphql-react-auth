import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../Auth';
import loading from '../loading.svg';

class Callback extends Component {
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default withRouter(Callback);
