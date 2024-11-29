import { AuthService } from 'projects/auth/service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterState } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterState) {
        const requiredRole = route.data['roles'];
        const dataLogin = this.auth.getLoginData();

        if (dataLogin) {
            if (requiredRole.includes(dataLogin.roleCode)) {
                return true;
            }

            console.log('Akses Ditolak');
            this.router.navigate(['auth/login']);
        }

        return this.router.navigate(['auth/login']);
    }
}
