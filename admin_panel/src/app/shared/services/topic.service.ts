import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

 
  routes: any = {
     getAllPath: 'course/all',
     createPath: 'admin/add-topic',
     deletePath:  `admin/delete-course`,
     getByIdPath:  `course`,
     updatePath: (id: any) => `admin/update-course/${id}`,
   };
 
   constructor(private http: ApiService) {}
 
   getAll() {
     return this.http
       .get(this.routes.getAllPath)
       .pipe(map((res: any) => res));
   }
   create(payload: any,params:any) {
     return this.http
       .post(this.routes.createPath, payload, params)
       .pipe(map((res: any) => res));
   }
   update(id: string, payload: any) {
     return this.http
       .patch(this.routes.updatePath(id), payload)
       .pipe(map((res: any) => res));
   }
   getById(params: any) {
     return this.http
       .get(this.routes.getByIdPath,params)
       .pipe(map((res: any) => res));
   }
   delete(params: any) {
     return this.http
       .delete(this.routes.deletePath,params)
       .pipe(map((res: any) => res));
   }
}
