// import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './Common/auth/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: '**', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/Common/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../app/modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'phongbans',
        loadChildren: () =>
          import('../app/modules/admin/phongban/phongban.module').then(
            (m) => m.PhongbanModule
          ),
      },
      {
        path: 'canbos',
        loadChildren: () =>
          import('../app/modules/admin/canbo/canbo.module').then(
            (m) => m.CanboModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
