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
  ofertarForm: FormGroup = new FormGroup({
    idUser: new FormControl(null),
    nombre: new FormControl(null, Validators.required),
    puestoActual: new FormControl(null, Validators.required),
    skills: new FormControl(null, Validators.required),
    experiencia: new FormControl(null, Validators.required)
  });
  constructor(private router: Router, private cvService: CvService, private user: UserService) {
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

  cv() {
    if (!this.ofertarForm.valid) {
      console.log('Invalid Form'); return;
    }
    this.ofertarForm.patchValue({idUser: this.id});

    this.cvService.cv(JSON.stringify(this.ofertarForm.value))
    .subscribe(
      data => {console.log(data); this.router.navigate(['/home']); },
      error => console.error(error)
    );
  }
}
