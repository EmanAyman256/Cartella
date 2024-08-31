import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/apiresponse.model';
import { ProductDetails } from 'src/app/models/product.model';
import { ApidataService } from 'src/app/services/apidata.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit {
  constructor(private DataService:ApidataService){}
  isLoading=false;

   products!:ProductDetails[]
  ngOnInit(): void {
    this.isLoading=true
    this.DataService.fetchProducts().subscribe((response)=>{
      this.products=response.data
        console.log(this.products);
        this.isLoading=false
        
    });
  }
}
