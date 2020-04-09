import axios from 'axios';
import { Constants } from '../helpers/Constants';
import { AuthService } from './AuthService';

export class ApiService {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public callApi(endpoint: string | ''): Promise<any> {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._callApi(user.access_token, endpoint).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._callApi(renewedUser.access_token, endpoint);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._callApi(renewedUser.access_token, endpoint);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  private _callApi(token: string, endpoint: string) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    };

    return axios.get(Constants.apiRoot + endpoint, { headers });
  }
}
