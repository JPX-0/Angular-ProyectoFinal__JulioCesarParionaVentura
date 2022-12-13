import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subscription, BehaviorSubject } from 'rxjs';
import { ToSend_user, UserData, UserInfo, ToReceive_user, userRoleType } from 'src/app/shared/models/db/user.model';
import { ApiResponse_default, ApiResponse_user, ApiResponse_users } from 'src/app/shared/models/tools/apiRest.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class UserService {

  ID_ACCOUNT = localStorage.getItem("ID_ACCOUNT");
  user$!: BehaviorSubject<ToReceive_user | null>

  constructor(
    private http: HttpClient,
  ) {
    this.user$ = new BehaviorSubject<ToReceive_user | null>(null);
    if(this.ID_ACCOUNT) this.getOne(this.ID_ACCOUNT).subscribe({
      error: ({ error }) => console.error("error: ", error),
      next: ({ error, response }) => {
        if(error) console.error("next: ", response);
        this.user$.next(response);
      }
    })
  }

  getAll(): Observable<ApiResponse_users> {
    return this.http.get<ApiResponse_users>(`${environment.api("user", "get")}`)
    // .pipe(throwError(error => "a"),map(({ error, response }) => !error && response));
  }
  getOne(id: string): Observable<ApiResponse_user> {
    return this.http.get<ApiResponse_user>(`${environment.api("user", "get", id)}`)
  }
  post(user: ToSend_user): Observable<ApiResponse_user> {
    return this.http.post<ApiResponse_user>(`${environment.api("user", "post")}`, user)
  }
  put(id: string, user: UserInfo): Observable<ApiResponse_default> {
    return this.http.put<ApiResponse_default>(`${environment.api("user", "put", id)}`, user)
  }

  login({ email, password }: UserData): Observable<ApiResponse_user> {
    return this.getOne(`login?email=${email}&password=${password}`).pipe(map(data => {
      if(!data.error) localStorage.setItem("ID_ACCOUNT", data.response._id);
      return data;
    }));
  }
  signup(user: ToSend_user): Observable<ApiResponse_user> {
    return this.post(user).pipe(map(data => {
      if(!data.error) localStorage.setItem("ID_ACCOUNT", data.response._id);
      return data;
    }));
  }
  logout(): void {
    localStorage.removeItem("ID_ACCOUNT");
    this.reloadUser(null);
  }

  reloadUser(user: ToReceive_user | null): void {
    this.user$.next(user);
  }

  getUserId(): Observable<string> {
    return this.user$.pipe(map(e => e?.data.role!));
  }
  getUserInfo(): Observable<UserInfo> {
    return this.user$.pipe(map(e => e?.info!));
  }
  getUserRole(): Observable<{ isAdmin: boolean, isAuth: boolean }> {
    return this.user$.pipe(map(user => {
      if(user?.data?.role == "admin") return { isAdmin: true, isAuth: false };
      else if(user?.data?.role == "user" || user?.data?.role == "student") return { isAdmin: false, isAuth: true };
      else return { isAdmin: false, isAuth: false };
    }));
  }

}
