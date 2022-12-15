import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CoursesService } from 'src/app/core/services/db/courses.service';
import { UserService } from 'src/app/core/services/db/user.service';
import { ToReceive_commission, UpdateCommission } from 'src/app/shared/models/db/commission.model';
import { ToReceive_course } from 'src/app/shared/models/db/course.model';
import { ToReceive_user, userRoleType } from 'src/app/shared/models/db/user.model';

@Component({
  selector: 'app-edit-commission',
  templateUrl: './edit-commission.component.html',
  styleUrls: ['./edit-commission.component.sass']
})
export class EditCommissionComponent implements OnInit {

  groupForm: FormControl = new FormControl("", [Validators.required]);
  inscriptionForm = this.formBuilder.group({
    tutor: ["", [Validators.required]],
    student: ["", [Validators.required]],
  });

  ref: ToReceive_commission = { 
    _id: "", 
    name: "", 
    teacher: "", 
    groups: [],
    date: { start: new Date(), end: new Date() },
    time: { start: "", end: "" },
    days: ""
  }
  tabSelected: number = 0;
  idCommission: string | null = null;
  editCommissionSelected?: "add" | "remove";

  courseSelected$: Observable<ToReceive_commission[]> = this.dbCourseService.getCourse().pipe(map(e => {
    return e.find(course => course._id == this.idCourse)?.commissions || [];
  }));

  constructor(
    @Inject(MAT_DIALOG_DATA) public idCourse: string,
    private formBuilder: FormBuilder,
    private dbCourseService: CoursesService,
    private dbStudentService: UserService,
  ) {}

  ngOnInit(): void {}

  commissionSelected(): Observable<ToReceive_commission | undefined> {
    return this.courseSelected$.pipe(map(e => {
      if(this.idCommission) return e.find(e => e._id == this.idCommission);
      else return this.ref;
    }));
  }
  getTutors(): Observable<string[] | undefined> {
    return this.commissionSelected().pipe(map(commission => {
      return commission?.groups.map(e => e.tutor)
    }));
  }
  getStudents(): Observable<{ value: string, view: string }[]> {
    return this.dbStudentService.getAll().pipe(map(({ error, response }) => {
      if(error) return []
      const users: ToReceive_user[] = response.filter(e => e.data.role == "user");
      console.log("getStudents: ", users);
      return users.map(e => ({ value: e._id , view: `${ e.info.firstName} ${ e.info.lastName}` }))
    }))
  }

  edit(type: "editCommission" | "addGroup" | "editInscriptions", idCommission: string): void {
    if(type == "editCommission") this.tabSelected = 1;
    else if(type == "addGroup") this.tabSelected = 2;
    else if(type == "editInscriptions") this.tabSelected = 3;
    this.idCommission = idCommission;
    // this.commissionSelected$.next(commission);
  }
  cancelEdit(): void {
    this.tabSelected = 0;
    this.groupForm.reset();
  }

  addGroup(): void {
    this.dbCourseService.put(this.idCommission!, { _addGroup: this.groupForm.value }).subscribe({
      error: ({ error }) => {
        if(error.response.details == "This tutor was already assigned to another group")
          return this.groupForm.setErrors({ duplicate: true })
        console.error("error: ", error)
      },
      complete: () => {
        this.dbCourseService.getAll().subscribe(({ error, response }) => {
          if(error) return;
          this.dbCourseService.reloadCourse(response);
          this.cancelEdit();
        })
      }
    })
  }
  editInscriptions(): void {
    console.log("editInscriptions: ", this.editCommissionSelected);
    // this.dbCourseService.put(this.idCommission!, { _addGroup: this.inscriptionForm.value }).subscribe({
    //   error: ({ error }) => {
    //     if(error.response.details == "This tutor was already assigned to another group")
    //       return this.groupForm.setErrors({ duplicate: true })
    //     console.error("error: ", error)
    //   },
    //   complete: () => {
    //     this.dbCourseService.getAll().subscribe(({ error, response }) => {
    //       if(error) return;
    //       this.dbCourseService.reloadCourse(response);
    //       this.cancelEdit();
    //     })
    //   }
    // })
  }

  subscribeUser(): void {
    this.editCommissionSelected = "add";
  }
  unsubscribeUser(): void {
    this.editCommissionSelected = "remove";
  }

  when_error(validator: string): ValidationErrors | null {
    return this.groupForm.errors?.[validator];
  }

}
