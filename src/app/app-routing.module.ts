import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetSpecificProductComponent } from './products/get-specific-product/get-specific-product.component';
import { AllProductsComponent } from './products/displayAllProducts/all-products/all-products.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { CategoriesComponent } from './categories/categories/categories.component';
import { GetCartComponent } from './cart/get-cart/get-cart.component';
import { CheckoutPaymentComponent } from './cart/get-cart/checkout-payment/checkout-payment.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminAccess } from './admin.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

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

  },
  {
    path:'cart',
    component:GetCartComponent,
    canActivate:[AuthGuard]

  }
  ,{
    path:'pay',
    component:CheckoutPaymentComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'allorders',
    component:AllOrdersComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'admin',
    component:AdminPageComponent,
    canActivate:[AdminAccess]
  }
,
{
path:"AccessDenied",
component:UnauthorizedComponent
}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
