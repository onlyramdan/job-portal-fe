import { LoactionService } from './../service/location.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { TableComponent } from '@core/shared-component/table/table.component';
import {
    LocationRequest,
    LocationResponse,
    LocationUpdateRequest,
} from '../model/location.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent {
    title = 'Location Management';
    showDeleteModal: boolean = false;
    showAddEditModal: boolean = false;
    selectedLocation: LocationResponse;
    isEditing: boolean = false;
    locationForm: FormGroup;

    @ViewChild('TableComponent') table: TableComponent;
    body: any;
    kebabOption = {
        isDelete: true,
        isEdit: true,
    };
    columMap = [
        {
            label: 'Code',
            key: 'code',
        },
        {
            label: 'Name',
            key: 'name',
        },
    ];

    constructor(
        private messageService: MessageBoxService,
        private router: Router,
        private loactionService: LoactionService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.initForm();
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
            this.onEditDialog(data);
        }
    }

    initForm() {
        this.locationForm = this.fb.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            status: [false, Validators.required],
        });
    }

    confirmDelete(data: LocationResponse) {
        this.showDeleteModal = true;
        this.selectedLocation = data;
    }

    onDeleteCompany() {
        if (this.selectedLocation) {
            this.loactionService.delete(this.selectedLocation.id).subscribe({
                next: () => {
                    this.table.reload();
                    this.messageService.showSuccess(
                        'Location delete successfully!',
                        'Delete',
                        false
                    );
                },
                error: (err) => {
                    this.messageService.showError(
                        err.errors.reason[0],
                        'Location delete Failed!'
                    );
                },
                complete: () => {
                    this.showDeleteModal = false;
                },
            });
        }
    }

    onAdd() {
        this.isEditing = false;
        this.locationForm.reset();
        this.locationForm.get('code').enable();
        this.showAddEditModal = true;
    }

    onEditDialog(data: LocationResponse) {
        this.isEditing = true;
        this.locationForm.get('code').disable();

        this.locationForm.patchValue({
            code: data.code,
            name: data.name,
            status: data.isActive
        });
        const dataUpdate = this.locationForm.getRawValue();
        this.selectedLocation = data;
        this.showAddEditModal = true;
    }

    onSubmit() {
        if (this.locationForm.valid) {
            if (this.isEditing) {
                const locationData = this.locationForm.getRawValue();
                console.log(
                    'Updating location:',
                    this.locationForm.getRawValue()
                );
                const request: LocationUpdateRequest = {
                    id: this.selectedLocation.id,
                    code: locationData.code,
                    name: locationData.name,
                    isActive: locationData.status,

                };
                this.loactionService.edit(request).subscribe({
                    next: (res) => {
                        this.table.reload();
                        this.messageService.showSuccess(
                            'Location updated successfully!',
                            'Location Update',
                            false
                        );
                    },
                    error: (err) => {
                        this.messageService.showError(
                            'Location update Failed!',
                            'Location Update'
                        );
                    },
                });
            } else {
                const locationData = this.locationForm.getRawValue();
                console.log(
                    'Creating new location:',
                    this.locationForm.getRawValue()
                );
                const request: LocationRequest = {
                    name: locationData.name,
                    code: locationData.code,
                };
                this.loactionService.add(request).subscribe({
                    next: (res) => {
                        this.table.reload();
                        this.messageService.showSuccess(
                            'Location added successfully!',
                            'Add Success',
                            false
                        );
                    },
                    error: (err) => {
                        this.messageService.showError(
                            err.errors.reason[0],
                            'Location add Failed!'
                        );
                    },
                });
            }
            this.showAddEditModal = false;
        } else {
            this.locationForm.markAllAsTouched();
        }
    }
}
