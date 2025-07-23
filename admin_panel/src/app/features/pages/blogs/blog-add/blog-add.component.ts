import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { SpinnerService, ToastService } from 'src/app/core/services';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog-add',
  imports: [MaterialModule, CommonModule, QuillModule, FormsModule],
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.scss',
})
export class BlogAddComponent implements OnInit {
  htmlMode = false;

toggleHtmlMode() {
  this.htmlMode = !this.htmlMode;
}
  isDragOver = false;
  selectedFile: File | null = null;
  content: string = '';
  blogTitle: string = '';
  fileName: any = '';
  id: string = '';
  url: SafeUrl | null = null;
  file: any = null;
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image', 'video']                         // link and image, video
    ]
  };;
  
  constructor(
    private router: Router,
    private toast: ToastService,
    private domSanitizer: DomSanitizer,
    private blogService: BlogService,
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
    if(!this.blogTitle || !this.content){
      this.toast.warning('Please fill all fields')
      return 
    }
    let formData: FormData = new FormData();
    formData.append('title', this.blogTitle);
    formData.append('content', this.content);

    // let formData: any = {};
    // formData.title = this.blogTitle;
    // formData.content = this.content;
    if (this.file) {
      formData.append("image", this.file, this.file.name);
    }

    if (this.id) {
      this.update(this.id, formData);
    } else {
      this.create(formData);
    }
  }

  create(formData: any) {
    this.spinner.show();
    this.blogService.create(formData).subscribe({
      next: (success: any) => {
        this.spinner.hide();
        this.toast.success(success?.message);
        this.router.navigate(['/dashboard/blog-list']);
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
    this.blogService.update(id, formData).subscribe({
      next: (success: any) => {
        this.spinner.hide();
        this.toast.success(success?.message);
        this.router.navigate(['/dashboard/blog-list']);
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
    this.blogService.getById(id).subscribe({
      next: (success: any) => {
        this.blogTitle = success?.title;
        this.content = success?.content;
        this.url = success?.image

        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }
}
