export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './devices.service';
import { DevicesService } from './devices.service';
export const APIS = [AuthenticationService, DevicesService];
