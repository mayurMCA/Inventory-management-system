import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-custom-pagination',
  imports: [NgxPaginationModule, MaterialModule,CommonModule],
  templateUrl: './custom-pagination.component.html',
  styleUrl: './custom-pagination.component.scss',
})
export class CustomPaginationComponent {
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 10;
  @Input() collection: number = 0;

  @Input() pageLimitOptions = [
    { value: 5 },
    { value: 10 },
    { value: 25 },
    { value: 50 },
  ];

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() pageIndexChange = new EventEmitter<number>();

  onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
  }
onPageChange(event: PageEvent) {
  this.pageChange.emit(event);
  this.pageIndexChange.emit(event.pageIndex); // Ensures two-way binding
}
}
