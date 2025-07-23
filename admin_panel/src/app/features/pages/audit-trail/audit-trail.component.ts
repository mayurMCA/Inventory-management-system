import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services';
import { AuditService } from 'src/app/shared/services/audit.service';
import { GeneralConfirmationComponent } from 'src/app/shared/components/general-confirmation-modal/general-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { debounce, debounceTime, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-audit-trail',
  imports: [MaterialModule, NgxPaginationModule, CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './audit-trail.component.html',
  styleUrl: './audit-trail.component.scss',
})
export class AuditTrailComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  blogs: any[] = [];
  collection: number = 0;
  search: string = '';
  isUserSearch = new Subject();

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private service: AuditService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isUserSearch.pipe(debounceTime(1250)).subscribe((r: any) => {
          this.getAll();
    });
    this.getAll();
  }
  getAll() {
    let params = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
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
    this.page = page;
    this.getAll();
  }

  handleSearchInputChange() {
    this.isUserSearch.next('');
  }
}
