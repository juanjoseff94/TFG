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
    empresa: new FormControl(null),
    puesto: new FormControl(null),
    salario: new FormControl(null),
    fechaFin: new FormControl(null),
    estado: new FormControl(null)
  });

  datos: any[];
  validado: boolean;
  referal: string;

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

  elegirCandidato(idCand: any, nombreCand: any) {
    console.log(idCand);
    console.log(this.referal);
    this.referalCandForm.patchValue({idCandidato: idCand});
    this.referalCandForm.patchValue({nombreCandidato: nombreCand});
    // this.referalCandForm.patchValue({referalValue: this.referal});
    // console.log(this.referalCandForm);

    this.candidaturaServ.apuntarse(JSON.stringify(this.referalCandForm.value))
    .subscribe(
      data => {console.log(data); this.router.navigate(['/home']); },
      error => console.error(error)
    );
  }

  cvResults(data) {
    this.datos = data;
  }

  usuario(data) {
    this.referal = data.email;
    this.validado = false;
    if (data.role === 'usuario'  || data.role === 'admin') {
      this.validado = true;
  }
    if (!this.validado) {
      this.router.navigate(['/home']);
    }
  }

}
