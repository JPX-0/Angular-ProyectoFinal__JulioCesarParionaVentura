import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { AuthRoutingModule } from './auth-routing.module';

import { Mat_GenericModule } from 'src/app/shared/material/mat-generic.module';
import { Mat_FormsModule } from 'src/app/shared/material/mat-forms.module';
import { My_Validators } from 'src/app/shared/validators/my-validator';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

const components = [
  LoginComponent,
  SignupComponent,
  ProfileComponent
]

@NgModule({
  declarations: components,
  imports: [
    AuthRoutingModule,
    Mat_GenericModule,
    Mat_FormsModule,
    MatTabsModule
  ],
  exports: components,
  // providers: [ My_Validators ]
})
export class AuthModule { }
