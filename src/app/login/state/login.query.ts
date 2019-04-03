import { Query } from '@datorama/akita';
import { LoginStore, LoginState, loginStore } from './login.store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginQuery extends Query<LoginState> {

  constructor(protected store: LoginStore) {
    super(store);
  }

}

export const loginQuery = new LoginQuery(loginStore);