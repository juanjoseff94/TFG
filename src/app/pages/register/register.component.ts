import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    referalValue: new FormControl(null),
    referalCount: new FormControl(null),
    referalsAceptados: new FormControl(null),
    cpass: new FormControl(null, Validators.required)
  });

  roles = [
    {id: 1, name: 'usuario'},
    {id: 2, name: 'empresa'}
  ];
  selectedValue = null;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  moveToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (!this.registerForm.valid || (this.registerForm.controls.password.value !== this.registerForm.controls.cpass.value)) {
      console.log('Invalid Form'); return;
    }
    this.registerForm.patchValue({referalValue: 0});
    this.registerForm.patchValue({referalCount: 0});
    this.registerForm.patchValue({referalsAceptados: 0});
    this.userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data => {console.log(data); this.router.navigate(['/login']); },
      error => console.error(error)
    );
  }
}

