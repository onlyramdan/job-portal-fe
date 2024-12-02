import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@core/shared-component/table/table.component';
import { JobsService } from '../service/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
    title = "Job Management"
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
        private jobServive: JobsService

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
        }
        if(action === 'edit'){
            this.router.navigateByUrl(`admin/jobs/${data.id}/edit`);
        }
        if(action === 'detail'){
            this.router.navigateByUrl(`admin/jobs/${data.id}/detail`);
        }
    }
}
