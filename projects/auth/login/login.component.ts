import { AuthService } from './../service/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/auth.model';
import { MessageBoxService } from '@core/service/message-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm! : FormGroup;
    loginRequest: LoginRequest;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageBoxService,
        private authService: AuthService,
        private router : Router

    ) { }

    ngOnInit(): void {
        this.initForm();
    }
    initForm(){
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit(){
        if(this.loginForm.valid){
            this.loginRequest = this.loginForm.getRawValue();
            this.authService.login(this.loginRequest).subscribe({
                next: (res) => {
                    const response = JSON.parse(res)
                    this.messageService.showSuccess('Login Successfull', 'Login');
                    console.log(response.data.token)
                    this.authService.saveToken(response.data.token);
                    const user = this.authService.getLoginData();
                    if(user.roleCode = 'ADM'){
                        this.router.navigateByUrl('admin')
                    }

                },
                error: (err) => {
                    console.log(err);
                    this.messageService.showError(err.errors.reason[0], 'Login Failed');
                }
            });
        }else{
            this.loginForm.markAllAsTouched();
        }
    }

}
