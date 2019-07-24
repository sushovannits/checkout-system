import { Result } from './utils';
export interface Product {
  name: string;
  price: number;
}

export interface ProductMap {
  [key: string] : Product;
}

export class Products {
  private products: ProductMap; // The product name will be the key of this map
  constructor() {
    this.products = {};
  }
  public getProducts() {
    return this.products;
  }
  public addProduct(product: Product): Result {
    // TODO: Call some validation API to validate that product can be added
    // TODO: Also support sending a list of products to this API
    this.products[product.name] = product;
    return 'success';
  }
  public deleteProduct(productName: string): Result {
    // TODO: Call some validation API to validate that product can be deleted
    // TODO: Also support sending a list of products to this API
    delete this.products[productName];
    return 'success';
  }
  public getProduct(productName: string): Product | undefined {
    return this.products[productName];
  }
}
