import { id } from 'date-fns/locale';
import {
    JobDescriptionResponse,
    JobResponse,
    JobTitleResponse,
    JobSpecificationResponse,
    UpdateJobTitleRequest,
} from './../model/job.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../service/job.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent {
    title = 'Job Detail';
    jobId: string;
    job: JobResponse;
    showDeleteModal: boolean = false;
    deleteTarget: any;
    deleteContext: 'jobTitle' | 'jobDesc' | 'jobSpec';

    showEditTitleModal: boolean = false;
    showEditSpecModal: boolean = false;
    showEditDescModal: boolean = false;

    editTitleForm: FormGroup;
    editDescForm: FormGroup;
    editSpecForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private jobService: JobsService,
        private messageService: MessageBoxService,
        private fb: FormBuilder
    ) {
        this.jobId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getJobDetail();
        this.initForm();
    }

    initForm() {
        this.editTitleForm = this.fb.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
            code: ['', Validators.required],
            status: [false, Validators.required],
        });

        this.editDescForm = this.fb.group({
            id: ['', Validators.required],
            titleDesc: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.editSpecForm = this.fb.group({
            id: ['', Validators.required],
            specification: ['', Validators.required],
        });

    }

    getJobDetail() {
        this.jobService.detail(this.jobId).subscribe({
            next: (response) => {
                this.job = {
                    jobTitle: response.data.jobTitle,
                    jobDesc: response.data.jobDescList,
                    jobSpec: response.data.jobSpecList,
                };
                console.log(this.job);
            },
            error: (err) => {
                console.error('Failed to fetch job details:', err);
                this.messageService.showError(
                    'Failed to fetch job details.',
                    'Error'
                );
            },
        });
    }

    onBack() {
        this.router.navigate(['admin/jobs']);
    }

    onEditTitleModal(id: string, data: JobTitleResponse) {
        this.editTitleForm.patchValue({
            id: data.id,
            name: data.name,
            code: data.code,
            status: data.isActive,
        });
        this.showEditTitleModal = true;
        console.log('Editing Job Title:', id, data);
    }

    onEditTitle() {
        if (this.editTitleForm.valid) {
            const dataForm = this.editTitleForm.getRawValue();
            const request: UpdateJobTitleRequest = {
                id: dataForm.id,
                code: dataForm.code,
                name: dataForm.name,
                isActive: dataForm.status,
            };
            this.jobService.editJobTitle(request).subscribe({
                next: (res) => {
                    this.messageService.showSuccess(
                        'Successfully update Job Title',
                        'Successfully Update',
                        false
                    );
                    this.getJobDetail();
                    this.showEditTitleModal = false;
                },
                error: (err) => {
                    err.errors.reason[0], 'Update Failed';
                },
            });
        } else {
            this.editTitleForm.markAsTouched();
        }
    }
    onDeleteDesc(id: string, desc: any): void {
        this.deleteContext = 'jobDesc';
        this.deleteTarget = { id, desc };
        this.showDeleteModal = true;
    }

    onDeleteSpec(id: string, spec: any): void {
        this.deleteContext = 'jobSpec';
        this.deleteTarget = { id, spec };
        this.showDeleteModal = true;
    }

    onDeleteTitle(id: string, title: any): void {
        this.deleteContext = 'jobTitle';
        this.deleteTarget = { id, title };
        this.showDeleteModal = true;
    }

    onDeleteConfirm(): void {
        const { id } = this.deleteTarget;
        this.onDelete(id, this.deleteContext, this.deleteTarget);
        this.showDeleteModal = false;
    }

    onDelete(
        id: string,
        context: 'jobTitle' | 'jobDesc' | 'jobSpec',
        target: any
    ): void {
        console.log(`Deleting ${context} with ID: ${id}`);
        let deleteApi;
        if (context === 'jobTitle') {
            deleteApi = this.jobService.deleteTitle(id);
        } else if (context === 'jobDesc') {
            deleteApi = this.jobService.deleteDesc(id);
        } else if (context === 'jobSpec') {
            deleteApi = this.jobService.deleteSpec(id);
        }

        deleteApi.subscribe({
            next: () => {
                this.messageService.showSuccess(
                    'Successfully Deleted',
                    'Success',
                    false
                );
                this.removeItemFromView(context, target);
            },
            error: (err) => {
                console.error(err);
                this.messageService.showError(
                    err.errors?.reason[0] || 'Deletion failed',
                    'Error'
                );
            },
        });
    }

    removeItemFromView(
        context: 'jobTitle' | 'jobDesc' | 'jobSpec',
        target: any
    ): void {
        if (context === 'jobTitle') {
            this.job.jobTitle = null;
        } else if (context === 'jobDesc') {
            this.job.jobDesc = this.job.jobDesc.filter(
                (desc) => desc.id !== target.id
            );
        } else if (context === 'jobSpec') {
            this.job.jobSpec = this.job.jobSpec.filter(
                (spec) => spec.id !== target.id
            );
        }
    }

    onClose(): void {
        this.showDeleteModal = false;
    }

    onEditDesc(id: number, desc: any) {
        this.editDescForm.patchValue({
            id: id,
            titleDesc: desc.titleDesc,
            description: desc.description,
        });
        this.showEditDescModal = true;
    }

    onEditSpec(id: number, spec: any) {
        this.editSpecForm.patchValue({
            id: id,
            specification: spec.specification,
        });
        this.showEditSpecModal = true;
    }

    onEditDescConfirm() {
        if (this.editDescForm.valid) {
            const data = this.editDescForm.getRawValue();
            console.log(data);
            this.jobService.editDesc(data).subscribe({
                next: (res) => {
                    const response = JSON.parse(res)
                    this.showEditDescModal = false;
                    this.messageService.showSuccess(
                        response.data,
                        "Updated Success",
                        false
                    )
                    this.getJobDetail();
                },
                error: (err) => {
                    this.messageService.showError(
                        err.errors.reason[0],
                        "Update Failed"
                    )
                },
            });
        } else {
            this.editDescForm.markAllAsTouched();
        }
    }

    onEditSpecConfirm() {
        if (this.editSpecForm.valid) {
            const data = this.editSpecForm.getRawValue();
            console.log(data);
            this.jobService.editSpec(data).subscribe({
                next: (res) => {
                    const response = JSON.parse(res)
                    this.showEditSpecModal = false;
                    this.messageService.showSuccess(
                        response.data,
                        "Updated Success",
                        false
                    )
                    this.getJobDetail();
                },
                error: (err) => {
                    this.messageService.showError(
                        err.errors.reason[0],
                        "Update Failed"
                    )
                },
            });
        } else {
            this.editSpecForm.markAllAsTouched();
        }
    }
}
