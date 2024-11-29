import { UserSession } from './../../../src/app/core/service/authentication.service';
import { ApiService } from 'src/app/core/service/api.service';
import { Injectable } from '@angular/core';
import {
    LoginRequest,
    RegisterRequest,
    UserSessionResponse,
    VerifyRequest,
} from '../model/auth.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private apiService: ApiService) {}

    login(req: LoginRequest) {
        return this.apiService.postLogin('login', req);
    }

    register(req: RegisterRequest) {
        return this.apiService.postLogin('registers', req);
    }

    verifyEmail(req: VerifyRequest) {
        return this.apiService.postLogin('verify', req);
    }

    getLoginData(): UserSessionResponse {
        const token = this.getToken();
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        const payloadObject = JSON.parse(decodedPayload);
        const userSession : UserSessionResponse = {
            id: payloadObject.id,
            roleCode: payloadObject.roleCode
        }
        return userSession;
    }


    resendVerify(value: string){
        return this.apiService.postWithParams('resend',null,{email: value});
    }

    saveToken(value: string) {
        localStorage.setItem('token', value);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    getLocalStorage(key: string) {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(atob(item));
        } else {
            return item;
        }
    }

    isLoggedIn(): boolean {
        const token = this.getLocalStorage('token');
        return token !== null && token !== undefined;
    }

    saveEmailVerify(value: string) {
        localStorage.setItem('emailVerify', value);
    }

    getEmailVerify(): string | null {
        return localStorage.getItem('emailVerify');
    }

    destroyVerifyEmail(){
        localStorage.removeItem('emailVerify');
    }

    getRole(code: String){
        return this.apiService.getNoHeader(`roles/code/${code}`)
    }
}
