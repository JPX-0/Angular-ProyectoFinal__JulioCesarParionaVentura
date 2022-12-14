import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ToReceive_commission } from 'src/app/shared/models/db/commission.model';
import { ToReceive_course } from 'src/app/shared/models/db/course.model';

@Component({
  selector: 'app-edit-commission',
  templateUrl: './edit-commission.component.html',
  styleUrls: ['./edit-commission.component.sass']
})
export class EditCommissionComponent implements OnInit {

  tabSelected: number = 0;
  idSelected$!: BehaviorSubject<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public commissions: any,
  ) {
    this.idSelected$ = new BehaviorSubject<string>("");
  }

  ngOnInit(): void {
    console.log(this.commissions);
  }

  edit(type: "edit" | "addGroup" | "addStudent", commission?: ToReceive_commission[]): void {
    if(type == "edit") this.tabSelected = 1;
    else if(type == "addGroup") this.tabSelected = 2;
    else if(type == "addStudent") this.tabSelected = 3;
    // this.idSelected$.next(commission);
  }
  cancelEdit(): void {
    this.tabSelected = 0;
  }

}
