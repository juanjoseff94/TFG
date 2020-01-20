import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGeneral'
})
export class FilterGeneralPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();
    return items.filter( it => {
      // console.log(it);
      if (it.puestoActual.toLowerCase().includes(searchText)) {
        return it.puestoActual.toLowerCase().includes(searchText);
      } else if (it.skills) {
        return it.skills.toLowerCase().includes(searchText);
      }
      return it.puesto.toLowerCase().includes(searchText);
    });
   }

}
