import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationListComponent } from './location-list/location-list.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';


@NgModule({
  declarations: [

    LocationListComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    SharedComponentModule
  ]
})
export class LocationsModule { }
