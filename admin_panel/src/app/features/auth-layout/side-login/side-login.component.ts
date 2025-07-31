import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  SpinnerService,
  StorageService,
  ToastService,
} from 'src/app/core/services';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
  styleUrls:['./side-login.component.scss']
})
export class AppSideLoginComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastService,
    private spinner: SpinnerService,
    private storageService: StorageService
  ) {}

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.router.navigate(['']);
  }

  login() {
    // this.spinner.show();
    // this.auth.login(this.form.value).subscribe({
    //   next: (success: any) => {
    //     console.log('success', success);
    //     this.storageService.set('cvres_user', success);
    //     this.toast.success('Login done Successfully !!');
        this.router.navigate(['/dashboard']);
    //     this.spinner.hide();
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //     this.toast.error('Invalid Credentials !!');
    //     this.spinner.hide();
    //   },
    // });
  }
}
