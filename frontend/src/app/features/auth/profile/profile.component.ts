import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterService } from 'src/app/core/services/tools/router.service';
import { FormBuilder, Validators, ValidationErrors, FormGroup } from '@angular/forms';
import { My_Validators } from 'src/app/shared/validators/my-validator';
import { UserService } from 'src/app/core/services/db/user.service';
import { Observable, Subscription, map, BehaviorSubject } from 'rxjs';
import { UserInfo, UserInfoSpecial } from 'src/app/shared/models/db/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {

  ID_ACCOUNT: string = localStorage.getItem("ID_ACCOUNT")!;
  userForm: FormGroup = this.formBuilder.group({
    firstName: [{ value: "", disabled: true }, [Validators.required, My_Validators.nameFormat]],
    lastName: [{ value: "", disabled: true }, [Validators.required, My_Validators.nameFormat]],
    image: [{ value: "", disabled: true }, [My_Validators.url]],
    birth: [{ value: "", disabled: true }, [Validators.required, My_Validators.age(18, 60)]],
  });
  key!: boolean;
  userData$!: BehaviorSubject<UserInfo>;
  sending$!: BehaviorSubject<boolean>;

  _db!: Subscription;
  _dbUserGet!: Subscription;
  _dbUserPut!: Subscription;

  constructor(
    private routerService: RouterService,
    private formBuilder: FormBuilder,
    private dbService: UserService
  ) {
    this.userData$ = new BehaviorSubject<UserInfo>({ ...this.userForm.value });
    this.sending$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    this.routerService.pushCurrentPage(this.routerService.getCurrentPage());
    this._db = this.dbService.getOne(this.ID_ACCOUNT).subscribe(({ error, response }) => {
      if(error)  return;
      this.userData$.next(response.info);
      this.userForm.setValue({
        firstName: response.info.firstName,
        lastName: response.info.lastName,
        image: response.info.image,
        birth: response.info.birth,
      });
    });
  }

  verifyChanges(): Observable<boolean> {
    return this.userData$.pipe(map(info => {
      this.key = this.userForm.get("firstName")?.value != info.firstName ||
      this.userForm.get("lastName")?.value != info.lastName ||
      this.userForm.get("image")?.value != info.image ||
      +(new Date(this.userForm.get("birth")?.value)) != +(new Date(info.birth))
      return this.userForm.valid ? !this.key : true;
    }));
  }

  updateUser(): void {
    if(this.key && this.ID_ACCOUNT) {
      this.sending$.next(true)
      this._dbUserPut = this.dbService.put(this.ID_ACCOUNT, this.userForm.value).subscribe({
        error: ({ error }) => console.error(error),
        complete: () => {
          this._dbUserGet = this.dbService.getOne(this.ID_ACCOUNT).subscribe({
            error: ({ error }) => console.error(error),
            next: ({ error, response }) => {
              if(error) return console.error("next: ", response);
              this.userData$.next(response.info)
              this.dbService.reloadUser(response);
            },
            complete: () => {
              this.sending$.next(false);
              this._dbUserPut.unsubscribe();
              this._dbUserGet.unsubscribe();
              this.userForm.disable();
            }
          })
        }
      });
    }
  }

  when_error(ref: string, validator: string): ValidationErrors | null {
    return !validator ? this.userForm.get(ref)?.errors : this.userForm.get(ref)?.errors?.[validator];
  }

  ngOnDestroy(): void {
    if(this._db) this._db.unsubscribe();
  }

}
