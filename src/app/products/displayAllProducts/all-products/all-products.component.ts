import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/apiresponse.model';
import { CartDetails } from 'src/app/models/cartDetails.model';
import { ProductDetails } from 'src/app/models/product.model';
import { ApidataService } from 'src/app/services/apidata.service';
import { CartService } from 'src/app/services/cart.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit {
  constructor(private DataService:ApidataService,private CartData:CartService,){}
  isLoading=false;
  prodId!:number
  cartData!:CartDetails
   token=localStorage.getItem('userToken')!
   numOfItems:number=0

   products!:ProductDetails[]
  ngOnInit(): void {
    this.isLoading=true
    this.DataService.fetchProducts().subscribe((response)=>{
      this.products=response.data
        console.log(this.products);
        this.isLoading=false
        
    });
  }
  onAddProductToCart(prodId:string)
  {
    const token=localStorage.getItem('userToken')!
    this.CartData.addProductToCart(prodId,this.token).subscribe((data)=>{
      Swal.fire({
        title: "Good job!",
        text: "You Added Product To Cart ",
        icon: "success"
      });
      this.cartData=data
        this.CartData.getCartofUser(token).subscribe(data => {
          this.CartData.updateNumOfProd(data.numOfCartItems);
          this.CartData.currentNumOfProd.subscribe(item=>{
            this.numOfItems=item
           
           });
        
        });
    })
   
  }
}
