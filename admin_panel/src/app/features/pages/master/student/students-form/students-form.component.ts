import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { QuillModule } from 'ngx-quill';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerService, ToastService } from 'src/app/core/services';
import { EnquiryService } from 'src/app/shared/services/enquiry.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { Location } from '@angular/common';


@Component({
  selector: 'app-students-form',
  imports: [MaterialModule, CommonModule, QuillModule, FormsModule, ReactiveFormsModule,
    NgSelectComponent,
    NgSelectModule,
    QuillModule,
  ],
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.scss'
})
export class StudentsFormComponent implements OnInit {
  isDragOver = false;
  selectedFile: File | null = null;
  content: string = '';
  blogTitle: string = '';
  fileName: any = '';
  id: string = '';


  courses = [
    { id: '1', name: 'Angular' },
    { id: '2', name: 'Node.js' },
    { id: '3', name: 'Python' },
  ];

  batches = [
    { id: 'a', name: 'Batch A' },
    { id: 'b', name: 'Batch B' },
    { id: 'c', name: 'Batch C' },
  ];


  batch: any[] = [
    { value: 'individual', name: 'Individual' },
    { value: 'business', name: 'Business' },
  ];

  // form = new FormGroup({
  //   name: new FormControl(''),
  //   description: new FormControl(''),
  //   status: new FormControl(''),
  // });

  form = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    enrollmentDate: new FormControl(''),
    courseId: new FormControl(''),
    batchId: new FormControl(''),
    totalFees: new FormControl(''),
    feesPaid: new FormControl(''),
    paymentStatus: new FormControl(''),
    guardianName: new FormControl(''),
    emergencyContact: new FormControl(''),
    address: new FormControl(''),
  });


  constructor(
    private router: Router,
    private toast: ToastService,
    private service: EnquiryService,
    private spinner: SpinnerService,
    private actRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.id = params?.id;
        this.getDataById(params?.id);
      }
    });
  }
  goBack() {
    this.location.back()
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

