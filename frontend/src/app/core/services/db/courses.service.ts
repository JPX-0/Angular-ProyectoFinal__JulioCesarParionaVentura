import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToReceive_course, ToSend_course } from 'src/app/shared/models/db/course.model';
import { ApiResponse_course, ApiResponse_courses, ApiResponse_myCourses } from 'src/app/shared/models/tools/apiRest.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: "root"
})
export class CoursesService {

  courses$!: BehaviorSubject<ToReceive_course[]>;

  constructor(
    private http: HttpClient,
  ) {
    this.courses$ = new BehaviorSubject<ToReceive_course[]>([]);
  }

  getAll(): Observable<ApiResponse_course> {
    return this.http.get<ApiResponse_course>(`${environment.api("course", "get")}`);
  }
  getOne(id: string, db: "course" | "commission"): Observable<ApiResponse_course> {
    return this.http.get<ApiResponse_course>(`${environment.api(db, "get", id)}`);
  }
  getMyCourses(id: string): Observable<ApiResponse_myCourses> {
    return this.http.get<ApiResponse_myCourses>(`${environment.api("commission", "get", `myCourses?idUser=${id}`)}`);
  }
  post(user: ToSend_course): Observable<ApiResponse_courses> {
    return this.http.post<ApiResponse_courses>(`${environment.api("course", "post")}`, user);
  }
  put(id: string, data: any): Observable<ApiResponse_courses> {
    return this.http.put<ApiResponse_courses>(`${environment.api("commission", "put", id)}`, data);
  }

  reloadCourse(course: ToReceive_course[]): void {
    this.courses$.next(course);
  }
  getCourse(): BehaviorSubject<ToReceive_course[]> {
    return this.courses$;
  }

}
