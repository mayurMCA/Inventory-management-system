import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { QuillModule } from 'ngx-quill';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerService, ToastService } from 'src/app/core/services';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PlanService } from 'src/app/shared/services/plan.service';
import { CommonModule } from '@angular/common';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgSelectModule,
} from '@ng-select/ng-select';
@Component({
  selector: 'app-plan-form',
  imports: [
    MaterialModule,
    CommonModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    NgSelectModule,
  ],

  templateUrl: './plan-form.component.html',
  styleUrl: './plan-form.component.scss',
})
export class PlanFormComponent implements OnInit {
  id: string = '';
  plans: any[] = [
    { value: 'individual', name: 'Individual' },
    { value: 'business', name: 'Business' },
  ];
  status: any[] = [
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'Inactive' },
  ];

  form = new FormGroup({
    planName: new FormControl('', Validators.required),
    planType: new FormControl([''], Validators.required),
    credits: new FormControl(0, Validators.required),
    cost: new FormControl(0, Validators.required),
    creditExpiry: new FormControl(0, Validators.required),
    planDescription:new FormArray([]),
    status: new FormControl(['active'], Validators.required),
  });

  addPlanDescription() {
    this.planDescription.push(new FormControl(''));
  }
  removePlanDescription(index:number) {
    this.planDescription.removeAt(index)
  }

  get planDescription() {
    return this.form.get('planDescription') as FormArray;
  }

  constructor(
    private router: Router,
    private toast: ToastService,
    private service: PlanService,
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
    this.addPlanDescription()
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  submit() {
    if(this.form.invalid) {
      this.toast.error('Please fill all the required fields');
      return
    }
    let formData: any = this.form.value;
 

    if (this.id) {
      this.update(this.id, formData);
    } else {
      this.create(formData);
    }
  }

  create(formData: any) {
    this.spinner.show();
    this.service.create(formData).subscribe({
      next: (success: any) => {
        this.spinner.hide();
        this.toast.success(success?.message);
        this.router.navigate(['/dashboard/plan-list']);
      },
      error: (error) => {
        console.log('error', error);
        this.spinner.hide();
        this.toast.error(error);
      },
    });
  }
  update(id: string, formData: any) {
    this.spinner.show();
    this.service.update(id, formData).subscribe({
      next: (success: any) => {
        this.spinner.hide();
        this.toast.success(success?.message);
        this.router.navigate(['/dashboard/plan-list']);
      },
      error: (error) => {
        console.log('error', error);
        this.spinner.hide();
        this.toast.error(error);
      },
    });
  }

  getDataById(id: string) {
    this.spinner.show();
    this.service.getById(id).subscribe({
      next: (success: any) => {
        this.form.patchValue(success);
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }
}
