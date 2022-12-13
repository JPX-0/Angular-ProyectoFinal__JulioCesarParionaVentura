import { NgModule } from '@angular/core';

import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';

const modules = [
  LayoutsModule,
  PagesModule
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class CoreModule { }
