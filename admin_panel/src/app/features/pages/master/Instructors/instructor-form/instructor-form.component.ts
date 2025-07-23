import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { QuillModule } from 'ngx-quill';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerService, ToastService } from 'src/app/core/services';
import { EnquiryService } from 'src/app/shared/services/enquiry.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { Location } from '@angular/common';

@Component({
  selector: 'app-instructor-form',
  imports: [MaterialModule, CommonModule, QuillModule, FormsModule, ReactiveFormsModule,
      NgSelectComponent,
      NgSelectModule,
      QuillModule,],
  templateUrl: './instructor-form.component.html',
  styleUrl: './instructor-form.component.scss'
})
export class InstructorFormComponent implements OnInit {
  isDragOver = false;
  selectedFile: File | null = null;
  content: string = '';
  blogTitle: string = '';
  fileName: any = '';
  id: string = '';


  skillOptions = ['Angular', 'React', 'Node.js', 'MongoDB', 'Java', 'Python'];


  form = new FormGroup({
   fullName: new FormControl('', ),
  email: new FormControl('', ),
  phone: new FormControl('', [Validators.pattern(/^[0-9]{10}$/)]),
  gender: new FormControl(''),
  dob: new FormControl(''),
  qualification: new FormControl(''),
  skills: new FormControl([]),
  joiningDate: new FormControl(''),
  status: new FormControl('Active'),
  address: new FormControl(''),
  });

  constructor(
    private router: Router,
    private toast: ToastService,
    private service: EnquiryService,
    private spinner: SpinnerService,
    private actRoute: ActivatedRoute,
    private location:Location
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
    goBack(){
    this.location.back()
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


