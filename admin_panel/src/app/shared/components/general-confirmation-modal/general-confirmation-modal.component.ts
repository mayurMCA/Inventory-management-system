import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-general-confirmation-modal',
  imports: [MaterialModule],
  templateUrl: './general-confirmation-modal.component.html',
  styleUrl: './general-confirmation-modal.component.scss',
})
export class GeneralConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public info: any,
    public dialogRef: MatDialogRef<GeneralConfirmationComponent, string>
  ) {}

  ngOnInit() {}

  yes() {
    this.dialogRef.close('Yes');
  }
  no() {
    this.dialogRef.close('No');
  }

  hide() {
    this.dialogRef.close();
  }
}
