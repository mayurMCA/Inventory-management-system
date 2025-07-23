import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SwitchMsg, ToastComponent, ToastDTO } from 'src/app/shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackbar: MatSnackBar) { }

  success(msg: string, delay?: number) {
    this.open(msg, SwitchMsg.SUCCESS, delay);
  }

  info(msg: string, delay?: number) {
    this.open(msg, SwitchMsg.INFO, delay);
  }

  warning(msg: string, delay?: number) {
    this.open(msg, SwitchMsg.WARNING, delay);
  }

  failure(msg: string, delay?: number) {
    this.open(msg, SwitchMsg.FAIL, delay);
  }

  error(msg: string, delay?: number) {
    this.open(msg, SwitchMsg.FAIL, delay);
  }

  moveForwardError(msg: string, delay?: number) {
    this.open(msg, SwitchMsg.FAIL, delay, 'top', 'center');
  }



  open(msg: string, msgtype: SwitchMsg, delay?: number, vertical?: MatSnackBarVerticalPosition, horizontal?: MatSnackBarHorizontalPosition) {

    let message = new ToastDTO();
    message.message = msg;
    message.severity = msgtype;
    this.snackbar.openFromComponent(ToastComponent, {

      data: message,
      duration: delay ? delay : 3000,
      verticalPosition: vertical ?? 'bottom',
      horizontalPosition: horizontal ?? 'right' //// For now will it dynamic

    });
  }
}
