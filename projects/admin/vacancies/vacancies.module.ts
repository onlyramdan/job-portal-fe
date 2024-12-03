import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacancyAddComponent } from './vacancy-add/vacancy-add.component';
import { VacancyEditComponent } from './vacancy-edit/vacancy-edit.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';

@NgModule({
    declarations: [
        VacancyListComponent,
        VacancyAddComponent,
        VacancyEditComponent,
        VacancyDetailComponent,
    ],
    imports: [CommonModule, VacanciesRoutingModule, SharedComponentModule],
})
export class VacanciesModule {}
