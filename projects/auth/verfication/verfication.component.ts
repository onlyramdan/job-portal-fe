import { Response } from './../../../src/app/core/shared-component/lov-color/lov-color.interface';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { VerifyRequest } from './../model/auth.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-verfication',
    templateUrl: './verfication.component.html',
    styleUrls: ['./verfication.component.scss'],
})
export class VerficationComponent {
    verificationForm!: FormGroup;
    email!: string;
    isMessageSuccess: boolean =false;
    message:string;
    title:string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageBoxService
    ) {
        this.email = this.authService.getEmailVerify();
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.verificationForm = this.fb.group({
            email: [this.email],
            verificationCode: ['', Validators.required],
        });
    }

    onVerify() {
        if (this.verificationForm.valid) {
            const request: VerifyRequest = this.verificationForm.getRawValue();
            this.authService.verifyEmail(request).subscribe({
                next: (response) => {
                    const res = JSON.parse(response)
                    this.isMessageSuccess= true;
                    this.title = 'Verification Successfuly ';
                    this.message = res.data;
                    this.authService.destroyVerifyEmail();
                },
                error: (err) => {
                    console.log(err);
                    this.messageService.showError(
                        err.errors.reason[0],
                        'Failed Verify'
                    );
                },
            });
        } else {
            this.verificationForm.markAllAsTouched();
        }
    }
    onResendCode() {
        this.authService.resendVerify(this.email).subscribe({
            next: (res) => {
                console.log(res);
                this.authService.destroyVerifyEmail();
                this.messageService.showSuccess(
                    'Verification code resent successfully','Verification Succesfully', false
                );
            },
            error: (err) => {
                console.log(err);
                this.messageService.showError(
                    err.errors.reason[0],
                    'Failed to resend code'
                );
            },
        });
    }
    clickBack(){
        this.router.navigate(['auth/login']);
    }
}
