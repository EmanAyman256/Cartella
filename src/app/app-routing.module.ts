import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetSpecificProductComponent } from './products/get-specific-product/get-specific-product.component';
import { AllProductsComponent } from './products/displayAllProducts/all-products/all-products.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { CategoriesComponent } from './categories/categories/categories.component';

const routes: Routes = [
  {
    path:'product/:prodId',
    component:GetSpecificProductComponent,
    canActivate:[AuthGuard]

  },

  {
    path:'',
    component:SignupComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'signup',
    component:SignupComponent,

  },
  {
    path:'products',
    component:AllProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'categories',
    component:CategoriesComponent,
    canActivate:[AuthGuard]

  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
