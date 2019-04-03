import { Component, OnInit } from '@angular/core';
import { LoginService, LoginQuery } from './state';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    moduleId: module.id,
})
export class LoginComponent {
    isLoggingIn = true;
    username: string = "alex";
    password: string = "pass";
    confirmPassword: string;
    loading$: Observable<boolean>

    constructor(
        private service: LoginService,
        private router: RouterExtensions,
        query: LoginQuery) {

        this.loading$ = query.selectLoading();
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        this.service.login(this.username, this.password)
            .then(result => {
                if (result) {
                    this.router.navigateByUrl("/", { clearHistory: true });
                }
            })
    }

    register() {
    }

    forgotPassword() {
    }

}