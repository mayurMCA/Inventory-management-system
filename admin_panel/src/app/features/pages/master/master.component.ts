import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-master',
  imports: [CommonModule, RouterModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent {


    constructor(
    private router: Router,
  ) {}


   cards = [
    {
      title: 'Courses',
      icon: 'fas fa-chalkboard-teacher',
      route: '/dashboard/courses-list',
      styleClass: 'teacher-card'
    },
    {
      title: 'Batch',
      icon: 'fas fa-graduation-cap',
      route: '/dashboard/batch-list',
      styleClass: 'teacher-card card-minimal'
    },
    {
      title: 'Instructors',
      icon: 'fas fa-graduation-cap',
      route: '/dashboard/instructor-list',
      styleClass: 'teacher-card card-minimal'
    },
    {
      title: 'Students',
      icon: 'fas fa-user-tie',
      route: '/dashboard/students-list',
      styleClass: 'teacher-card card-bold'
    },

    {
      title: 'Branch',
      icon: 'fas fa-user-tie',
      route: '/dashboard/branch-list',
      styleClass: 'teacher-card card-bold'
    },
    {
      title: 'College',
      icon: 'fas fa-user-tie',
      route: '/dashboard/college-list',
      styleClass: 'teacher-card card-bold'
    },
    {
      title: 'City',
      icon: 'fas fa-user-tie',
      route: '/dashboard/city-list',
      styleClass: 'teacher-card card-bold'
    },
  ];

 navigateTo(path: string) {
  this.router.navigate([path]);
}

}
