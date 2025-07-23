import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  routes: any = {
    getAllPath: 'sales/resumeTemplate',
    createPath: 'sales/resumeTemplate',
    getByIdPath: (id: any) => `sales/resumeTemplate/${id}`,
    updatePath: (id: any) => `sales/resumeTemplate/${id}`,
    deletePath: (id: any) => `sales/resumeTemplate/${id}`,
  };

  constructor(private http: ApiService) {}

  getAll(payload: any) {
    return this.http
      .get(this.routes.getAllPath, payload)
      .pipe(map((res: any) => res));
  }
  create(payload: any) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  update(id: string, payload: any) {
    return this.http
      .put(this.routes.updatePath(id), payload)
      .pipe(map((res: any) => res));
  }
  getById(id: string) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
  delete(id: string) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }
}
