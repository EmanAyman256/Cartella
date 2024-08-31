import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/apiresponse.model';
import { ProductDetails } from 'src/app/models/product.model';
import { ApidataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'app-get-specific-product',
  templateUrl: './get-specific-product.component.html',
  styleUrls: ['./get-specific-product.component.css']
})
export class GetSpecificProductComponent implements OnInit {
  specificProduct!:ProductDetails;
  prodId!:string
  constructor(private DataService:ApidataService,private router:Router,private route:ActivatedRoute){}
ngOnInit() {
this.prodId=this.route.snapshot.paramMap.get('prodId')!;
this.DataService.getSpecificProduct(this.prodId).subscribe((data)=>
{
  this.specificProduct=data.data
    console.log(data);
    this.router.navigate(['/product',this.prodId])
})
  
}


}
