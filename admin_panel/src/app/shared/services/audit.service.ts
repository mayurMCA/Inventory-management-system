import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
@Injectable({
  providedIn: 'root',
})
export class AuditService {
  routes: any = {
    getAllPath: 'sales/audit/',
  };

  constructor(private http: ApiService) {}

  getAll(params: any) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }
}
