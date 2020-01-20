import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPuesto'
})



export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();
    return items.filter( it => {
      // console.log(it);
      if (it.puestoActual) {
        return it.puestoActual.toLowerCase().includes(searchText);
      }
      return it.puesto.toLowerCase().includes(searchText);
    });
   }

}
