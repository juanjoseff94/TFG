import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/oferta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { CandidaturaService } from 'src/app/candidatura.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReferirService } from 'src/app/referir.service';

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
  validado: boolean;

  candidaturaForm: FormGroup = new FormGroup({
    idOferta: new FormControl(null),
    idEmpresa: new FormControl(null),
    idCandidato: new FormControl(null),
    nombreCandidato: new FormControl(null),
    idReferal: new FormControl(null),
    descripcion: new FormControl(null),
    empresa: new FormControl(null),
    puesto: new FormControl(null),
    salario: new FormControl(null),
    fechaFin: new FormControl(null),
    estado: new FormControl(null)
  });

  constructor(private ofertas: OfertaService, private router: Router, private user: UserService,
              private candidaturaServ: CandidaturaService, private referalService: ReferirService) {
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
    this.id = data.email;
    this.nombre = data.username;
    this.validado = false;
    if (data.role === 'usuario'  || data.role === 'admin') {
      this.validado = true;
  }
    if (!this.validado) {
      this.router.navigate(['/home']);
    }
  }

  apuntarse(id: any, idUser: any, idEmpresaOf: any, empresaOf: any, puestoOf: any, 
            salarioOf: any, fechaFinOf: any, descripcionOf: any) {
    if (window.confirm('¿Quieres inscribirte en esta oferta?')) {
      this.candidaturaForm.patchValue({idOferta: id});
      this.candidaturaForm.patchValue({idEmpresa: idEmpresaOf});
      this.candidaturaForm.patchValue({idCandidato: idUser});
      this.candidaturaForm.patchValue({nombreCandidato: this.nombre});
      this.candidaturaForm.patchValue({empresa: empresaOf});
      this.candidaturaForm.patchValue({descripcion: descripcionOf});
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

  referal(id: any, idUser: any, idEmpresaOf: any, empresaOf: any, puestoOf: any, 
          salarioOf: any, fechaFinOf: any, descripcionOf: any) {
    if (window.confirm('¿Quieres referir a un candidato para esta oferta?')) {
      this.candidaturaForm.patchValue({idOferta: id});
      this.candidaturaForm.patchValue({idEmpresa: idEmpresaOf});
      this.candidaturaForm.patchValue({idCandidato: this.idReferalOf});
      this.candidaturaForm.patchValue({nombreCandidato: this.nombre});
      this.candidaturaForm.patchValue({empresa: empresaOf});
      this.candidaturaForm.patchValue({puesto: puestoOf});
      this.candidaturaForm.patchValue({descripcion: descripcionOf});
      this.candidaturaForm.patchValue({salario: salarioOf});
      this.candidaturaForm.patchValue({fechaFin: fechaFinOf});
      this.candidaturaForm.patchValue({idReferal: idUser});
      this.candidaturaForm.patchValue({estado: this.estadoOf});

      this.referalService.referirCand(this.candidaturaForm);
      this.router.navigate(['cv-referals']);
    }
  }


  results(data) {
    this.datos = data;
  }

  ngOnInit() {
  }

}
