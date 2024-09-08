import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBagShopping,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from 'src/app/models/Token.model';
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
  isAdmin=false

  constructor(private authService:AuthService,private router:Router,private CartItems:CartService){}
ngOnInit() {

  this.authService.user.subscribe(user=>{
    this.isAuthenticated=!!user
    
    this.isAdmin=false;
    const AdminAccess:CustomJwtPayload=jwtDecode(user?.userToken!)
    const AdminId=AdminAccess.id
    if (this.isAuthenticated) {
      const token = localStorage.getItem('userToken');
      if(AdminId==="66ddc1ef1edf433558a01258")
        {
          this.isAdmin=true
        }

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
