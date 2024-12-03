import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MessageBoxService } from '@core/service/message-box.service';
import { JobsService } from '../service/job.service';
import { Router } from '@angular/router';
import { JobRequest } from '../model/job.model';
import { from } from 'rxjs';

@Component({
    selector: 'app-job-add',
    templateUrl: './job-add.component.html',
    styleUrls: ['./job-add.component.scss'],
})
export class JobAddComponent {
    title = 'Add Job';
    jobForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageBoxService,
        private jobService: JobsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.jobForm = this.fb.group({
            title: ['', [Validators.required]],
            jobDescriptions: this.fb.array([], [Validators.required]),
            jobSpecifications: this.fb.array([], [Validators.required]),
        });
    }

    get jobDescriptions(): FormArray {
        return this.jobForm.get('jobDescriptions') as FormArray;
    }

    get jobSpecifications(): FormArray {
        return this.jobForm.get('jobSpecifications') as FormArray;
    }

    addJobDescription(): void {
        const descriptionGroup = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });
        this.jobDescriptions.push(descriptionGroup);
    }

    removeJobDescription(index: number): void {
        this.jobDescriptions.removeAt(index);
    }

    addJobSpecification(): void {
        const specificationGroup = this.fb.group({
            specification: ['', Validators.required],
        });
        this.jobSpecifications.push(specificationGroup);
    }

    removeJobSpecification(index: number): void {
        this.jobSpecifications.removeAt(index);
    }

    onClose() {
        this.router.navigate(['admin/jobs']);
    }

    onSave(): void {
        if (this.jobForm.valid) {
            const formData = this.jobForm.value;
            const request: JobRequest = {
                jobTitle: formData.title,
                jobDesc: formData.jobDescriptions.map((desc: any) => ({
                    jobTitle: desc.title,
                    jobDesc: desc.description,
                })),
                jobSpec: formData.jobSpecifications.map(
                    (spec: any) => spec.specification
                ),
            };
            this.jobService.add(request).subscribe({
                next: (response) => {
                    this.messageService.showSuccess('Job added successfully!');
                    this.jobForm.reset();
                },
                error: (error) => {
                    console.error('Error adding job:', error);
                    this.messageService.showError(
                        'Failed to add job. Please try again.'
                    );
                },
            });
        } else {
            this.jobForm.markAllAsTouched();
            this.messageService.showError('Please fill required form.');
        }
    }
}
