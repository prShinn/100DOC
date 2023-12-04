import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanboRoutingModule } from './canbo-routing.module';
import { CanboComponent } from './canbo.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    CanboComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CanboRoutingModule
  ]
})
export class CanboModule { }
