import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/db/user.service';
import { HandleMenuService } from 'src/app/core/services/tools/handle-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(
    public router: Router,
    public menu: HandleMenuService,
    public dbService: UserService,
  ) { }

  ngOnInit(): void {
  }

  auth(): boolean {
    const id = localStorage.getItem("ID_ACCOUNT");
    console.log("ID_ACCOUNT: ", id);
    return true;
  }
  logout() {
    this.dbService.logout();
    this.router.navigate(["login"]);
  }

}
