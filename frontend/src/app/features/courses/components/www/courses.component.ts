import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CoursesService } from 'src/app/core/services/db/courses.service';
import { UserService } from 'src/app/core/services/db/user.service';
import { RouterService } from 'src/app/core/services/tools/router.service';
import { ToReceive_commission } from 'src/app/shared/models/db/commission.model';
import { ToReceive_course, ToReceive_courses } from 'src/app/shared/models/db/course.model';
import { AddCourseComponent } from '../add-course/add-course.component';
import { EditCommissionComponent } from '../edit-commission/edit-commission.component';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses$: Observable<ToReceive_course[]> = this.dbCourseService.getCourse();
  commissions$!: BehaviorSubject<ToReceive_commission[]>;
  // courses$!: BehaviorSubject <CommissionSpecial[]>;

  _db!: Subscription;

  constructor(
    private routerService: RouterService,
    public dialog: MatDialog,
    private dbCourseService: CoursesService,
    private dbUserService: UserService,
  ) {
    this.commissions$ = new BehaviorSubject<ToReceive_commission[]>([]);
  }

  ngOnInit(): void {
    this.routerService.pushCurrentPage(this.routerService.getCurrentPage());
    this._db = this.dbCourseService.getAll().subscribe(({ error, response }) => {
      if(error) return console.error("next: ", response);
      this.dbCourseService.reloadCourse(response);
    })
  }

  openDialog_inscription(data: any): void {
    this.dialog.open(InscriptionComponent, { data });
  }
  openDialog_addCourse(): void {
    this.dialog.open(AddCourseComponent);
  }
  openDialog_editCommission(data: any): void {
    const styles: MatDialogConfig<any>  = { height: "100%", maxHeight: "50rem", width: "100%", maxWidth: "50rem" }
    this.dialog.open(EditCommissionComponent, { data, ...styles });
  }

  getRole(): Observable<{ isAdmin: boolean, isAuth: boolean }> {
    return this.dbUserService.getUserRole()
  }

  ngOnDestroy(): void {
    this._db?.unsubscribe();
  }

}
