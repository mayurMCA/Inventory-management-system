import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services';
import { EnquiryService } from 'src/app/shared/services/enquiry.service';
import { GeneralConfirmationComponent } from 'src/app/shared/components/general-confirmation-modal/general-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { CustomPaginationComponent } from 'src/app/core/components/custom-pagination/custom-pagination.component';
import { defaultStatus, pageLimitOptions } from 'src/app/core/helpers/constant.helper';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enquiry-list',
  imports: [MaterialModule, NgxPaginationModule, CommonModule, CustomPaginationComponent, FormsModule],
  templateUrl: './enquiry-list.component.html',
  styleUrl: './enquiry-list.component.scss'
})
export class EnquiryListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  blogs: any[] = [];
  collection:number=0
  searchText: string = '';
  defaultStatus: any = defaultStatus;
  pageLimitOptions: any = pageLimitOptions;
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private service: EnquiryService,
    private dialog: MatDialog
  ) {}

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

  navigateTo(path: string, id: string | null) {
    if (id) {
      this.router.navigate([path], { queryParams: { id: id } });
    } else {
      this.router.navigate([path]);
    }
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

  handlePageChange(page:number){
    this.page=page
    this.getAll()
    
  }
  
}

