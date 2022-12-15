import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/core/services/db/courses.service';
import { ToReceive_commission } from 'src/app/shared/models/db/commission.model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.sass']
})
export class InscriptionComponent implements OnInit {

  course!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private idCourse: any,
    private dbService: CoursesService
  ) { }

  ngOnInit(): void {
    this.dbService.getOne(this.idCourse, "course").subscribe({
      error: ({ error }) => console.error("error: ", error),
      next: ({ error, response }) => {
        if(error) return console.error("next: ", error)
        this.course = response;
      }
    })
  }

  inscription(idCommission: string): void {
    const asd = this.course.commissions.find((commission: ToReceive_commission) => commission._id == idCommission);
    console.log("inscription: ", asd);
  }

}
