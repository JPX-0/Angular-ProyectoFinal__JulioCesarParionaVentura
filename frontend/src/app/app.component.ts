import { Component } from '@angular/core';
import { UserService } from './core/services/db/user.service';
import { Observable } from "rxjs"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'ProyectoFinal';
  getRole$: Observable<{ isAdmin: boolean, isAuth: boolean }> = this.dbService.getUserRole();

  constructor(
    private dbService: UserService,
  ) {}

}
