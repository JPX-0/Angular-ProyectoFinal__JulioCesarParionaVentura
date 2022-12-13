import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RouterService {

  router$!: BehaviorSubject<string>

  constructor(
    private router: Router
  ) {
    this.router$ = new BehaviorSubject("");
  }

  getCurrentPage(): string {
    return this.router.url.split("/")[1];
  }
  pushCurrentPage(route: string): void {
    this.router$.next(route);
  }

  renderCurrentPage(): Observable<string> {
    return this.router$;
  }

}
