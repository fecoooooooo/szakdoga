import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return null !== localStorage.getItem('token');
  }

  login(
    username: string,
    password: string,
    twophase: boolean
  ): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      const body = new HttpParams()
        .set('username', username)
        .set('password', password)
        //.set('scope', environment.authScope)
        //.set(
        //  'authentication_mode',
        //  twophase
        //    ? AuthenticationModels.AuthenticationMode.twophase
        //    : AuthenticationModels.AuthenticationMode.singlephase
        //)
        .set('grant_type', 'password');
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      this.http
        .post('TODOURL', body.toString(), {
          headers,
          observe: 'response',
        })
        .toPromise()
        .then((response: any) => {
          /*this.storeToken(
            response.body['access_token'],
            response.body['refresh_token'],
            response.body['token_type']
          );*/

          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });

    return promise;
  }
}
