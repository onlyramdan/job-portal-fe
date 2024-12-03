import { Router } from '@angular/router';
import { VacancyRequest, VacancyResponse } from './../model/vacancy.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VacancyService } from '../service/vacancy.service';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-vacancy-edit',
    templateUrl: './vacancy-edit.component.html',
    styleUrls: ['./vacancy-edit.component.scss'],
})
export class VacancyEditComponent {
    title = 'Edit Vacancy';
    editVacancyForm: FormGroup;
    vacancy: VacancyResponse;
    id: string;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageBoxService,
        private vacancyService: VacancyService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.initForm();
        this.getVacancy();
    }
    initForm() {
        this.editVacancyForm = this.fb.group({
            jobTitleId: ['', Validators.required],
            locationId: ['', Validators.required],
            employeeTypeId: ['', Validators.required],
            experienceLevelId: ['', Validators.required],
            minSalary: ['', [Validators.required, Validators.min(0)]],
            maxSalary: ['', [Validators.required, Validators.min(0)]],
            applicationDeadline: ['', Validators.required],
            overview: ['', Validators.required],
        });
    }

    getVacancy() {
        this.vacancyService.detail(this.id).subscribe({
            next: (res) => {
                console.log(res)
                this.vacancy = res.data.vacancyResponse;
                this.editVacancyForm.patchValue({
                    jobTitleId: this.vacancy.jobTitleId,
                    locationId: this.vacancy.locationId,
                    employeeTypeId: this.vacancy.employeeTypeId,
                    experienceLevelId: this.vacancy.experienceLevelId,
                    minSalary: this.vacancy.minSalary,
                    maxSalary: this.vacancy.maxSalary,
                    applicationDeadline: new Date(this.vacancy.applicationDeadline),
                    overview: this.vacancy.overview,
                });
            },
        });
    }

    selectJob(e){
        this.editVacancyForm.patchValue({
            jobTitleId: e.id
        })
    }
    selectLocation(e) {
        this.editVacancyForm.patchValue({
            locationId: e.id
        })
    }
    selectEmployeType(e) {
        this.editVacancyForm.patchValue({
            employeeTypeId: e.id
        })
    }
    selectExperienceLevel(e) {
        this.editVacancyForm.patchValue({
            experienceLevelId: e.id
        })
    }
    onUpdate(): void {
        if (this.editVacancyForm.valid) {
            const formData = this.editVacancyForm.getRawValue();
            const request: VacancyRequest = {
                jobTitleId: formData.jobTitleId,
                locationId: formData.locationId,
                employeeTypeId: formData.employeeTypeId,
                experienceLevelId: formData.experienceLevelId,
                minSalary: formData.minSalary,
                maxSalary: formData.maxSalary,
                applicationDeadline: formData.applicationDeadline,
                overview: formData.overview,
            };
            
            this.vacancyService.edit(this.id, request).subscribe({
                next: (response) => {
                    this.messageService.showSuccess(
                        'Vacancy Update successfully',
                        'Success',
                        true
                    )
                },
                error: (err) => {
                    this.messageService.showError(
                        err.erros.reason[0],
                        'Error',
                    )
                },
            })

        }else{
            this.editVacancyForm.markAllAsTouched();
        }
    }

    onBack() {
        this.router.navigate(['admin/vacancies']);
    }
}
