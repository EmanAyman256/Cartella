export interface Product {
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    id: string;
  }
  
  export interface CartItem {
    count: number;
    _id: string;
    product: Product;
    price: number;
  }
  
  export interface CartgetDetails {
    status: 'success'|'fail';
    numOfCartItems: number;
    cartId: string;
    data: {
      _id: string;
      cartOwner: string;
      products: CartItem[];
      createdAt: string;
      updatedAt: string;
      __v: number;
      totalCartPrice: number;
    };
  }
  