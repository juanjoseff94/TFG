import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/oferta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { CandidaturaService } from 'src/app/candidatura.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ACTIVE_INDEX } from '@angular/core/src/render3/interfaces/container';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  id = '';
  nombre = '';
  datos: any[];
  query: '';
  idCandidato: '';
  test = '5cee7d6da72c1a38587e36b0';
  candidaturas: any[];
  estado = 'pendiente';
  validado: boolean;
  email = 'admin@admin.com';

  candidaturaForm: FormGroup = new FormGroup({
    idOferta: new FormControl(null),
    idCandidato: new FormControl(null),
    estado: new FormControl(null)
  });

  referalForm: FormGroup = new FormGroup({
    referalValue: new FormControl(null)
  });

  constructor(private ofertas: OfertaService, private router: Router, private user: UserService,
              private candidaturaServ: CandidaturaService) {


}


usuario(data) {
this.id = data._id;
this.nombre = data.username;
this.validado = false;
if (data.role === 'empresa'  || data.role === 'admin') {
  this.validado = true;
}
if (!this.validado) {
  this.router.navigate(['/home']);
}
}
results(data) {
  // console.log(data.idCandidato);
  // console.log(this.id);
  this.datos = data;
}

aceptar(idO, idC, idRef) {
  if (idRef) {
    console.log(idRef);
    idRef = 'email@email.com';
    this.referalForm.patchValue({referalValue: this.email});
    this.user.valorarReferal(JSON.stringify(this.referalForm.value))
    .subscribe(
      data => {console.log(data); /*window.location.reload();*/ },
      error => console.error(error)
    );
  }
  this.estado = 'Aceptado';
  this.candidaturaForm.patchValue({idOferta: idO});
  this.candidaturaForm.patchValue({idCandidato: idC});
  this.candidaturaForm.patchValue({estado: this.estado});
  this.candidaturaServ.aceptarCandidaturas(JSON.stringify(this.candidaturaForm.value))
    .subscribe(
      data => {console.log(data); /*window.location.reload();*/ },
      error => console.error(error)
    );
}

rechazar(idO, idC) {
  console.log(idO);
  this.estado = 'Rechazado';
  this.candidaturaForm.patchValue({idOferta: idO});
  this.candidaturaForm.patchValue({idCandidato: idC});
  this.candidaturaForm.patchValue({estado: this.estado});
  this.candidaturaServ.aceptarCandidaturas(JSON.stringify(this.candidaturaForm.value))
    .subscribe(
      data => {console.log(data); window.location.reload(); },
      error => console.error(error)
    );
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
