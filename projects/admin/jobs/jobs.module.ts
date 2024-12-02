import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';


@NgModule({
  declarations: [


    JobListComponent,
        JobAddComponent,
        JobEditComponent,
        JobDetailComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedComponentModule,
  ]
})
export class JobsModule { }
