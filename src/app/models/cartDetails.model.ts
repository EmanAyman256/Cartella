import { ProductDetails } from "./product.model"

export interface CartDetails{
    status: "success"|"fail",
    message: "",
    numOfCartItems: number,
    cartId: "",
    data: {
        _id: "",
        cartOwner: "",
        products: [
            {
                count: number,
                _id: "",
                product: "",
                price: number
            },
           
        ],
       
        totalCartPrice: number
    }
}
