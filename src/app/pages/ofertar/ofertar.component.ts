import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { OfertaService } from '../../oferta.service';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ofertar',
  templateUrl: './ofertar.component.html',
  styleUrls: ['./ofertar.component.scss']
})
export class OfertarComponent implements OnInit {

  id = '';
  fec: any;
  fecha: any = new Date();
  validado: boolean;
  ofertarForm: FormGroup = new FormGroup({
    idUser: new FormControl(null),
    empresa: new FormControl(null, Validators.required),
    puesto: new FormControl(null, Validators.required),
    salario: new FormControl(null, Validators.required),
    fechaFin: new FormControl(null, Validators.required)
  });
  constructor(private router: Router, private ofertaService: OfertaService, private user: UserService, private datePipe: DatePipe) {
    this.user.user()
    .subscribe(
      data => this.getId(data),
      error => this.router.navigate(['/home'])
    );
  }

  getId(data) {
    this.id = data._id;
    this.validado = false;
    if (data.role === 'empresa'  || data.role === 'admin') {
      this.validado = true;
  }
    if (!this.validado) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  ofertar() {
    if (!this.ofertarForm.valid) {
      console.log('Invalid Form'); return;
    }
    this.ofertarForm.patchValue({idUser: this.id});
    this.fecha = this.datePipe.transform(this.fec, 'yyyy-MM-dd');
    this.ofertarForm.patchValue({fechaFin: this.fecha});

    this.ofertaService.ofertar(JSON.stringify(this.ofertarForm.value))
    .subscribe(
      data => {console.log(data); this.router.navigate(['/home']); },
      error => console.error(error)
    );
  }
}
