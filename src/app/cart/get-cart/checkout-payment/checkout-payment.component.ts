import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckPayment } from 'src/app/models/checkPayment.model';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent {
  token = localStorage.getItem("userToken")!;
  cartPaymentCheck!: CheckPayment;
  payForm = new FormGroup({
    details: new FormControl("", { validators: [Validators.required] }),
    phone: new FormControl("", { validators: [Validators.required] }),
    city: new FormControl("", { validators: [Validators.required] }),
  });

  constructor(private CartPay: CartService,private router:Router) {}

  cartPayment() {
    const details=this.payForm.value.details!;
    const phone=this.payForm.value.phone!;
    const city=this.payForm.value.city!;
    this.CartPay.getCartofUser(this.token).pipe(
      switchMap(data => {
        const cartId = data.data._id;
        return this.CartPay.checkPayment(this.token, cartId, { details, phone, city });
      })
    ).subscribe(
      data => {
        this.cartPaymentCheck = data;
        if (data.status === 'success') {
          Swal.fire({
            title: 'Redirecting to Payment...',
            text: 'Please complete the payment process.',
            icon: 'info',
            showConfirmButton: false,
            timer: 2000
          });
          window.location.href = data.session.url; 
        } else {
          Swal.fire('Error', 'Payment failed. Please try again.', 'error');
        }
        this.router.navigate(["/cart"])

      },
      error => {
        Swal.fire('Error', 'An error occurred during checkout.', 'error');
        console.error('Checkout error:', error);
      }
      

    );
  }
}
