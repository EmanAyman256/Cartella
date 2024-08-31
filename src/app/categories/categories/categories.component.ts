import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/product.model';
import { ApidataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  category!:Categories[]
  isLoading=false;

  constructor(private DataService:ApidataService){}
ngOnInit() {
  this.isLoading=true

  this.DataService.fetchCategories().subscribe(data=>{
    this.category=data.data
    this.isLoading=false


  })

  
}


}
