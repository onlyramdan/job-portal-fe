import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './layout/component/app.main.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './layout/page-forbidden/page-forbidden.component';
import { AuthGuard } from './core/auth.guard';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { PermisionGuard } from './core/permision.guard';
import { RedirectComponent } from './layout/redirect/redirect.component';
import { ForgotPasswordComponent } from '@layout/forgot-password/forgot-password.component';
import { PrivacyPoliciesComponent } from '@layout/privacy-policies/privacy-policies.component';
import { LayoutAuthComponent } from '@layout/auth/layout-auth/layout-auth.component';
import { LayoutAdminComponent } from '@layout/admin/layout-admin/layout-admin.component';

const web: string = localStorage.getItem('web') ?? 'admin';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'auth',
                    component: LayoutAuthComponent,
                    loadChildren: () =>
                        import('../../projects/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: 'admin',
                    component: LayoutAdminComponent,
                    loadChildren: () =>
                        import('@projects/admin/admin.module').then(
                            (m) => m.AdminModule
                        ),
                    canActivate: [AuthGuard],
                    data : { roles: 'ADM' },
                },
                // {
                //     path: 'dashboard',
                //     component: AppMainComponent,
                //     children: [{ path: '', component: DashboardComponent }],
                //     canActivate: [AuthGuard],
                // },
                // {
                //     path: 'login',
                //     component: LoginComponent,
                //     canActivate: [PermisionGuard],
                // },
                // {
                //     path: 'forgot-password',
                //     component: ForgotPasswordComponent,
                //     canActivate: [PermisionGuard],
                // },
                // {
                //     path: 'privacy-policy',
                //     component: PrivacyPoliciesComponent,
                //     canActivate: [PermisionGuard],
                // },
                // {
                //     path: 'redirect',
                //     component: RedirectComponent,
                // },
                // {
                //     path: '404',
                //     component: PageNotFoundComponent,
                // },
                // {
                //     path: '403',
                //     component: PageForbiddenComponent,
                // },
                // {
                //     path: 'util',
                //     component: AppMainComponent,
                //     loadChildren: () =>
                //         import('./util/util.module').then((m) => m.UtilModule),
                //     canActivate: [AuthGuard],
                // },
                // {
                //     path: 'showcase',
                //     component: AppMainComponent,
                //     loadChildren: () =>
                //         import('./showcase/showcase.module').then(
                //             (m) => m.ShowcaseModule
                //         ),
                // },

                // { path: '**', redirectTo: '404' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                canceledNavigationResolution: 'computed',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
