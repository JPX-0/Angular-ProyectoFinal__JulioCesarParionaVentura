import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Mat_GenericModule } from 'src/app/shared/material/mat-generic.module';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './header/menu/menu.component';
import { ToolbarComponent } from './header/toolbar/toolbar.component';

const components = [
  FooterComponent,
  MenuComponent,
  ToolbarComponent
]

@NgModule({
  declarations: components,
  imports: [
    Mat_GenericModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: components
})
export class LayoutsModule { }
