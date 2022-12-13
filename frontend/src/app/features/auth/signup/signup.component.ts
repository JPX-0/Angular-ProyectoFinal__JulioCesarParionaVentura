import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/db/user.service';
import { RouterService } from 'src/app/core/services/tools/router.service';
import { My_Validators } from 'src/app/shared/validators/my-validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  session = this.formBuilder.group({
    firstName: ["", [Validators.required, My_Validators.nameFormat]],
    lastName: ["", [Validators.required, My_Validators.nameFormat]],
    image: ["", [My_Validators.url]],
    birth: ["", [Validators.required, My_Validators.age(18, 60)]],
    email: ["", [Validators.required, Validators.email]],
    npassword: ["", [Validators.required, Validators.minLength(6)]],
    rpassword: ["", [Validators.required, Validators.minLength(6)]],
  }, {
    validators: My_Validators.passwordEqual("npassword", "rpassword")
  });

  _db!: Subscription;

  constructor(
    private router: Router,
    private routerService: RouterService,
    private formBuilder: FormBuilder,
    private dbService: UserService
  ) { }

  ngOnInit(): void {
    this.routerService.pushCurrentPage(this.routerService.getCurrentPage());
  }

  signup(): void {
    this._db = this.dbService.signup(this.session.value).subscribe({
      error: ({ error }) => {
        if(error.details?.includes("data.email_1 dup key")) 
          return this.session.controls?.["email"].setErrors({ duplicate: true })
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

  when_error(ref: string, validator: string): ValidationErrors | null {
    return this.session.controls?.[ref].errors?.[validator];
  }

}
