import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { QuillModule } from 'ngx-quill';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerService, ToastService } from 'src/app/core/services';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EnquiryService } from 'src/app/shared/services/enquiry.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admission-form',
  imports: [MaterialModule, CommonModule, QuillModule, FormsModule, ReactiveFormsModule,
    NgSelectComponent, NgSelectModule],
  templateUrl: './admission-form.component.html',
  styleUrl: './admission-form.component.scss'
})
export class AdmissionFormComponent implements OnInit {
  isDragOver = false;
  selectedFile: File | null = null;
  content: string = '';
  blogTitle: string = '';
  fileName: any = '';
  id: string = '';

  form = new FormGroup({
    name: new FormControl(''),
    college: new FormControl(''),
    email: new FormControl(''),
    branch: new FormControl(''),
    mobile: new FormControl(''),
    semester: new FormControl(''),
    passyear: new FormControl(''),
    enquryfor: new FormControl(''),
    date: new FormControl(''),
    totalFees: new FormControl(''),
    course: new FormControl(''),
    batch: new FormControl(''),
  });

  constructor(
    private router: Router,
    private toast: ToastService,
    private service: EnquiryService,
    private spinner: SpinnerService,
    private actRoute: ActivatedRoute
  ) { }

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
    this.spinner.show();
    this.service.getById(id).subscribe({
      next: (success: any) => {
        this.form.patchValue(success);
        this.form.disable()
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }
}

