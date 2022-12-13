import { Pipe, PipeTransform } from '@angular/core';
import { actionType } from 'src/app/shared/models/db/commission.model';

@Pipe({
  name: 'resolvePageName'
})
export class ResolvePageNamePipe implements PipeTransform {

  transform(query: actionType): string {
    if(query == "without-starting") return "Por cursar";
    else if(query == "finalized") return "Cursados";
    else return "Cursando";
  }

}
