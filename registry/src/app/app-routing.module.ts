import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ListDevicesComponent } from './pages/list-devices/list-devices.component';
import { ListSoftwaresComponent } from './pages/list-softwares/list-softwares.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserDevicesComponent } from './pages/user-devices/user-devices.component';
import { UserSoftwaresComponent } from './pages/user-softwares/user-softwares.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  {
    path: 'list-users',
    children: [
      {
        path: '',
        component: ListUsersComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'new-user', // child route path
        component: EditUserComponent, // child route component that the router renders
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-user/:id', // child route path
        component: EditUserComponent, // child route component that the router renders
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'list-devices',
    component: ListDevicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-softwares',
    component: ListSoftwaresComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-devices',
    component: UserDevicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-softwares',
    component: UserSoftwaresComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: AuthenticationComponent,
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
