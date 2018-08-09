import { INotificationMessenger } from './contracts';
import { ToastsManager } from 'node_modules/ng2-toastr/ng2-toastr';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export class NotificationMessenger implements INotificationMessenger {

  info(message: string): void {
  }

  warning(message: string): void {
  }

  error(message: string): void {
  }
}
