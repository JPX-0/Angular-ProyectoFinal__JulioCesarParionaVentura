import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { Mat_GenericModule } from 'src/app/shared/material/mat-generic.module';
import { RouterModule } from '@angular/router';
import { ResolvePageNamePipe } from './pipes/resolve-page-name.pipe';
import { ReturnValueCardPipe } from './pipes/return-value-card.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    ResolvePageNamePipe,
    ReturnValueCardPipe,
  ],
  imports: [
    Mat_GenericModule,
    MatCardModule,
    RouterModule
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
