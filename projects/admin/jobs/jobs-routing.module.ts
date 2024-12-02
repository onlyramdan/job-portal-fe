import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobAddComponent } from './job-add/job-add.component';

const routes: Routes = [
    {
        path: '',
        component: JobListComponent
    },
    {
        path: 'add',
        component: JobAddComponent
    },
    {
        path: ':id/edit',
        component: JobEditComponent
    },
    {
        path: ':id/detail',
        component: JobDetailComponent
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
