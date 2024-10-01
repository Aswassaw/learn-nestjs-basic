import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("JALAN GAK SIH");
    

    return next.handle().pipe(
      map((value) => {
        value.timestamp = new Date();

        return value;
      }),
    );
  }
}
