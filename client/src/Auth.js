import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'cfl.eu.auth0.com',
      clientID: '1eL4Nux9VOOeV3YDzRiDT5TPck9jhFH3',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://cfl.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email',
    });
    this.authFlag = 'isLoggedIn';
  }

  login = () => {
    this.auth0.authorize();
  };

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  };

  setSession(authResult) {
    this.idToken = authResult.idToken;
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  logout = () => {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: '1eL4Nux9VOOeV3YDzRiDT5TPck9jhFH3',
    });
  };

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }

  isAuthenticated = () => {
    return JSON.parse(localStorage.getItem(this.authFlag));
  };
}

const auth = new Auth();

export default auth;
