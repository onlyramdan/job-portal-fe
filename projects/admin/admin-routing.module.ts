import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
    },
    {
        path: 'vacancies',
        loadChildren: () =>
            import('./vacancies/vacancies.module').then(
                (m) => m.VacanciesModule
            ),
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./users/users.module').then((m) => m.UsersModule),
    },
    {
        path: 'locations',
        loadChildren: () =>
            import('./locations/locations.module').then(
                (m) => m.LocationsModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
