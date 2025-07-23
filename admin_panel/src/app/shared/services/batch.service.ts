import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
routes: any = {
    // getAllPath: 'course/all',
    createPath: 'batch/create-batch',
    deletePath:  `admin/delete-course`,
    getByIdPath:  `course`,
    updatePath: 'batch/update-batch',
  };

  constructor(private http: ApiService) {}

  getAll() {
    return this.http
      .get(this.routes.getAllPath)
      .pipe(map((res: any) => res));
  }
  create(payload: any) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  update( payload: any,params:any) {
    return this.http
      .patch(this.routes.updatePath, payload, params)
      .pipe(map((res: any) => res));
  }
  getById(params: any) {
    return this.http
      .get(this.routes.getByIdPath,params)
      .pipe(map((res: any) => res));
  }
  delete(params: any) {
    console.log('params',params)
    return this.http
      .delete(this.routes.deletePath,params)
      .pipe(map((res: any) => res));
  }
}
