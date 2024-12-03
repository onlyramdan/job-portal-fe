import { MessageService } from 'primeng/api';
import { id } from 'date-fns/locale';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@core/shared-component/table/table.component';
import { VacancyResponse } from '../model/vacancy.model';
import { MessageBoxService } from '@core/service/message-box.service';
import { VacancyService } from '../service/vacancy.service';

@Component({
    selector: 'app-vacancy-list',
    templateUrl: './vacancy-list.component.html',
    styleUrls: ['./vacancy-list.component.scss'],
})
export class VacancyListComponent {
    title = 'Vacancies Management';
    showDeleteModal = false;
    selectionVacancy : VacancyResponse;

    @ViewChild('TableComponent') table: TableComponent;
    body: any;
    kebabOption = {
        isDelete: true,
        isEdit: true,
        isDetail: true,
    };
    columMap = [
        {
            label: 'Code',
            key: 'code',
        },
        {
            label: 'Job Name',
            key: 'jobTitle',
        },
        {
            label: 'Location',
            key: 'location',
        },
        {
            label: 'Employee Type',
            key: 'employeeType',
        },
        {
            label: 'Experience Level',
            key: 'experienceLevel',
        },
        {
            label: 'Min Salary',
            key: 'minSalary',
        },
        {
            label: 'Deadline',
            key: 'applicationDeadline'
        },
        {
            label: 'Max Salary',
            key: 'maxSalary',
        },
        {
            label: 'Overview',
            key: 'overview',
        },
    ];

    constructor(
        private router: Router,
        private vacancyService: VacancyService,
        private messageService: MessageBoxService

    ) {}

    ngOnInit() {

    }
    onSearch(e) {
        this.body = e;
        this.table.onSearch(this.body);
    }
    tableAction(e) {
        const data = e.data;
        const action = e.action;
        if (action === 'delete') {
            this.confirmDelete(data);
        }
        if (action === 'edit') {
            this.router.navigateByUrl(`admin/vacancies/${data.id}/edit`)
        }
        if(action == 'detail'){
            this.router.navigateByUrl(`admin/vacancies/${data.id}/detail`)
        }
    }

    confirmDelete(data: VacancyResponse) {
        this.showDeleteModal = true;
        this.selectionVacancy = data;
    }

    onDeleteVacancy(){
        if (this.selectionVacancy) {
            this.vacancyService.delete(this.selectionVacancy.id).subscribe({
                next: () => {
                    this.table.reload();
                    this.messageService.showSuccess(
                        'Vacancy delete successfully!',
                        'Delete',
                        false
                    );
                },
                error: (err) => {
                    this.messageService.showError(
                        err.errors.reason[0],
                        'Vacancy delete Failed!'
                    );
                },
                complete: () => {
                    this.showDeleteModal = false;
                },
            });
        }
    }
    onAdd() {
        this.router.navigateByUrl('admin/vacancies/add');
    }
}
