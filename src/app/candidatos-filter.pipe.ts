import { Pipe, PipeTransform } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Pipe({
  name: 'candidatosFilter'
})
export class CandidatosFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, a: any): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();
    console.log(searchText);
    // console.log(items);
    return items.filter( it => {
      // console.log(it);
      a = it.idEmpresa.toLowerCase().includes(searchText);
      if (a) {
        return a;
      }

    });
   }

}
