import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MaterialModule } from "src/app/material.module";
import { QuillModule } from "ngx-quill";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { SpinnerService, ToastService } from "src/app/core/services";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { EnquiryService } from "src/app/shared/services/enquiry.service";
import { CourseService } from "src/app/shared/services/course.service";

@Component({
  selector: "app-courses-form",
  imports: [
    MaterialModule,
    CommonModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./courses-form.component.html",
  styleUrl: "./courses-form.component.scss",
})
export class CoursesFormComponent implements OnInit {
  id: string = "";

  form = new FormGroup({
    courseName: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    durationInMonths: new FormControl("", [Validators.required]),
    status: new FormControl(""),
  });

  constructor(
    private router: Router,
    private toast: ToastService,
    private service: CourseService,
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
      this.createCourse();
    }
  }

  createCourse() {
    this.service.create(this.form.value).subscribe({
      next: (success: any) => {
        console.log("success",success);
        this.router.navigate(["/dashboard/courses-list"]);
      },
      error: (error) => {
        console.log("error", error);
      },
    });
  }

  update() {
    this.spinner.show();
    this.service.update(this.id, this.form.value).subscribe({
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
