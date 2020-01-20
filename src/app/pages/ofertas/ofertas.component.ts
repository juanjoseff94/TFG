import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/oferta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { CandidaturaService } from 'src/app/candidatura.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReferirService } from 'src/app/referir.service';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {


  // Variables
  empresa = '';
  id = '';
  idCandidato = '';
  salario = '';
  nombre = '';
  referalVal: any;
  datos: any[];
  cvs: any[];
  error: boolean;
  idReferalOf = '';
  estadoOf = 'Pendiente';
  validado: boolean;
  puestoActual = '';
  descripcion = '';
  skills = '';
  experiencia = '';
  telefono = '';
  email = '';


  candidaturaForm: FormGroup = new FormGroup({
    idOferta: new FormControl(null),
    idEmpresa: new FormControl(null),
    idCandidato: new FormControl(null),
    nombreCandidato: new FormControl(null),
    idReferal: new FormControl(null),
    descripcion: new FormControl(null),
    descripcionOf: new FormControl(null),
    empresa: new FormControl(null),
    puesto: new FormControl(null),
    salario: new FormControl(null),
    fechaFin: new FormControl(null),
    estado: new FormControl(null),
    puestoOf: new FormControl(null),
    skills: new FormControl(null),
    experiencia: new FormControl(null),
    telefono: new FormControl(null),
    referalValue: new FormControl(null),
    email: new FormControl(null)
  });

  cvForm: FormGroup = new FormGroup({
    idUser: new FormControl(null)
  });

  constructor(private ofertas: OfertaService, private router: Router, private user: UserService,
              private candidaturaServ: CandidaturaService, private referalService: ReferirService,
              private cv: CvService) {
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
    console.log(data);
    this.idCandidato = data._id;
    this.referalVal = data.referalValue;
    console.log(this.idCandidato);
    this.id = data.email;
    this.validado = false;
    if (data.role === 'usuario'  || data.role === 'admin') {
      this.validado = true;
  }
    if (!this.validado) {
      this.router.navigate(['/home']);
    }
  }

  getCv(data, id: any, idUser: any, idEmpresaOf: any, empresaOf: any, puestoOferta: any,
        salarioOf: any, fechaFinOf: any, descripcionOferta: any) {
    this.cvs = data;
    this.cvs = Object.values(this.cvs);

    this.cvForm.patchValue({idUser: this.cvs[0].idUser});
    this.nombre = this.cvs[0].nombre;
    this.puestoActual = this.cvs[0].puestoActual;
    this.descripcion = this.cvs[0].descripcion;
    this.skills = this.cvs[0].skills;
    this.experiencia = this.cvs[0].experiencia;
    this.telefono = this.cvs[0].telefono;
    this.email = this.cvs[0].email;

    this.enviarCandidatura(id, idUser, idEmpresaOf, empresaOf, puestoOferta,
      salarioOf, fechaFinOf, descripcionOferta);

  }

  apuntarse(id: any, idUser: any, idEmpresaOf: any, empresaOf: any, puestoOferta: any,
            salarioOf: any, fechaFinOf: any, descripcionOferta: any) {

    this.cvForm.patchValue({idUser: this.idCandidato});
    this.cv.findCv(JSON.stringify(this.cvForm.value))
    .subscribe(
      data => {console.log(data); this.getCv(data, id, idUser, idEmpresaOf, empresaOf, puestoOferta,
        salarioOf, fechaFinOf, descripcionOferta); },
      error => console.error(error)
    );

  }

  referal(id: any, idUser: any, idEmpresaOf: any, empresaOf: any, puestoOferta: any,
          salarioOf: any, fechaFinOf: any, descripcionOferta: any) {
    if (window.confirm('¿Quieres referir a un candidato para esta oferta?')) {
      this.candidaturaForm.patchValue({idOferta: id});
      this.candidaturaForm.patchValue({idEmpresa: idEmpresaOf});
      this.candidaturaForm.patchValue({idCandidato: this.idReferalOf});
      this.candidaturaForm.patchValue({nombreCandidato: this.nombre});
      this.candidaturaForm.patchValue({empresa: empresaOf});
      this.candidaturaForm.patchValue({puestoOf: puestoOferta});
      this.candidaturaForm.patchValue({descripcionOf: descripcionOferta});
      this.candidaturaForm.patchValue({salario: salarioOf});
      this.candidaturaForm.patchValue({fechaFin: fechaFinOf});
      this.candidaturaForm.patchValue({idReferal: idUser});
      this.candidaturaForm.patchValue({experiencia: this.experiencia});
      this.candidaturaForm.patchValue({estado: this.estadoOf});
      this.candidaturaForm.patchValue({referalValue: this.referalVal});
      this.referalService.referirCand(this.candidaturaForm);
      this.router.navigate(['cv-referals']);
    }
  }

  enviarCandidatura(id: any, idUser: any, idEmpresaOf: any, empresaOf: any, puestoOferta: any,
                    salarioOf: any, fechaFinOf: any, descripcionOferta: any) {

      if (window.confirm('¿Quieres inscribirte en esta oferta?')) {
        this.candidaturaForm.patchValue({idOferta: id});
        this.candidaturaForm.patchValue({idEmpresa: idEmpresaOf});
        this.candidaturaForm.patchValue({idCandidato: idUser});
        this.candidaturaForm.patchValue({nombreCandidato: this.nombre});
        this.candidaturaForm.patchValue({empresa: empresaOf});
        this.candidaturaForm.patchValue({descripcionOf: descripcionOferta});
        this.candidaturaForm.patchValue({descripcion: this.descripcion});
        this.candidaturaForm.patchValue({puesto: this.puestoActual});
        this.candidaturaForm.patchValue({salario: salarioOf});
        this.candidaturaForm.patchValue({fechaFin: fechaFinOf});
        this.candidaturaForm.patchValue({idReferal: this.idReferalOf});
        this.candidaturaForm.patchValue({estado: this.estadoOf});
        this.candidaturaForm.patchValue({puestoOf: puestoOferta});
        this.candidaturaForm.patchValue({experiencia: this.experiencia});
        this.candidaturaForm.patchValue({telefono: this.telefono});
        this.candidaturaForm.patchValue({email: this.email});
        this.candidaturaForm.patchValue({skills: this.skills});

        this.candidaturaServ.apuntarse(JSON.stringify(this.candidaturaForm.value))
      .subscribe(
        data => {console.log(data); this.router.navigate(['/home']); },
        error => console.error(error)
      );
      }

  }


  results(data) {
    this.datos = data;
    // console.log(this.datos);
  }

  ngOnInit() {
  }

}
