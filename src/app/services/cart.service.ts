import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import {  CartDetails } from '../models/cartDetails.model';
import { CartgetDetails, CartItem } from '../models/getCart.model';
import { CheckPayment } from '../models/checkPayment.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private numOfProdSource = new BehaviorSubject<number>(0);
  currentNumOfProd = this.numOfProdSource.asObservable();

  updateNumOfProd(num: number) {
    this.numOfProdSource.next(num);
  }
  constructor(private http:HttpClient) { }
  addProductToCart(prodId:string,token:string):Observable<CartDetails>{
   
    return this.http.post<CartDetails>("https://ecommerce.routemisr.com/api/v1/cart",{
      productId:prodId
    },{headers:{token:token}} ).pipe(take(1))
  }

  getCartofUser(token:string):Observable<CartgetDetails>{
    return this.http.get<CartgetDetails>("https://ecommerce.routemisr.com/api/v1/cart",
      {headers:{token:token}})
  }
  deleteSpecificProduct(token:string,id:string):Observable<CartgetDetails>
  {
      return this.http.delete<CartgetDetails>(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
        ,{headers:{token:token}})
  }
  deleteUserCart(token:string):Observable<string>
  {
      return this.http.delete<string>("https://ecommerce.routemisr.com/api/v1/cart",{headers:{token:token}})
  }
  updateCart(token:string,count:number,id:string):Observable<CartgetDetails>
  {
    return this.http.put<CartgetDetails>(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
      ,{count:count},{headers:{token:token}})
  }
  checkPayment(token:string,cartId:string,shippingAddress:{details:string,phone:string,city:string}):Observable<CheckPayment>
  {
    return this.http.post<CheckPayment>(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`
      ,shippingAddress,{headers:{token:token}})
  }
  getUserOrder(ownerid:string):Observable<Order[]>

  {
    return this.http.get<Order[]>(`https://ecommerce.routemisr.com/api/v1/orders/user/${ownerid}`)
  }
}
