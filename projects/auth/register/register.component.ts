import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { RegisterRequest } from '../model/auth.model';
import { MessageBoxService } from '@core/service/message-box.service';
import { th } from 'date-fns/locale';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    registerForm!: FormGroup;
    roleId: string;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageBoxService,
        private router: Router

    ) {}

    ngOnInit() {
        this.initForm();
        this.getRole();
    }

    getRole(){
        this.authService.getRole("CD").subscribe({
            next: (res) => {
                this.roleId = res.data.id;
            }
        })
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
        });
    }

    onRegister() {
        const password = this.registerForm.get('password')?.getRawValue();
        const confirmPassword = this.registerForm.get('confirmPassword')?.getRawValue();

        if(this.registerForm.valid){
            if (password !== confirmPassword) {
                this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
                this.registerForm.get('password')?.setErrors({passwordMismatch: true})
                this.registerForm.get('confirmPassword')?.markAsTouched();
                this.registerForm.get('password')?.markAllAsTouched();
                return;
            }

            const dataRegister = this.registerForm.getRawValue();
            
            const registerRequest : RegisterRequest = {
                username: dataRegister.username,
                email: dataRegister.email,
                password: dataRegister.password,
                roleId: this.roleId
            }

            this.authService.register(registerRequest).subscribe({
                next: (res) => {
                    this.authService.saveEmailVerify(registerRequest.email);
                    this.router.navigateByUrl('auth/verify');
                },
                error: (err) => {
                    console.log(err);
                    this.messageService.showError(err.errors.reason[0],"Registration failed. Please try again");
                }
            })
        }else{
            this.registerForm.markAllAsTouched();
        }

    }
}
