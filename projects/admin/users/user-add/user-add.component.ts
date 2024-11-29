import { userEvent } from '@storybook/testing-library';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { RegisterRequest } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
    title = 'Add User';
    registerForm!: FormGroup;

    constructor(private router: Router,
        private messageService: MessageBoxService,
        private fb: FormBuilder,
        private UserService : UserService
    ) { }

    ngOnInit(){
        this.initForm();
    }

    initForm() {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: [
                '',
                [Validators.required, Validators.minLength(6)],
            ],
            roleId: ['', Validators.required],
        });
    }

    onSelectRole(e){
        this.registerForm.patchValue({
            roleId: e.id
        })
    }

    onClose(){
        this.router.navigate(['admin/users']);
    }

    onSave(){
        const password = this.registerForm.get('password')?.getRawValue();
        const confirmPassword = this.registerForm.get('confirmPassword')?.getRawValue();

        if (this.registerForm.valid) {

            if (password !== confirmPassword) {
                this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
                this.registerForm.get('password')?.setErrors({passwordMismatch: true})
                this.registerForm.get('confirmPassword')?.markAsTouched();
                this.registerForm.get('password')?.markAllAsTouched();
                return;
            }

            const dataForm = this.registerForm.getRawValue();
            const request : RegisterRequest = {
                username: dataForm.username,
                email: dataForm.email,
                password: dataForm.password,
                roleId: dataForm.roleId
            }
            this.UserService.add(request).subscribe({
                next: (response) => {
                    this.messageService.showSuccess(
                        'User created successfully',
                        'User created',
                        true
                    );
                },
                error: (err) => {
                    this.messageService.showError(err.errors.reason[0],"User add failed. Please try again");
                }
            })
        } else{
            this.registerForm.markAllAsTouched();
        }
    }
}
