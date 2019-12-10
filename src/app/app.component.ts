import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-tfg';
  rol = '';
  emp: boolean;
  usu: boolean;
  logged = true;
  adm: boolean;


  constructor(private user: UserService, private router: Router) {
    this.user.user()
    .subscribe(
      data => this.usuario(data),
      error => this.router.navigate(['/login'])
    );
  }

  usuario(data) {
    this.rol = data.role;
    if (this.rol === 'empresa') {
      this.emp = true;
      this.logged = false;
    } else if (this.rol === 'usuario') {
      this.usu = true;
      this.logged = false;
    } else if (this.rol === 'admin') {
      this.adm = true;
    }
  }
}
