import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienciaFilter'
})
export class ExperienciaFilterPipe implements PipeTransform {

  transform(items: any[], experienciaList: string): any[] {
    console.log(experienciaList);
    if (!items) { return []; }
    if (!experienciaList) { return items; }

    experienciaList = experienciaList.toLowerCase();
    // console.log(items);
    return items.filter( it => {
      // console.log(it);
      return it.experiencia.toLowerCase().includes(experienciaList);
    });
   }

}
