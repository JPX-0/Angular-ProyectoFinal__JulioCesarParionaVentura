import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "", loadChildren: () => import("./features/auth/auth-routing.module").then(e => e.AuthRoutingModule) },
  { 
    path: "courses", 
    loadChildren: () => import("./features/courses/courses-routing.module").then(e => e.CoursesRoutingModule),
    canActivate: [AuthGuard]
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
