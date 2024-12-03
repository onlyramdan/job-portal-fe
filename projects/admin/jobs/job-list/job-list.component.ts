import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@core/shared-component/table/table.component';
import { JobsService } from '../service/job.service';
import { JobResponse, JobTitleResponse } from '../model/job.model';
import { MessageService } from 'primeng/api';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
    title = "Job Management"
    showDeleteModal = false;
    selectionJob : JobTitleResponse;

    @ViewChild('TableComponent') table: TableComponent;
    body: any;
    kebabOption = {
        isDelete: true,
        isDetail: true,
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
        private router: Router,
        private jobServive: JobsService,
        private messageService: MessageBoxService
    )
    {}

    ngOnInit(){}

    onAdd(){
        this.router.navigate(['admin/jobs/add'])
    }

    onSearch(e){
        this.body = e;
        this.table.onSearch(this.body);
    }

    tableAction(e){
        const data = e.data;
        const action = e.action;
        if(action === 'delete'){
            this.confirmDelete(data);
        }
        if(action === 'edit'){
            this.router.navigateByUrl(`admin/jobs/${data.id}/edit`);
        }
        if(action === 'detail'){
            this.router.navigateByUrl(`admin/jobs/${data.id}/detail`);
        }
    }


    confirmDelete(data: JobTitleResponse ){
        this.showDeleteModal = true;
        this.selectionJob = data;
    }

    onDeleteJob(){
        if (this.selectionJob) {
            this.jobServive.deleteTitle(this.selectionJob.id).subscribe({
                next: () => {
                    this.table.reload();
                    this.messageService.showSuccess(
                        'Job delete successfully!',
                        'Delete',
                        false
                    );
                },
                error: (err) => {
                    this.messageService.showError(
                        err.errors.reason[0],
                        'Job delete Failed!'
                    );
                },
                complete: () => {
                    this.showDeleteModal = false;
                },
            });
        }
    }
}
