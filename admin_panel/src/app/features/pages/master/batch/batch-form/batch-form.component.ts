import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService, ToastService } from 'src/app/core/services';
import { MaterialModule } from 'src/app/material.module';
import { BatchService } from 'src/app/shared/services/batch.service';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-batch-form',
  imports: [ReactiveFormsModule,MaterialModule],
  templateUrl: './batch-form.component.html',
  styleUrl: './batch-form.component.scss'
})
export class BatchFormComponent {

   id: string = "";

  form = new FormGroup({
    batchName: new FormControl("", [Validators.required]),
    batchStartTime: new FormControl("", [Validators.required]),
    batchEndTime: new FormControl("", [Validators.required]),
    status: new FormControl(""),
  });

  constructor(
    private router: Router,
    private toast: ToastService,
    private service: BatchService,
    private spinner: SpinnerService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.id = params?.id;
        this.getDataById(params?.id);
      }
    });
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  getDataById(id: string) {
    let params={
      courseId:id
    }
    this.spinner.show();
    this.service.getById(params).subscribe({
      next: (success: any) => {
        this.form.patchValue(success);
        // this.form.disable();
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }

  submit() {
    if (this.form.invalid) {
      this.toast.error("Please fill all the required fields");
      return;
    }

    if (this.id) {
      this.update();
    } else {
      this.createBatch();
    }
  }

  createBatch() {
    this.service.create(this.form.value).subscribe({
      next: (success: any) => {
        console.log(success);
        this.router.navigate(["/dashboard/batch-list"]);
      },
      error: (error) => {
        console.log("error", error);
      },
    });
  }

  update() {
    let params={
      batchId:this.id
    }
    this.spinner.show();
    this.service.update(params, this.form.value).subscribe({
      next: (success: any) => {
        console.log("success", success);
        this.spinner.hide();
        this.toast.success(success?.message);
        this.router.navigate(["/dashboard/courses-list"]);
      },
      error: (error) => {
        console.log("error", error);
        this.spinner.hide();
        this.toast.error(error);
      },
    });
  }
}
