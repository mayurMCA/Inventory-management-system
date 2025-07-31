import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services';
import { EnquiryService } from 'src/app/shared/services/enquiry.service';
import { GeneralConfirmationComponent } from 'src/app/shared/components/general-confirmation-modal/general-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomPaginationComponent } from 'src/app/core/components/custom-pagination/custom-pagination.component';
import { defaultStatus, pageLimitOptions } from 'src/app/core/helpers/constant.helper';
import { PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-students-list',
  imports: [MaterialModule, NgxPaginationModule, CommonModule, CustomPaginationComponent, FormsModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  blogs: any[] = [];
  collection: number = 0
  searchText: string = '';
  defaultStatus: any = defaultStatus;
  pageLimitOptions: any = pageLimitOptions;
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private service: EnquiryService,
    private dialog: MatDialog,
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
    this.getAll();
  }
  getAll() {
    let params = {
      page: this.page,
      pageSize: this.pageSize,
      search: '',
    };
    this.service.getAll(params).subscribe({
      next: (success: any) => {
        this.blogs = success?.rows;
        this.collection = success?.count;

      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  handlePageChange(page: number) {
    this.page = page
    this.getAll()

  }


  deletStudent(id: string) {
    let modelRef = this.dialog.open(GeneralConfirmationComponent, {
      disableClose: true,
      width: '500px',
      data: {
        info: 'Are You Sure You Want To Delete This Event?',
      },
    });

    // modelRef.afterClosed().subscribe((res: any) => {
    //   if (res == 'Yes') {
    //     let query={
    //       courseId:id
    //     }
    //     this.service.delete(query).subscribe(
    //       (succ) => {
    //         // this.toast.success("Event Deleted");
    //         this.getAll();
    //       },
    //       (error) => {
    //         //console.log("error", error);
    //         // this.toast.error("Error saving data reverting back");
    //       }
    //     );
    //   } else if (res == 'No') {
    //   } else {
    //     // this.toast.error("Something went wrong");
    //   }
    // });
  }

}
