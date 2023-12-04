import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PhongbanComponent } from './phongban.component';

const routes: Routes = [
  {
    path: '',
    component: PhongbanComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhongbanRoutingModule {}
