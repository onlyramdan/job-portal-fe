import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { VacancyAddComponent } from './vacancy-add/vacancy-add.component';
import { VacancyEditComponent } from './vacancy-edit/vacancy-edit.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';

const routes: Routes = [
    {
        path: '',
        component: VacancyListComponent
    },
    {
        path: 'add',
        component: VacancyAddComponent
    },
    {
        path: ':id/edit',
        component: VacancyEditComponent
    },
    {
        path: ':id/detail',
        component: VacancyDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesRoutingModule { }
