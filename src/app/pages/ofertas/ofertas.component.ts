import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/oferta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { CandidaturaService } from 'src/app/candidatura.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  nombre = '';
  datos: any[];
  error: boolean;
  idReferalOf = '';
  estadoOf = 'Pendiente';

  candidaturaForm: FormGroup = new FormGroup({
    idOferta: new FormControl(null),
    idCandidato: new FormControl(null),
    nombreCandidato: new FormControl(null),
    idReferal: new FormControl(null),
    empresa: new FormControl(null),
    puesto: new FormControl(null),
    salario: new FormControl(null),
    fechaFin: new FormControl(null),
    estado: new FormControl(null)
  });

  constructor(private ofertas: OfertaService, private router: Router, private user: UserService,
              private candidaturaServ: CandidaturaService) {
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

  usuario(data) {
    this.id = data._id;
    this.nombre = data.username;
    // console.log(this.id);
    // console.log(this.nombre);
  }

  test(id: any, idUser: any, empresaOf: any, puestoOf: any, salarioOf: any, fechaFinOf: any) {
    if (window.confirm('¿Quieres inscribirte en esta oferta?')) {
      this.candidaturaForm.patchValue({idOferta: id});
      this.candidaturaForm.patchValue({idCandidato: idUser});
      this.candidaturaForm.patchValue({nombreCandidato: this.nombre});
      this.candidaturaForm.patchValue({empresa: empresaOf});
      this.candidaturaForm.patchValue({puesto: puestoOf});
      this.candidaturaForm.patchValue({salario: salarioOf});
      this.candidaturaForm.patchValue({fechaFin: fechaFinOf});
      this.candidaturaForm.patchValue({idReferal: this.idReferalOf});
      this.candidaturaForm.patchValue({estado: this.estadoOf});

      this.candidaturaServ.apuntarse(JSON.stringify(this.candidaturaForm.value))
    .subscribe(
      data => {console.log(data); this.router.navigate(['/home']); },
      error => console.error(error)
    );
    }
  }

  referal(id: any, idUser: any) {
      console.log(id);
      console.log(idUser);
  }


  results(data) {
    this.datos = data;
  }

  ngOnInit() {
  }

}
