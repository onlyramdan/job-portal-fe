import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { RegisterComponent } from './register/register.component';
import { VerficationComponent } from './verfication/verfication.component';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerficationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    ButtonModule,
    ReactiveFormsModule,
    MessageModule,
    SharedComponentModule,
    PasswordModule
  ]
})
export class AuthModule { }
