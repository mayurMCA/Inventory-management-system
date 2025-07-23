import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GeneralConfirmationComponent } from 'src/app/shared/components/general-confirmation-modal/general-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  imports: [MaterialModule, NgxPaginationModule, CommonModule],

  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  collection:number=0
  users: any[] = [];
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private service: AuthService,
    private dialog: MatDialog
  ) {}
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
        this.users = success?.rows;
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


