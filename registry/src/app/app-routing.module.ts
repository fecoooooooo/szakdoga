import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { DeviceHistoryComponent } from './pages/device-history/device-history.component';
import { EditDeviceComponent } from './pages/edit-device/edit-device.component';
import { EditSoftwareComponent } from './pages/edit-software/edit-software.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListDevicesComponent } from './pages/list-devices/list-devices.component';
import { ListSoftwaresComponent } from './pages/list-softwares/list-softwares.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SoftwareHistoryComponent } from './pages/software-history/software-history.component';
import { UserDevicesComponent } from './pages/user-devices/user-devices.component';
import { UserSoftwaresComponent } from './pages/user-softwares/user-softwares.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: ListUsersComponent, canActivate: [AuthGuard] },
  {
    path: 'manage-users',
    children: [
      {
        path: '',
        component: ListUsersComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'new-user',
        component: EditUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-devices',
    children: [
      {
        path: '',
        component: ListDevicesComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'new-device',
        component: EditDeviceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-device/:id',
        component: EditDeviceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'device-history/:id',
        component: DeviceHistoryComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-softwares',
    children: [
      {
        path: '',
        component: ListSoftwaresComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'new-software',
        component: EditSoftwareComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-software/:id',
        component: EditSoftwareComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'software-history/:id',
        component: SoftwareHistoryComponent,
        canActivate: [AuthGuard],
      },
    ],
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
