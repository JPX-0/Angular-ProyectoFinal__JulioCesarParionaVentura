import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  CommonModule,
  MatButtonModule,
  MatIconModule,
  MatNativeDateModule,
  MatTooltipModule
]

@NgModule({
  imports: modules,
  exports: modules,
})
export class Mat_GenericModule { }
