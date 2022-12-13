import { Injectable } from '@angular/core';

@Injectable()
export class HandleMenuService {

  activateMenu: boolean = false;

  get(): boolean {
    return this.activateMenu;
  }

  toggle():void {
    this.activateMenu = !this.activateMenu
  }

}
