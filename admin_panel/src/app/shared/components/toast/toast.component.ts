import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
export enum SwitchMsg {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  INFO = 'INFO',
  WARNING = 'WARNING',
}
export class ToastDTO {
  message: string;
  severity: SwitchMsg;
}
@Component({
  selector: 'app-toast',
  imports: [CommonModule,MaterialModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  status = SwitchMsg;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public message: ToastDTO,
    public snackBarRef: MatSnackBarRef<ToastComponent>
  ) {}
}
