import { Component, OnInit } from '@angular/core';
import { CartgetDetails } from 'src/app/models/getCart.model';
import { CartService } from 'src/app/services/cart.service';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-get-cart',
  templateUrl: './get-cart.component.html',
  styleUrls: ['./get-cart.component.css']

})
export class GetCartComponent implements OnInit {
  token=localStorage.getItem('userToken')!
  ownerId=new BehaviorSubject("")
  cartDetails!: CartgetDetails;
  numOfProd:number=0;
  plusIcon=faPlus;
  minusIcon=faMinus
  isLoading=false;
  constructor(private CartData:CartService){}
  ngOnInit() {
    this.isLoading=true
    this.CartData.getCartofUser(this.token).subscribe(data=>{
      this.ownerId.next(data.data.cartOwner)
      if(data.status=='success')
      {
        this.isLoading=false
        
      }
      this.cartDetails=data;

      console.log(this.cartDetails);
      this.numOfProd=this.cartDetails.numOfCartItems
      this.CartData.updateNumOfProd(this.numOfProd);  
    })
  }
  deleteItem(id:string)
  {
    Swal.fire({
      title: "Do You Confirm Removing Cart?",
      icon: "question",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true
    }).then((res)=>{
      if(res.isConfirmed)
      {
        this.CartData.deleteSpecificProduct(this.token,id).subscribe((data)=>{
          this.cartDetails=data
          this.numOfProd=this.cartDetails.numOfCartItems
          this.CartData.updateNumOfProd(this.numOfProd); 
    
       },(error) => {
    
        console.error('Error deleting product:', error);
      } )
          console.log(this.cartDetails);  
      }
    }) 
  }
  deleteCart()
  {
    Swal.fire({
      title: "Do You Confirm Removing Cart?",
      icon: "question",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true
    }).then(result=>{
      if(result.isConfirmed)
      {
        this.CartData.deleteUserCart(this.token).subscribe(data=>
          {
          this.cartDetails.data.products=[]
          this.cartDetails.numOfCartItems=0;
          this.cartDetails.data.totalCartPrice=0
          this.numOfProd = 0;
          this.CartData.updateNumOfProd(this.numOfProd); 
          
        },(error) => {
    
          console.error('Error deleting cart:', error);
        })
      
    }
  })
  }
  updateCartCount(id:string,count:number)
  {
      this.CartData.updateCart(this.token,count,id).subscribe((data)=>{
        this.cartDetails=data
        this.numOfProd = this.cartDetails.numOfCartItems;  
        this.CartData.updateNumOfProd(this.numOfProd);  
        if(count===0)
        {
          this.deleteItem(id)
        }
      },
      (error) => {

        console.error('Error updating cart:', error);
      }
      );
}
}
