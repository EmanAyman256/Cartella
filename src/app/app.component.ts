import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router:Router,private authServ:AuthService){}
  ngOnInit() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.authServ.user.next(new User(token))
    } else {
      localStorage.removeItem("userToken")
      this.router.navigate(['/login']);
    }
  }
}
