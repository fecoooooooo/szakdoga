import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ListDevicesComponent } from './pages/list-devices/list-devices.component';
import { ListSoftwaresComponent } from './pages/list-softwares/list-softwares.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EditDeviceComponent } from './pages/edit-device/edit-device.component';
import { EditSoftwareComponent } from './pages/edit-software/edit-software.component';
import { DeviceLifecycleComponent } from './pages/device-lifecycle/device-lifecycle.component';
import { SoftwareLifecycleComponent } from './pages/software-lifecycle/software-lifecycle.component';
import { UserSoftwaresComponent } from './pages/user-softwares/user-softwares.component';
import { UserDevicesComponent } from './pages/user-devices/user-devices.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AuthenticationService,
  DevicesService,
  UsersService,
} from 'api-clients/api';
import { MatTableModule } from '@angular/material/table';
import { BooleanToHunPipe } from './shared/boolean-to-hun.pipe';
import { ToastrModule } from 'ngx-toastr';
import { RequestInterceptor } from './shared/request.interceptor';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeviceHistoryComponent } from './pages/device-history/device-history.component';
import { SoftwareHistoryComponent } from './pages/software-history/software-history.component';
import { AuthenticationInterceptor } from './shared/authentication.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    ListDevicesComponent,
    ListSoftwaresComponent,
    EditUserComponent,
    EditDeviceComponent,
    EditSoftwareComponent,
    DeviceLifecycleComponent,
    SoftwareLifecycleComponent,
    UserSoftwaresComponent,
    UserDevicesComponent,
    NotFoundComponent,
    AuthenticationComponent,
    BooleanToHunPipe,
    ConfirmationModalComponent,
    DeviceHistoryComponent,
    SoftwareHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [
    DevicesService,
    UsersService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
