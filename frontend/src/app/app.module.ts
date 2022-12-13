import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HandleMenuService } from './core/services/tools/handle-menu.service';
import { AuthModule } from './features/auth/auth.module';
import { RouterService } from './core/services/tools/router.service';
import { CoursesModule } from './features/courses/courses.module';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from './state/app.state';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    CoursesModule,
    AuthModule,
    BrowserAnimationsModule,
    // StoreModule.forRoot(ROOT_REDUCERS)
  ],
  providers: [ 
    HandleMenuService, 
    RouterService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
