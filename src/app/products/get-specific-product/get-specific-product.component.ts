import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/apiresponse.model';
import { CartDetails } from 'src/app/models/cartDetails.model';
import { ProductDetails } from 'src/app/models/product.model';
import { ApidataService } from 'src/app/services/apidata.service';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-get-specific-product',
  templateUrl: './get-specific-product.component.html',
  styleUrls: ['./get-specific-product.component.css']
})
export class GetSpecificProductComponent implements OnInit {
  specificProduct!:ProductDetails;
  prodId!:string
  cartData!:CartDetails
   token=localStorage.getItem('userToken')!
   numOfItems:number=0
  constructor(private DataService:ApidataService,private router:Router,private route:ActivatedRoute,
    private CartData:CartService){}
ngOnInit() {
this.prodId=this.route.snapshot.paramMap.get('prodId')!;
this.DataService.getSpecificProduct(this.prodId).subscribe((data)=>
{
  this.specificProduct=data.data
    console.log(data);
    this.router.navigate(['/product',this.prodId])
})

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
