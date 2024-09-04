import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { CartService } from '../services/cart.service';
import { switchMap } from 'rxjs';
import { CartItem } from '../models/getCart.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
orders!: Order[]
failed=false

token=localStorage.getItem('userToken')!
ownerId=""
constructor(private AllOrders:CartService){}
isLoading=false

ngOnInit() {
  if (!this.token) {
    console.error('No user token found');
    return;
  }
  this.isLoading = true;

  this.AllOrders.getCartofUser(this.token).pipe(
    switchMap(data => {
      this.ownerId = data.data.cartOwner;
      if(data.status==='fail'||!this.ownerId)
      {
        this.failed=true
      }
      console.log(this.ownerId);
      return this.AllOrders.getUserOrder(this.ownerId); // Make sure this returns an observable of Order[]
    })
  ).subscribe({
    next: (orders: Order[]) => {
      this.orders = orders;
      console.log('Orders:', this.orders);
      this.isLoading = false;
    
    },
    error: (err) => {
      console.error('Error fetching orders:', err);
      this.isLoading = false;
    }
  });
}
}
