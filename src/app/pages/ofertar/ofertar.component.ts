import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { OfertaService } from '../../oferta.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-ofertar',
  templateUrl: './ofertar.component.html',
  styleUrls: ['./ofertar.component.scss']
})
export class OfertarComponent implements OnInit {

  id = '';
  ofertarForm: FormGroup = new FormGroup({
    idUser: new FormControl(null),
    empresa: new FormControl(null, Validators.required),
    puesto: new FormControl(null, Validators.required),
    salario: new FormControl(null, Validators.required)
  });
  constructor(private router: Router, private ofertaService: OfertaService, private user: UserService) {
    this.user.user()
    .subscribe(
      data => this.getId(data),
      error => this.router.navigate(['/home'])
    );
  }

  getId(data) {
    this.id = data._id;
  }

  ngOnInit() {
  }

  ofertar() {
    if (!this.ofertarForm.valid) {
      console.log('Invalid Form'); return;
    }
    this.ofertarForm.patchValue({idUser: this.id});

    this.ofertaService.ofertar(JSON.stringify(this.ofertarForm.value))
    .subscribe(
      data => {console.log(data); this.router.navigate(['/home']); },
      error => console.error(error)
    );
  }
}
