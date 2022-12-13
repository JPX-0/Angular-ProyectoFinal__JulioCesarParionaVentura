import { NgModule } from '@angular/core';

import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';

const components = [
  ErrorComponent,
  NotFoundComponent
]

@NgModule({
  declarations: components,
  exports: components
})
export class PagesModule { }
