import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../services/db/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private dbService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const ID_ACCOUNT = localStorage.getItem("ID_ACCOUNT");
    if(!ID_ACCOUNT) {
      this.router.navigate(["login"]);
      return false;
    }
    return this.dbService.getOne(ID_ACCOUNT).pipe(map(({ error }) => {
      if(error) this.router.navigate(["login"]);
      return !error;
    }));
  }
  
}
