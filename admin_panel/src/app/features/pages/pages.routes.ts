import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashbord.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogAddComponent } from './blogs/blog-add/blog-add.component';
import { PlanListComponent } from './plan/plan-list/plan-list.component';
import { PlanFormComponent } from './plan/plan-form/plan-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { TemplateFormComponent } from './template/template-form/template-form.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { MasterComponent } from './master/master.component';
import { CoursesListComponent } from './master/courses/courses-list/courses-list.component';
import { StudentsListComponent } from './master/student/students-list/students-list.component';
import { CoursesFormComponent } from './master/courses/courses-form/courses-form.component';
import { StudentsFormComponent } from './master/student/students-form/students-form.component';
import { InstructorListComponent } from './master/Instructors/instructor-list/instructor-list.component';
import { InstructorFormComponent } from './master/Instructors/instructor-form/instructor-form.component';
import { TopicFormComponent } from './topics/topic-form/topic-form.component';
import { BatchListComponent } from './master/batch/batch-list/batch-list.component';
import { BatchFormComponent } from './master/batch/batch-form/batch-form.component';
import { BranchListComponent } from './master/branch/branch-list/branch-list.component';
import { CityListComponent } from './master/city/city-list/city-list.component';
import { CollegeListComponent } from './master/college/college-list/college-list.component';
import { StudentComponent } from './student/student.component';
import { EnquiryFormComponent } from './student/enquiry/enquiry-form/enquiry-form.component';
import { AdmissionFormComponent } from './student/admission/admission-form/admission-form.component';
import { AdmissionListComponent } from './student/admission/admission-list/admission-list.component';
import { EnquiryListComponent } from './student/enquiry/enquiry-list/enquiry-list.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Dashboard' }],
      urlStartsWith: 'dashboard',
    },
  },
  {
    path: 'master',
    component: MasterComponent,
    data: { title: 'Master', urlStartsWith: 'master' },
  },
    {
    path: 'student',
    component: StudentComponent,
    data: { title: 'Student', urlStartsWith: 'student' },
  },
  // {
  //   path: 'blog-list',
  //   component: BlogListComponent,
  //   data: { title: 'Blog List', urlStartsWith: 'blog' },
  // },
  // {
  //   path: 'blog-add',
  //   component: BlogAddComponent,
  //   data: { title: 'Add Blog', urlStartsWith: 'blog' },
  // },
  // {
  //   path: 'plan-list',
  //   component: PlanListComponent,
  //   data: { title: 'Plan List', urlStartsWith: 'plan' },
  // },
  // {
  //   path: 'plan-form',
  //   component: PlanFormComponent,
  //   data: { title: 'Plan Form', urlStartsWith: 'plan' },
  // },
  {
    path: 'user-list',
    component: UserListComponent,
    data: { title: 'User List', urlStartsWith: 'user' },
  },
  // {
  //   path: 'template-list',
  //   component: TemplateListComponent,
  //   data: { title: 'Template List', urlStartsWith: 'template' },
  // },
  // {
  //   path: 'template-form',
  //   component: TemplateFormComponent,
  //   data: { title: 'Template Form', urlStartsWith: 'template' },
  // },
  // {
  //   path: 'audit-trail',
  //   component: AuditTrailComponent,
  //   data: { title: 'Audit Trail', urlStartsWith: 'audit' },
  // },
  {
    path: 'enquiry-list',
    component: EnquiryListComponent,
    data: { title: 'Enquiry List', urlStartsWith: 'enquiry' },
  },
  {
    path: 'enquiry-form',
    component: EnquiryFormComponent,
    data: { title: 'Enquiry Form', urlStartsWith: 'enquiry' },
  },
    {
    path: 'admission-list',
    component: AdmissionListComponent,
    data: { title: 'Admission List', urlStartsWith: 'admission' },
  },
  {
    path: 'admission-form',
    component: AdmissionFormComponent,
    data: { title: 'Admission Form', urlStartsWith: 'admission' },
  },


  {
    path: 'courses-list',
    component: CoursesListComponent,
    data: { title: 'Courses List', urlStartsWith: 'courses' },
  },
  {
    path: 'courses-form',
    component: CoursesFormComponent,
    data: { title: 'Courses Form', urlStartsWith: 'courses' },
  },
  {
    path: 'batch-list',
    component: BatchListComponent,
    data: { title: 'Batch List', urlStartsWith: 'batch' },
  },
  {
    path: 'batch-form',
    component: BatchFormComponent,
    data: { title: 'Batch Form', urlStartsWith: 'batch' },
  },
  {
    path: 'students-list',
    component: StudentsListComponent,
    data: { title: 'Students List', urlStartsWith: 'students' },
  },
  {
    path: 'students-form',
    component: StudentsFormComponent,
    data: { title: 'Students Form', urlStartsWith: 'students' },
  },

  {
    path: 'instructor-list',
    component: InstructorListComponent,
    data: { title: 'Instructor List', urlStartsWith: 'instructors' },
  },
  {
    path: 'instructor-form',
    component: InstructorFormComponent,
    data: { title: 'Instructor Form', urlStartsWith: 'instructors' },
  },
  {
    path: 'topic',
    component: TopicFormComponent,
    data: { title: 'Topic', urlStartsWith: 'topic' },
  },

  {
    path: 'branch-list',
    component: BranchListComponent,
    data: { title: 'Branch List', urlStartsWith: 'branch' },
  },
  {
    path: 'city-list',
    component: CityListComponent,
    data: { title: 'Instructor List', urlStartsWith: 'city' },
  },
  {
    path:'college-list',
    component:CollegeListComponent,
    data: {title:'College List', urlStartswith:'college'}
  }
 
];
