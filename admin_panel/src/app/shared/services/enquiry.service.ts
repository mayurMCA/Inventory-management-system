import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  routes: any = {
    getAllPath: 'sales/enquiry', 
    getByIdPath: (id: any) => `sales/enquiry/${id}`, 
  };

  constructor(private http: ApiService) {}

  getAll(payload: any) {
    return this.http
      .get(this.routes.getAllPath, payload)
      .pipe(map((res: any) => res));
  } 
  getById(id: string) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
 
}
