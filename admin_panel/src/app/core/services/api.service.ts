import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  catchError,
  distinctUntilChanged,
  map,
  shareReplay,
} from "rxjs/operators";

@Injectable()
export class ApiService {
  api_url = environment.apiEndpoint;
  constructor(private http: HttpClient) {}
  private() {
    return `${location.protocol}//${
      location.hostname + (location.port ? ":" + location.port : "")
    }/`;
  }
  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    distinctUntilChanged();
    return this.http.get(`${this.api_url}${path}`, { params }).pipe(
      map((res: any) => res), //res.result
      shareReplay()
    );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${this.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    distinctUntilChanged();
    return this.http
      .post(`${this.api_url}${path}`, body, {params})
      .pipe(map((res: any) => res.result));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .delete(`${this.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  patch(path: string, body: Object = {},params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .patch(`${this.api_url}${path}`, body,{params})
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    if (error && (error.status === 403 || error.status === 401)) {
      location.reload();
    }
    let err = error.error;
    if (err.error) {
      err = err.error;
      if (err && err.error_params && err.error_params.length > 0) {
        const errors = err.error_params.map((e: any) => e.msg);
        return throwError(errors || ["Oops something went wrong!"]);
      } else if (err && err.errors && err.errors.length > 0) {
        return throwError(err.errors || ["Oops something went wrong!"]);
      } else {
        return throwError(["Oops something went wrong!"]);
      }
    } else {
      return throwError(
        err
          ? err.errors
            ? err.errors
            : "Oops something went wrong!"
          : "Oops something went wrong!"
      );
    }
  }
}
