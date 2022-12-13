import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/db/user.service';
import { RouterService } from 'src/app/core/services/tools/router.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  hide = true;
  session: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  _db!: Subscription;

  constructor(
    private router: Router,
    private routerService: RouterService,
    private formBuilder: FormBuilder,
    // private sessionService: SessionService,
    private dbService: UserService,
  ) { }
  
  ngOnInit(): void {
    this.routerService.pushCurrentPage(this.routerService.getCurrentPage());
  }

  login(): void {
    this._db = this.dbService.login(this.session.value).subscribe({
      error: ({ error }) => {
        if(error.statusCode == 404) {
          this.session.reset();
          this.session.controls?.["email"].setErrors({ notFound: true });
          this.session.controls?.["password"].setErrors({ notFound: true });
          return;
        }
        console.error("error: ", error);
      },
      next: ({ error, response }) => {
        if(error) return console.error("next: ", response);
        this.dbService.reloadUser(response);
        this.router.navigate([""]);
        this.session.reset();
      },
      complete: () => this._db.unsubscribe()
    })
  }

  when_error(ref: string, validator: any): boolean {
    return !validator ? this.session.get(ref)?.errors : this.session.get(ref)?.errors?.[validator];
  }

}
