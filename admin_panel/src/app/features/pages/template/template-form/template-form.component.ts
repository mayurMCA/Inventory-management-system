import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { QuillModule } from 'ngx-quill';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerService, ToastService } from 'src/app/core/services';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TemplateService } from 'src/app/shared/services/template.service';

@Component({
  selector: 'app-template-form',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],

  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss',
})
export class TemplateFormComponent implements OnInit {
  isDragOver = false;
  selectedFile: File | null = null;
  fileName: any = '';
  id: string = '';
  url: SafeUrl | null = null;
  file: any = null;
  templateName:string=''

  // form = new FormGroup({
  //   templateName: new FormControl('', [Validators.required]),
  //   templateImage: new FormControl(''),
  // });

  constructor(
    private router: Router,
    private toast: ToastService,
    private domSanitizer: DomSanitizer,
    private service: TemplateService,
    private spinner: SpinnerService,
    private actRoute: ActivatedRoute
  ) {}
  // get f() {
  //   return this.form.controls;
  // }

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

  fileChosen(event: any) {
    console.log('event.target.files', event);

    if (event.target.files.length) {
      if (event.target.files[0].size > 2000000) {
        this.toast.warning('Unable to upload file of size more than 1MB');
        return;
      }
      this.file = <File>event.target.files[0];
      this.fileName = this.file.name;
      const type = this.file.type;
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        let base64: any = reader.result;
        this.url = this.domSanitizer.bypassSecurityTrustUrl(base64);
      };
      reader.onerror = (error) => {
        console.error(error);
      };
    }
  }

  submit() {
    if (!this.templateName) {
      this.toast.warning('Please Fill All Fields');
      return;
    }
    // let formData = this.form.value;
    let fd: FormData = new FormData();
    fd.append('templateName', this.templateName);

    if (this.file) {
      fd.append('templateImage', this.file, this.file.name);
    }

    if (this.id) {
      this.update(this.id, fd);
    } else {
      this.create(fd);
    }
  }

  create(formData: any) {
    this.spinner.show();
    this.service.create(formData).subscribe({
      next: (success: any) => {
        this.spinner.hide();
        this.toast.success(success?.message);
        this.router.navigate(['/dashboard/template-list']);
        this.url = null;
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
        this.router.navigate(['/dashboard/template-list']);
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
        this.templateName = success.templateName;
        this.url = success?.templateImage;
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }
}
