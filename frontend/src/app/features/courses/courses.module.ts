import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './components/www/courses.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { Mat_GenericModule } from 'src/app/shared/material/mat-generic.module';
import { ResolveCourseDatePipe } from './pipes/resolve-course-date.pipe';
import { EditCommissionComponent } from './components/edit-commission/edit-commission.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { Mat_FormsModule } from 'src/app/shared/material/mat-forms.module';


@NgModule({
  declarations: [
    CoursesComponent,
    InscriptionComponent,
    ResolveCourseDatePipe,
    EditCommissionComponent,
    AddCourseComponent
  ],
  imports: [
    Mat_GenericModule,
    Mat_FormsModule,
    MatCardModule,
    MatDialogModule,
    CoursesRoutingModule
  ],
  entryComponents: [ InscriptionComponent ],
  exports: [ CoursesComponent ]
})
export class CoursesModule { }
