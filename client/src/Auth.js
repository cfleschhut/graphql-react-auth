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
    console.log(this.idToken);

    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  logout = () => {
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
    return new Date().getTime() < this.expiresAt;
  };
}

const auth = new Auth();

export default auth;
