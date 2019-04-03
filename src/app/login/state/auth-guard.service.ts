import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { LoginQuery } from "./login.query";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private login: LoginQuery) { }

    canActivate() {
        console.log("AuthGuard: " + this.login.getValue().token)
        if (this.login.getValue().token) {
            return true;
        }
        else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}