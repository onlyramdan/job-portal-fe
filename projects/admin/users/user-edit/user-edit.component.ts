import { id } from 'date-fns/locale';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { UpdateUserRequest } from '../model/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
    title = "Edit User"
    updateForm : FormGroup;
    id: string;

    constructor(
        private userService : UserService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageBoxService,
        private fb: FormBuilder
    ){
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(){
        this.initForm();
        this.getUser();
    }

    initForm(){
        this.updateForm = this.fb.group({
            id:[this.id],
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            roleId: ['', Validators.required],
            status: [false, Validators.required],
        })
    }

    onSelectRole(e){
        this.updateForm.patchValue({
            roleId: e.id
        })
    }

    getUser(){
        this.userService.getUser(this.id).subscribe({
            next: (res) => {
                this.updateForm.patchValue({
                    username: res.data.username,
                    email: res.data.email,
                    roleId: res.data.roleId,
                    status: res.data.isActive
                })
            }
        })
    }

    onUpdate(){
        if(this.updateForm.valid){
            const dataForm = this.updateForm.getRawValue();
            const request: UpdateUserRequest = {
                id: dataForm.id,
                username: dataForm.username,
                email: dataForm.email,
                roleId: dataForm.roleId,
                isActive: dataForm.status
            }
            this.userService.edit(request).subscribe({
                next: (res) => {
                    this.messageService.showSuccess(
                        'User Updated successfully',
                        'User Updated',
                        true
                    );
                },
                error: (err) => {
                    this.messageService.showError(err.errors.reason[0],"User Update failed. Please try again");
                }
            })
        } else{
            this.updateForm.markAllAsTouched();
        }
    }
    onClose(){
        this.router.navigate(['admin/users']);
    }
}
