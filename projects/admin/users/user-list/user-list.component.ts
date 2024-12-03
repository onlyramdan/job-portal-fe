import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@core/shared-component/table/table.component';
import { UserResponse } from '../model/user.model';
import { MessageBoxService } from '@core/service/message-box.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
    title = "User Mangement"
    showDeleteModal: boolean = false;
    selectedUser: UserResponse;
    detailModal: boolean = false;

    @ViewChild('TableComponent') table: TableComponent;
    body: any;
    kebabOption = {
        isDelete: true,
        isEdit: true,
        isDetail: true,
    };
    columMap = [
        {
            label: 'Username',
            key: 'username',
        },
        {
            label: 'Email',
            key: 'email',
        },
        {
            label: 'Role',
            key: 'role',
        },
    ];

    constructor(
        private router : Router,
        private messageService: MessageBoxService,
        private userService: UserService
    ){}

    ngOnInit(){
    }

    onAdd(){
        this.router.navigate(['/admin/users/add']);
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
            this.router.navigateByUrl(`admin/users/${data.id}/edit`);
        }
        if(action === 'detail'){
            this.getDetailUser(data);
        }
    }

    getDetailUser(data: UserResponse){
        this.detailModal = true
        this.selectedUser = data;
    }

    confirmDelete(data: UserResponse) {
        this.showDeleteModal = true;
        this.selectedUser = data;
    }

    onDeleteCompany(){
        if (this.selectedUser) {
            this.userService.delete(this.selectedUser.id).subscribe({
                next: () => {
                    this.table.reload();
                    this.messageService.showSuccess(
                        'User delete successfully!',
                        'Delete',
                        false
                    );
                },
                error: (err) => {
                    this.messageService.showError(
                        err.errors.reason[0],
                        'User delete Failed!'
                    );
                },
                complete: () => {
                    this.showDeleteModal = false;
                },
            });
        }
    }
}
