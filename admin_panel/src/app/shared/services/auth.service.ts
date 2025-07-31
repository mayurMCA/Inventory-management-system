import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  routes: any = {
    loginPath: 'auth/user/login', 
    getAllPath:'auth/user/'
  };

  constructor(private http: ApiService) {}

  login(payload: any) {
    return this.http
      .post(this.routes.loginPath, payload)
      .pipe(map((res: any) => res));
  }
  getAll(params: any) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }
}
