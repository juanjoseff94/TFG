import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/oferta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  empresa = '';
  id = '';
  puesto = '';
  salario = '';
  data: string[];
  ofertasListSub: Subscription;
  /*ofertasList: EventModel[];
  filteredOfertas: EventModel[];*/
  error: boolean;
  query: '';
  constructor(private ofertas: OfertaService, private router: Router) {
    this.ofertas.ofertas()
    .subscribe(
      data => this.results(data),
      error => this.router.navigate(['/login'])
    );
  }

 /* private _getOfertas() {
    // Get ofertas
    this.ofertasListSub = this.api
      .getEvents$()
      .subscribe(
        res => {
          this.ofertasList = res;
          this.filteredOfertas = res;
        },
        err => {
          console.error(err);
          this.error = true;
        }
      );
  }*/




  results(data) {
  }

  ngOnInit() {
  }

}
