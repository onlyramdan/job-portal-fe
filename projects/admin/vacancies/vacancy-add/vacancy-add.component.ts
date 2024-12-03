import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VacancyService } from '../service/vacancy.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { VacancyRequest } from '../model/vacancy.model';

@Component({
    selector: 'app-vacancy-add',
    templateUrl: './vacancy-add.component.html',
    styleUrls: ['./vacancy-add.component.scss'],
})
export class VacancyAddComponent {
    title = 'Vacancy Add';
    createVacancyForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private vacancyService: VacancyService,
        private messageService: MessageBoxService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(){
        this.createVacancyForm = this.fb.group({
            jobTitleId: ['', Validators.required],
            locationId: ['', Validators.required],
            employeeTypeId: ['', Validators.required],
            experienceLevelId: ['', Validators.required],
            minSalary: ['', [Validators.required, Validators.min(0)]],
            maxSalary: ['', [Validators.required, Validators.min(0)]],
            applicationDeadline: ['', Validators.required],
            overview: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    selectJob(e){
        console.log(e);
        this.createVacancyForm.patchValue({
            jobTitleId: e.id
        })
    }

    selectLocation(e){
        console.log(e);
        this.createVacancyForm.patchValue({
            locationId: e.id
        })
    }

    selectEmployeType(e){
        console.log(e)
        this.createVacancyForm.patchValue({
            employeeTypeId: e.id
        })
    }

    selectExperienceLevel(e){
        console.log(e);
        this.createVacancyForm.patchValue({
            experienceLevelId: e.id
        })
    }

    onSubmit(): void {
        if (this.createVacancyForm.valid) {
            const formData = this.createVacancyForm.getRawValue();

            const request: VacancyRequest = {
                jobTitleId: formData.jobTitleId,
                locationId: formData.locationId,
                employeeTypeId: formData.employeeTypeId,
                experienceLevelId: formData.experienceLevelId,
                minSalary: formData.minSalary,
                maxSalary: formData.maxSalary,
                applicationDeadline:  formData.applicationDeadline,
                overview: formData.overview,

            }
            this.vacancyService.add(request).subscribe({
                next: (response) => {
                    this.messageService.showSuccess(
                        'Vacancy created successfully',
                        'Success',
                        true
                    )
                },
                error: (err) => {
                    this.messageService.showError(
                        'Error creating vacancy',
                        'Error',
                    )
                },
            })
        } else {
            this.createVacancyForm.markAllAsTouched();
        }
    }

    back(){
        this.router.navigate(['admin/vacancies']);
    }
}
