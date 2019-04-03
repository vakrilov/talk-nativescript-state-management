import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface LoginState {
  token: string;
  user: string;
  loading: boolean;
}

export function createInitialState(): LoginState {
  return {
    token: '',
    user: '',
    loading: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'login' })
export class LoginStore extends Store<LoginState> {

  constructor() {
    super(createInitialState());
  }

}

export const loginStore = new LoginStore();

