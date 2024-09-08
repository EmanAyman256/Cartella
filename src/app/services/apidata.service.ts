import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetails } from '../models/product.model';
import { Observable, take } from 'rxjs';
import { ApiResponse, CategoriesResp, SpecificProductResp } from '../models/apiresponse.model';
import { AuthService } from './auth.service';
import { UserInfo } from '../models/UsersInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  constructor(private http:HttpClient,private Auth:AuthService) { }
  
  fetchProducts():Observable<ApiResponse>
  {
    this.Auth.user.pipe(take(1)).subscribe()
  return this.http.get<ApiResponse>('https://ecommerce.routemisr.com/api/v1/products')
  }
  getSpecificProduct(id:string):Observable<SpecificProductResp>
  {
    this.Auth.user.pipe(take(1)).subscribe()

      return this.http.get<SpecificProductResp>(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  fetchCategories():Observable<CategoriesResp>
  {
    return this.http.get<CategoriesResp>("https://ecommerce.routemisr.com/api/v1/categories")
  }
  getAllUsers():Observable<UserInfo>{
   return this.http.get<UserInfo>("https://ecommerce.routemisr.com/api/v1/users")
  }
}
