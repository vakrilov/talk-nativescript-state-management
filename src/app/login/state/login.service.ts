import { Injectable } from '@angular/core';
import { LoginStore, loginStore } from './login.store';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private loginStore: LoginStore) {
    }

    login(user: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.loginStore.setLoading(true);
            setTimeout(() => {
                this.loginStore.update({ token: "fake_token", user })
                this.loginStore.setLoading(false);
                resolve(true);
            }, 1000);
        })
    }

    logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.loginStore.update({ token: null, user: null });
            resolve(true);
        })
    }
}

export const loginService = new LoginService(loginStore);