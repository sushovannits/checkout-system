import {  FinalOffer, Offers, ProductOffer } from './offer';
import { resolveOffer } from './offer-selection';
import { Products } from './product';

export interface CheckoutItemMap {
  [key: string]: number;
}

export type CheckoutItemDetailed = ProductOffer;

export interface CheckoutItemDetailedMap {
  /**
   * {
   *  lights: {
   *    productName: 'lights',
   *    quantity: 2,
   *    price: 10 //each
   *  }
   * }
   */
  [key : string] : CheckoutItemDetailed; // key is productName
}

export class Checkout {
  private offerService: Offers;
  private productService: Products;
  public constructor(productService: Products, offerService: Offers) {
    this.offerService = offerService;
    this.productService = productService;
  }
  public checkout(checkoutMap: CheckoutItemMap): FinalOffer {
    // Query the products service and construct the detailed bill
    const checkoutDetailedMap = Object.keys(checkoutMap)
    .reduce((finalMap: CheckoutItemDetailedMap, item: string): CheckoutItemDetailedMap => {
      const product = this.productService.getProduct(item);
      if (product) {
        const checkoutItemDetailed: CheckoutItemDetailed = {
          productName: item,
          price: product.price,
          quantity: checkoutMap[item]
        };
        finalMap[item] = checkoutItemDetailed;
      }
      return finalMap;
    },      {});
    /**
     * applyOffers will return something like:
     *   {
     *     offerId : {
     *       id: 'offerId',
     *       totalPrice: 100,
     *       extraOffer: {
     *         productX : {
     *           productName: 'productX',
     *           quantity: 2,
     *           price: 0
     *         }
     *       }
     *     }
     *   };
     *   Offer resolution will turn it into:
     *   {
     *    totalPrice: 100,
     *    extraOffer: {
     *       productX: {
     *         productName: 'productX',
     *         quantity: 2,
     *         price: 0
     *       }
     *     }
     *   }
     */
    const res = this.offerService.applyOffers(checkoutDetailedMap);
    return resolveOffer(res);
  }
}
