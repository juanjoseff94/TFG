import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username = '';
  ids = '';
  constructor(private user: UserService, private router: Router) {
    this.user.user()
    .subscribe(
      data => this.addName(data),
      error => this.router.navigate(['/login'])
    );
  }

  addName(data) {
    this.username = data.username;
    this.ids = data._id;
  }

  ngOnInit() {
  }

  logout() {
    this.user.logout()
    .subscribe(
      data => {console.log(data); this.router.navigate(['/login']).then(() => {
        window.location.reload();
      }); },
      error => console.error(error)
    );
  }

}

