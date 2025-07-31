import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);

  if (typeof window !== 'undefined') {
    const user: any = storageService.get('cvres_user');

    if (user?.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  }

  return next(req);
};
