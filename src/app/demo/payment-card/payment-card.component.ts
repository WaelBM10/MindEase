import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent implements AfterViewInit {
  @ViewChild('paymentRef', { static: false }) paymentRef!: ElementRef;

  // Static values
  transportFees: number = 50; // Static transport fee
  consultationTime: number = 45; // Static consultation time in minutes
  serviceFees: number = 100; // Static service fee per hour
  guaranteeAmount: number = 20; // Static guarantee amount

  totalAmount!: number;
  consultationFee!: number;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.loadPayPalScript();
    this.calculateConsultationFee();
  }

  /**
   * Dynamically loads the PayPal SDK script.
   */
  loadPayPalScript(): void {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AQAzRUFt9FdQhr8jufI8u2D5AMJ_JeAD7-YYL_P4-uzU99doVqutp4cbbkn15nWFcz7_Z3alOgDtQpA7';
    script.async = true;
    script.onload = () => {
      this.renderPayPalButton();
    };
    document.body.appendChild(script);
  }

  /**
   * Renders the PayPal button after the script is loaded.
   */
  renderPayPalButton(): void {
    if ('paypal' in window) {
      // @ts-ignore
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalAmount.toFixed(2), // Payment amount
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Payment Successful! Transaction completed by ' + details.payer.name.given_name);
            this.redirectAfterPayment();
          });
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          alert('Payment could not be processed. Please try again.');
        },
      }).render(this.paymentRef.nativeElement);
    } else {
      console.error('PayPal SDK not loaded');
    }
  }

  /**
   * Redirects the user to another page after a successful payment.
   */
  redirectAfterPayment(): void {
    this.router.navigate(['/payment-success']);
  }

  /**
   * Calculates consultation fee based on time and service rate.
   */
  calculateConsultationFee(): void {
    const consultationTimeInHours = this.consultationTime / 60;
    this.consultationFee = consultationTimeInHours * this.serviceFees;
    this.calculateTotalAmount();
  }

  /**
   * Calculates the total amount for the payment.
   */
  calculateTotalAmount(): void {
    this.totalAmount = this.transportFees + this.consultationFee - this.guaranteeAmount;
  }
}
