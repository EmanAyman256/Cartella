import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './products/displayAllProducts/all-products/all-products.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup.component';
import{HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GetSpecificProductComponent } from './products/get-specific-product/get-specific-product.component'
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories/categories.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ErrorInterceptor } from './error.interceptors';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PopupComponent } from './shared/popup/popup.component';
import { GetCartComponent } from './cart/get-cart/get-cart.component';
import { CheckoutPaymentComponent } from './cart/get-cart/checkout-payment/checkout-payment.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    GetSpecificProductComponent,
    CategoriesComponent,
    LoaderComponent,
    PopupComponent,
    GetCartComponent,
    CheckoutPaymentComponent,
    AllOrdersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
