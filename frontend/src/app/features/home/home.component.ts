import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { CoursesService } from 'src/app/core/services/db/courses.service';
import { UserService } from 'src/app/core/services/db/user.service';
import { RouterService } from 'src/app/core/services/tools/router.service';
import { actionType, CommissionSpecial } from 'src/app/shared/models/db/commission.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  myCourses$!: BehaviorSubject <CommissionSpecial[]>;

  _dbUser!: Subscription;
  _dbCourse!: Subscription;

  constructor(
    public route: ActivatedRoute,
    private routerService: RouterService,
    private router: Router,
    private dbUserservice: UserService,
    private dbCourseservice: CoursesService,
  ) {
    this.myCourses$ = new BehaviorSubject<CommissionSpecial[]>([]);
  }

  ngOnInit(): void {
    this.routerService.pushCurrentPage(this.routerService.getCurrentPage());
    this._dbUser = this.dbUserservice.getUserId().subscribe(idUser => {
      this._dbCourse = this.dbCourseservice.getMyCourses(idUser).subscribe({
        error: ({ error }) => console.error("error: ", error),
        next: ({ error, response }) => {
          if(error) return console.error("next: ", response);
          this.myCourses$.next(response);
        },
        complete: () => this._dbCourse.unsubscribe()
      })
    })
    
  }

  getRole(): Observable<{ isAdmin: boolean, isAuth: boolean }> {
    return this.dbUserservice.getUserRole();
  }

  renderCards(query: actionType): any {
    if(!(query == "without-starting" || query == "finalized" || query == "studying")) return this.router.navigate([""]);
    return this.myCourses$.pipe(map(e => e.filter(course => course.action == query)));
  }

  ngOnDestroy(): void {
    this._dbUser?.unsubscribe();
  }

}
