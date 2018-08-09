import { INotificationMessenger } from './contracts';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '../../node_modules/@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationMessenger implements INotificationMessenger {

  constructor(private toastr: ToastrService) {
  }

  info(message: string): void {
    this.toastr.success('Hello world!', message);
  }

  warning(message: string): void {
  }

  error(message: string): void {
  }
}
