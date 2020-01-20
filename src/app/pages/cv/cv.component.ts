import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../../user.service';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  id = '';
  username = '';
  validado: boolean;
  ofertarForm: FormGroup = new FormGroup({
    idUser: new FormControl(null),
    nombre: new FormControl(null, Validators.required),
    telContacto: new FormControl(null, Validators.required),
    puestoActual: new FormControl(null, Validators.required),
    descripcion: new FormControl(null, Validators.required),
    skills: new FormControl(null, Validators.required),
    experiencia: new FormControl(null, Validators.required),
    email: new FormControl(null)
  });

  experiencia = [
    {id: 1, name: 'entry'},
    {id: 2, name: 'junior'},
    {id: 3, name: 'senior'},
    {id: 4, name: 'expert'}
  ];

  constructor(private router: Router, private cvService: CvService, private user: UserService) {
    this.user.user()
    .subscribe(
      data => this.getId(data),
      error => this.router.navigate(['/home'])
    );
  }

  getId(data) {
    this.id = data._id;
    this.username = data.email;
    this.validado = false;
    if (data.role === 'usuario'  || data.role === 'admin') {
      this.validado = true;
  }
    if (!this.validado) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  cv() {
    if (!this.ofertarForm.valid) {
      console.log('Invalid Form'); return;
    }
    this.ofertarForm.patchValue({idUser: this.id});
    this.ofertarForm.patchValue({email: this.username});

    this.cvService.cv(JSON.stringify(this.ofertarForm.value))
    .subscribe(
      data => {console.log(data); this.router.navigate(['/home']); },
      error => console.error(error)
    );
  }
}
