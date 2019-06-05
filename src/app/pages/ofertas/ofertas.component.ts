import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/oferta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';

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
  datos: string[];
  ofertasListSub: Subscription;
  /*ofertasList: EventModel[];
  filteredOfertas: EventModel[];*/
  error: boolean;
  query: '';
  constructor(private ofertas: OfertaService, private router: Router, private user: UserService) {
    this.ofertas.ofertas()
    .subscribe(
      data => this.results(data),
      error => this.router.navigate(['/login'])
    );
    this.user.user()
    .subscribe(
      data => this.usuario(data),
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

  usuario(data) {
    this.id = data._id;
  }


  results(data) {
    this.datos = data;
    console.log(this.datos);
  }

  ngOnInit() {
  }

}
