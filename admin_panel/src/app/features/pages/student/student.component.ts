import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [CommonModule, RouterModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

 constructor(
    private router: Router,
  ) {}


   cards = [
    {
      title: 'Enquiry',
      icon: 'fas fa-chalkboard-teacher',
      route: '/dashboard/enquiry-list',
      styleClass: 'teacher-card'
    },
    {
      title: 'Admission',
      icon: 'fas fa-graduation-cap',
      route: '/dashboard/admission-list',
      styleClass: 'teacher-card card-minimal'
    },
  ]

   navigateTo(path: string) {
  this.router.navigate([path]);
}

}
