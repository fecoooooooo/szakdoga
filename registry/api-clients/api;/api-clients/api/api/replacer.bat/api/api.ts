export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './devices.service';
import { DevicesService } from './devices.service';
export * from './softwares.service';
import { SoftwaresService } from './softwares.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [AuthenticationService, DevicesService, SoftwaresService, UsersService];
