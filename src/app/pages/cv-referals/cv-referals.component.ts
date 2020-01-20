import { Component, OnInit } from '@angular/core';
import { ReferirService } from 'src/app/referir.service';
import { CandidaturaService } from '../../candidatura.service';
import { FormGroup, FormControl   } from '@angular/forms';
import { CvService } from '../../cv.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-cv-referals',
  templateUrl: './cv-referals.component.html',
  styleUrls: ['./cv-referals.component.scss']
})
export class CvReferalsComponent implements OnInit {

  referalCandForm: FormGroup = new FormGroup({
    idOferta: new FormControl(null),
    idEmpresa: new FormControl(null),
    idCandidato: new FormControl(null),
    nombreCandidato: new FormControl(null),
    idReferal: new FormControl(null),
    referalValue: new FormControl(null),
    descripcion: new FormControl(null),
    descripcionOf: new FormControl(null),
    empresa: new FormControl(null),
    puesto: new FormControl(null),
    puestoOf: new FormControl(null),
    salario: new FormControl(null),
    puestoActual: new FormControl(null),
    skills: new FormControl(null),
    experiencia: new FormControl(null),
    telefono: new FormControl(null),
    email: new FormControl(null),
    fechaFin: new FormControl(null),
    estado: new FormControl(null)
  });

  referalForm2: FormGroup = new FormGroup({
    email: new FormControl(null)
  });

  public experienciaList = {entryExp: false, juniorExp: false, seniorExp: false, expertExp: false };

  datos: any[];
  datosInc: any[];
  validado: boolean;
  referal: string;
  email = '';

  constructor(private referalServ: ReferirService, private candidaturaServ: CandidaturaService, private cvServ: CvService,
              private router: Router, private user: UserService) {

    this.cvServ.getCvs()
    .subscribe(
      data => this.cvResults(data),
      error => this.router.navigate(['/login'])
    );

    this.user.user()
    .subscribe(
      data => this.usuario(data),
      error => this.router.navigate(['/login'])
    );
  }

  ngOnInit() {
    this.referalCandForm = this.referalServ.referalForm;
    // console.log(this.referalCandForm);
  }

  filterChange() {
    this.datos = this.datos.filter(x =>
      (x.experiencia === 'entry' && this.experienciaList.entryExp)
      || (x.experiencia === 'junior' && this.experienciaList.juniorExp)
      || (x.experiencia === 'senior' && this.experienciaList.seniorExp)
      || (x.experiencia === 'expert' && this.experienciaList.expertExp)
      );
    if (this.datos.length === 0 && !this.experienciaList.entryExp && !this.experienciaList.juniorExp
      && !this.experienciaList.seniorExp && !this.experienciaList.expertExp) {
      this.datos = this.datosInc;
    }
  }

  elegirCandidato(idCand: any, nombreCand: any, emailCand: any, telefonoCand: any, descripcionCand: any,
                  experienciaCand: any, skillsCand: any, puestoActual: any) {
    console.log(nombreCand);
    this.referalCandForm.patchValue({idCandidato: idCand});
    this.referalCandForm.patchValue({nombreCandidato: nombreCand});
    this.referalCandForm.patchValue({email: emailCand});
    this.referalCandForm.patchValue({telefono: telefonoCand});
    this.referalCandForm.patchValue({descripcion: descripcionCand});
    this.referalCandForm.patchValue({experiencia: experienciaCand});
    this.referalCandForm.patchValue({skills: skillsCand});
    this.referalCandForm.patchValue({puesto: puestoActual});


    this.referalForm2.patchValue({email: this.email});
    this.user.contadorReferal(JSON.stringify(this.referalForm2.value))
    .subscribe(
      data => {console.log(data); /*window.location.reload();*/ },
      error => console.error(error)
    );

    this.candidaturaServ.apuntarse(JSON.stringify(this.referalCandForm.value))
    .subscribe(
      data => {console.log(data); },
      error => console.error(error)
    );
  }

  cvResults(data) {
    this.datos = data;
    this.datosInc = data;
  }

  usuario(data) {
    this.referal = data.email;
    this.email = data.email;
    this.validado = false;
    if (data.role === 'usuario'  || data.role === 'admin') {
      this.validado = true;
  }
    if (!this.validado) {
      this.router.navigate(['/home']);
    }
  }

}
