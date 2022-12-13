import { Component } from '@angular/core';
import { UserService } from './core/services/db/user.service';
import { Observable, map, Subscription } from "rxjs"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'ProyectoFinal';

  _db!: Subscription;

  constructor(
    private dbService: UserService,
  ) {}

  getRole(): Observable<{ isAdmin: boolean, isAuth: boolean }> {
    return this.dbService.getUserRole()
  }

}
