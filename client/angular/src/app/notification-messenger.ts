import { INotificationMessenger } from './contracts';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationMessenger implements INotificationMessenger {

  constructor(private toastr: ToastrService) {
  }

  info(message: string): void {
    this.toastr.success(message);
  }

  warning(message: string): void {
    this.toastr.warning(message);
  }

  error(message: string): void {
    this.toastr.error(message);
  }
}
