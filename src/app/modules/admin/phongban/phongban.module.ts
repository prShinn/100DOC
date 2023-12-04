import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhongbanRoutingModule } from './phongban-routing.module';
import { PhongbanComponent } from './phongban.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PhongbanComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PhongbanRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class PhongbanModule { }
