import { Component, OnInit } from '@angular/core';
import { HandleMenuService } from 'src/app/core/services/tools/handle-menu.service';
import { RouterService } from 'src/app/core/services/tools/router.service';
import { Observable, map, Subscription, BehaviorSubject, of } from "rxjs"
import { UserService } from 'src/app/core/services/db/user.service';
import { Router } from '@angular/router';
import { userRoleType } from 'src/app/shared/models/db/user.model';

@Component({
  selector: 'header',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  routesAdmin = [
    {
      active: this.routerService.renderCurrentPage().pipe(map(e => e == "")),
      name: "Inicio",
      route: "",
      title: "redirect to: Home"
    },
    {
      active: this.routerService.renderCurrentPage().pipe(map(e => e == "courses")),
      name: "Cursos",
      route: "courses",
      title: "redirect to: Courses"
    }
  ];
  routesAuth = [...this.routesAdmin,
    {
      active: this.routerService.renderCurrentPage().pipe(map(e => e == "profile")),
      name: "Mi perfil",
      route: "profile",
      title: "redirect to: Profile"
    }
  ];
  isAuth$!: BehaviorSubject<boolean>;

  constructor(
    public menu: HandleMenuService,
    private routerService: RouterService,
    private router: Router,
    private dbService: UserService,
  ) {
    this.isAuth$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {}

  getRole(): Observable<{ isAdmin: boolean, isAuth: boolean }> {
    return this.dbService.getUserRole()
  }

  render(): Observable<string> {
    return this.routerService.renderCurrentPage()
  }
  logout() {
    this.dbService.logout();
    this.router.navigate(["login"]);
  }


}
