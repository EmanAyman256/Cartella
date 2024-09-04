import { Categories, ProductDetails } from "./product.model";

export interface ApiResponse {
    results: number;
    metadata: {
      currentPage: number;
      numberOfPages: number;
      limit: number;
      nextPage: number;
    };
    data: ProductDetails[];
  }
  export interface SpecificProductResp{
    data:ProductDetails
  }
  export interface CategoriesResp{
    status:'success'|'fail'

    results: number;
    metadata: {
      currentPage: number;
      numberOfPages: number;
      limit: number;
      nextPage: number;
    };
    data: Categories[];

  }
  