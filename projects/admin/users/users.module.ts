import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [

    UserListComponent,
       UserDetailComponent,
       UserAddComponent,
       UserEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedComponentModule
  ]
})
export class UsersModule { }
