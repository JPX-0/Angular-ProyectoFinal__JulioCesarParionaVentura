import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToReceive_courses, ToSend_course } from 'src/app/shared/models/db/course.model';
import { ApiResponse_course, ApiResponse_courses, ApiResponse_myCourses } from 'src/app/shared/models/tools/apiRest.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class CoursesService {

  courses$!: BehaviorSubject<ToReceive_courses>

  constructor(
    private http: HttpClient,
  ) {
    this.courses$ = new BehaviorSubject<ToReceive_courses>([]);
  }

  getAll(): Observable<ApiResponse_courses> {
    return this.http.get<ApiResponse_courses>(`${environment.api("course", "get")}`);
    // .pipe(throwError(error => "a"),map(({ error, response }) => !error && response));
  }
  getOne(id: string): Observable<ApiResponse_course> {
    return this.http.get<ApiResponse_course>(`${environment.api("course", "get", id)}`);
  }
  getMyCourses(id: string): Observable<ApiResponse_myCourses> {
    return this.http.get<ApiResponse_myCourses>(`${environment.api("commission", "get", `myCourses?idUser=${id}`)}`);
  }
  post(user: ToSend_course): Observable<ApiResponse_course> {
    return this.http.post<ApiResponse_course>(`${environment.api("course", "post")}`, user);
  }

  reloadCourse(course: ToReceive_courses): void {
    console.log(course)
    this.courses$.next(course);
  }
  getCourse(): Observable<ToReceive_courses> {
    return this.courses$;
  }

}
