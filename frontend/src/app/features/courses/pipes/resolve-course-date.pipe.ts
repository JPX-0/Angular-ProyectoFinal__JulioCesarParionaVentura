import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolveCourseDate'
})
export class ResolveCourseDatePipe implements PipeTransform {

  transform({ start, end }: any): string {
    return `${new Date(start).toLocaleDateString()} al ${new Date(end).toLocaleDateString()}`;
  }

}
