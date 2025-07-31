import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services';
import { PlanService } from 'src/app/shared/services/plan.service';
import { GeneralConfirmationComponent } from 'src/app/shared/components/general-confirmation-modal/general-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-list',
  imports: [MaterialModule, NgxPaginationModule, CommonModule],
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.scss'
})
export class PlanListComponent implements OnInit {

 page: number = 1;
  pageSize: number = 10;
  blogs: any[] = [];
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private service: PlanService,
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
        this.blogs = success?.rows;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  deletePlan(id: string) {
    let modelRef = this.dialog.open(GeneralConfirmationComponent, {
      disableClose: true,
      width: '500px',
      data: {
        info: 'Are You Sure. You Want To Delete The Event?',
      },
    });

    modelRef.afterClosed().subscribe((res: any) => {
      if (res == 'Yes') {
        this.service.delete(id).subscribe(
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
}

