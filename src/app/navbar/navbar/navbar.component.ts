import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBagShopping,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  bagShopping = faBagShopping;
  cart=faCartShopping
  isAuthenticated=false
  constructor(private authService:AuthService,private router:Router){}
ngOnInit(): void {
  this.authService.user.subscribe(user=>{
    this.isAuthenticated=!!user
    console.log(!!user);    
  })
}
onLogout()
{
  this.authService.LogOut()
  this.router.navigate(['/login'])
}
}
