import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ExcludeFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          // Удаляем поля из объекта данных
          this.excludeFields(data);
        }
        return data;
      }),
    );
  }

  private excludeFields(data: any) {
    // Если это массив, рекурсивно обрабатываем каждый элемент
    if (Array.isArray(data)) {
      data.forEach((item) => this.excludeFields(item));
    } else if (typeof data === 'object') {
      // Удаляем поле 'password' из объекта
      delete data.password;

      // Обрабатываем вложенные объекты рекурсивно
      Object.values(data).forEach((value) => {
        if (typeof value === 'object') {
          this.excludeFields(value);
        }
      });
    }
  }
}