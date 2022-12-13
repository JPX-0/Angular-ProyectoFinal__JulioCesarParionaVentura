import { Pipe, PipeTransform } from '@angular/core';
import { slug } from 'src/app/shared/utils/getSlug.utils';

@Pipe({
  name: 'returnValueCard'
})
export class ReturnValueCardPipe implements PipeTransform {

  transform(data: any, returnValue: "boolean" | "lastData" | "firstData", transformRoute?: boolean): any {
    if(data.length == 0) return false;
    if(returnValue == "boolean") return true;
    const returnData = returnValue == "lastData" ? data[data.length -1] : data[0];
    if(transformRoute) return `${slug(returnData.name)}/${returnData._id}`;
    return returnData;
  }

}
