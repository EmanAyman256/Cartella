export interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: {
    product: {
      imageCover: string;
      title: string;
    };
    price: number;
    count: number;
  }[];
}
