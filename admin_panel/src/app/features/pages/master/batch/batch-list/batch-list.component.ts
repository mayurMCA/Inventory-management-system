import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerService } from 'src/app/core/services';
import { MaterialModule } from 'src/app/material.module';
import { GeneralConfirmationComponent } from 'src/app/shared/components/general-confirmation-modal/general-confirmation-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { Location } from "@angular/common";
import { BatchService } from 'src/app/shared/services/batch.service';
import { CustomPaginationComponent } from 'src/app/core/components/custom-pagination/custom-pagination.component';
import { defaultStatus, pageLimitOptions } from 'src/app/core/helpers/constant.helper';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-batch-list',
  imports: [MaterialModule, NgxPaginationModule, CommonModule, CustomPaginationComponent, FormsModule],
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss'
})
export class BatchListComponent {


  page: number = 1;
  pageSize: number = 10;
  blogs: any[] = [];
  collection: number = 0;
  searchText: string = '';
  defaultStatus: any = defaultStatus;
  pageLimitOptions: any = pageLimitOptions;
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private service: BatchService,
    private dialog: MatDialog,
    private location: Location
  ) { }
  navigateTo(path: string, id: string | null) {
    if (id) {
      this.router.navigate([path], { queryParams: { id: id } });
    } else {
      this.router.navigate([path]);
    }
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAll();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.page = 0;
    this.getAll();
  }
    onSearchInputChange(value: string) {
    this.searchSubject.next(value);
  }


  ngOnInit(): void {
    // this.getAll();
  }
  getAll() {
    let params = {
      page: this.page,
      pageSize: this.pageSize,
      search: "",
    };
    this.service.getAll().subscribe({
      next: (success: any) => {
        this.blogs = success

        // this.collection = success?.count;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  deletBatch(id: string) {
    let modelRef = this.dialog.open(GeneralConfirmationComponent, {
      disableClose: true,
      width: '500px',
      data: {
        info: 'Are You Sure You Want To Delete This Event?',
      },
    });

    modelRef.afterClosed().subscribe((res: any) => {
      if (res == 'Yes') {
        let query = {
          courseId: id
        }
        this.service.delete(query).subscribe(
          (succ) => {
            // this.toast.success("Event Deleted");
            this.getAll();
          },
          (error) => {
            //console.log("error", error);
            // this.toast.error("Error saving data reverting back");
          }
        );
      } else if (res == 'No') {
      } else {
        // this.toast.error("Something went wrong");
      }
    });
  }

  handlePageChange(page: number) {
    this.page = page;
    this.getAll();
  }



}
