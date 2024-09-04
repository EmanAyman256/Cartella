import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBagShopping,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  bagShopping = faBagShopping;
  cart=faCartShopping
  isAuthenticated=false
  numOfItems:number=0
  constructor(private authService:AuthService,private router:Router,private CartItems:CartService){}
ngOnInit() {

  this.authService.user.subscribe(user=>{
    this.isAuthenticated=!!user
    if (this.isAuthenticated) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.CartItems.getCartofUser(token).subscribe(data => {
          this.CartItems.updateNumOfProd(data.numOfCartItems);
        });
      }
    }
    this.CartItems.currentNumOfProd.subscribe(item=>{
      this.numOfItems=item
     });
 
  });
}
onLogout()
{
  this.authService.LogOut()
  this.router.navigate(['/login'])
}
}
