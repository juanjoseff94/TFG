import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/oferta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { CandidaturaService } from 'src/app/candidatura.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ACTIVE_INDEX } from '@angular/core/src/render3/interfaces/container';

@Component({
  selector: 'app-candidaturas',
  templateUrl: './candidaturas.component.html',
  styleUrls: ['./candidaturas.component.scss']
})
export class CandidaturasComponent implements OnInit {


  id = '';
  nombre = '';
  datos: any[];
  query: '';
  idCandidato: '';
  test = '5cee7d6da72c1a38587e36b0';
  candidaturas: any[];

  candidaturaForm: FormGroup = new FormGroup({
    idOferta: new FormControl(null),
    idCandidato: new FormControl(null),
    nombreCandidato: new FormControl(null)
  });

  constructor(private ofertas: OfertaService, private router: Router, private user: UserService,
              private candidaturaServ: CandidaturaService) {


}


usuario(data) {
this.id = data._id;
this.nombre = data.username;
}
results(data) {
  // console.log(data.idCandidato);
  // console.log(this.id);
  this.datos = data;
}
  ngOnInit() {

this.user.user()
.subscribe(
data => this.usuario(data),
error => this.router.navigate(['/login'])
);

this.candidaturaServ.candidaturas()
.subscribe(
data => this.results(data),
error => this.router.navigate(['/login'])
);

  }

}
