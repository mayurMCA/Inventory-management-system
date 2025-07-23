import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxPaginationModule } from "ngx-pagination";
import { SpinnerService, ToastService } from "src/app/core/services";
import { MaterialModule } from "src/app/material.module";
import { GeneralConfirmationComponent } from "src/app/shared/components/general-confirmation-modal/general-confirmation-modal.component";
import { CustomPaginationComponent } from 'src/app/core/components/custom-pagination/custom-pagination.component';
import { defaultStatus, pageLimitOptions } from 'src/app/core/helpers/constant.helper';
import { PageEvent } from "@angular/material/paginator";
import { TopicService } from "src/app/shared/services/topic.service";
import { Subject } from "rxjs";


@Component({
  selector: 'app-city-list',
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    MaterialModule,
    NgxPaginationModule, CustomPaginationComponent, FormsModule
  ],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss'
})
export class CityListComponent {
  courseId: any;
  id: any;
  page: number = 0;
  pageSize: number = 10;
  attribute: any[] = [];
  collection: number = 0;
   searchText: string = '';
    defaultStatus: any = defaultStatus;
    pageLimitOptions: any = pageLimitOptions;
    private searchSubject = new Subject<string>();
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location,
    private topicService: TopicService
  ) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  Form = new FormGroup({
    // _id: new FormControl(null),
    topicOrder: new FormControl("", [Validators.required]),
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    etopicStatus: new FormControl("", [Validators.required]),
  });

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      // this.id = params['id'];
      this.courseId = params["id"];
      // console.log("this.shopId", this.shopId);

      // if (this.id) {
      //   this.getDataById(this.id);
      // } else {
      //   this.topicForm.reset();
      //   this.setValueArray(['']);
      // }
    });

    this.getAll();
  }

  navigateTolist(path: string, id: string | null) {
    if (id) {
      this.router.navigate([path], {
        queryParams: { id: id},
      });
    } else {
      this.router.navigate([path]);
    }
  }

  resetForm() {
    this.Form.reset();
    this.id = null; // Clear edit mode
  }

  submit() {
    if (this.Form.invalid) {
      this.toast.error("Please fill all the required fields");
      return;
    }

    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    let params = {
      courseId: this.courseId,
    };
    this.spinner.show();
    this.topicService.create(this.Form.value, params).subscribe({
      next: (success: any) => {
        this.spinner.hide();
        this.toast.success(success?.message);
        // this.router.navigate(['/dashboard/attribute-list']);
        this.getAll();
        this.resetForm(); // Reset form after creation
      },
    });
  }

  update() {
    this.spinner.show();
    // this.service.update(this.id, this.attributeForm.value).subscribe({
    //   next: (success: any) => {
    //     this.spinner.hide();
    //     this.toast.success(success?.message);
    //     // this.router.navigate(['/dashboard/attribute-list']);
    //     this.getAll();
    //     this.resetForm(); // Reset form after update
    //   },

    // });
  }

  getDataById(id: string) {
    // this.spinner.show();
    // this.service.getById(id).subscribe({
    //   next: (success: any) => {
    //     // Patch regular fields
    //     this.attributeForm.patchValue({
    //       _id: success._id,
    //       name: success.name,
    //     });
    //     // Clear and repopulate the FormArray
    //     this.setValueArray(success.value);
    //     this.spinner.hide();
    //   },
    //   error: () => {
    //     this.spinner.hide();
    //   },
    // });
  }

  getAll() {
    let params = {
      page: this.page + 1,
      pageSize: this.pageSize,
      search: "",
    };
    this.topicService.getAll().subscribe({
      next: (success: any) => {
        this.attribute = success.data;
        this.collection = success?.count;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  handlePageChange(page: number) {
    this.page = page;
    this.getAll();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.page = 0;
    // Fetch data logic here
    this.getAll();
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    // Fetch data logic here
    this.getAll();
  }
    onSearchInputChange(value: string) {
    this.searchSubject.next(value);
  }
  deletAttribute(id: string) {
    let modelRef = this.dialog.open(GeneralConfirmationComponent, {
      disableClose: true,
      width: "500px",
      data: {
        info: "Are You Sure You Want To Delete This Event?",
      },
    });

    modelRef.afterClosed().subscribe((res: any) => {
      if (res == 'Yes') {
        this.topicService.delete(id).subscribe(
        );
      } else if (res == 'No') {
      } else {
        // this.toast.error("Something went wrong");
      }
    });
  }
}

