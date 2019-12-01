import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'candidaturaFilter'
})



export class CandidaturaFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();
    // console.log(items);
    return items.filter( it => {
      // console.log(it);
      return it.idCandidato.toLowerCase().includes(searchText);
    });
   }

}
