import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 routes: any = {
    // getAllPath: 'admin/getAllCourses',
    createPath: 'student/create-student',
    // deletePath:  `admin/delete-course`,
    // getByIdPath: (id: any) => `sales/plan/${id}`,
    // updatePath: (id: any) => `admin/update-course/${id}`,
  };

  constructor(private http: ApiService) {}

  // getAll(payload: any) {
  //   return this.http
  //     .get(this.routes.getAllPath, payload)
  //     .pipe(map((res: any) => res));
  // }
  create(payload: any) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  // update(id: string, payload: any) {
  //   return this.http
  //     .put(this.routes.updatePath(id), payload)
  //     .pipe(map((res: any) => res));
  // }
  // getById(id: string) {
  //   return this.http
  //     .get(this.routes.getByIdPath(id))
  //     .pipe(map((res: any) => res));
  // }
  // delete(params: any) {
  //   console.log('params',params)
  //   return this.http
  //     .delete(this.routes.deletePath,params)
  //     .pipe(map((res: any) => res));
  // }
}
