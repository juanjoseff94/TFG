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
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required)
  });
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

    this.userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data => {console.log(data); this.router.navigate(['/login']); },
      error => console.error(error)
    );
  }
}

