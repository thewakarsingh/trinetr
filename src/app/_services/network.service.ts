import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private online$: Observable<boolean>;

  constructor() {
    this.online$ = new Observable<boolean>((observer) => {
      window.addEventListener('online', () => observer.next(true));
      window.addEventListener('offline', () => observer.next(false));
    });
  }

  isOnline(): Observable<boolean> {
    return this.online$;
  }
}
