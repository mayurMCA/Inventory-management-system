import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  get(key: string): any {
    let data: any = localStorage.getItem(key);
    return localStorage ? JSON.parse(data) : null;
  }

  set(key: string, value: any): void {
    if (localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  remove(key: string): any {
    localStorage ? localStorage.removeItem(key) : null;
  }
}
