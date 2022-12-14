import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/core/services/db/courses.service';
import { ToSend_course } from 'src/app/shared/models/db/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent implements OnInit {

  courseForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required]],
    teacher: ["", [Validators.required]],
    timeStart: ["", [Validators.required]],
    timeEnd: ["", [Validators.required]],
    days: ["", [Validators.required]]
  });
  dateForm: FormGroup = this.formBuilder.group({
    start: ["", [Validators.required]],
    end: ["", [Validators.required]],
  });

  _dbPut!: Subscription;
  _dbGetAll!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private dbService: CoursesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  addCourse(): void {
    const dtoCourse: ToSend_course = {
      name: this.courseForm.get("name")?.value,
      teacher: this.courseForm.get("teacher")?.value,
      date: { 
        start: this.dateForm.get("start")?.value,
        end: this.dateForm.get("end")?.value,
      },
      time: { 
        start: this.courseForm.get("timeStart")?.value,
        end: this.courseForm.get("timeEnd")?.value
      },
      days: this.courseForm.get("days")?.value,
    }
    this._dbPut = this.dbService.post(dtoCourse).subscribe({
      error: ({ error }) => console.error("error: ", error),
      next: ({ error, response }) => {
        if(error) console.error("next: ", response);
        this._dbGetAll = this.dbService.getAll().subscribe({
          next: ({ error, response }) => {
            if(error) console.error("next: ", response);
            this.dbService.reloadCourse(response);
          },
          complete: () => {
            this.dialog.closeAll();
            this.courseForm.reset();
            this.dateForm.reset();
            this._dbGetAll?.unsubscribe();
            this._dbPut?.unsubscribe();
          }
        })
      }
    })
  }

  when_error(ref: string, validator: string): ValidationErrors | null {
    return this.courseForm.controls?.[ref].errors?.[validator];
  }

}
