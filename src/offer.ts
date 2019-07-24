import { Result } from './utils';
import { CheckoutItemDetailedMap } from './checkout';

export interface Offer {
  id : string;
  productTags : string[];
  offerFunction(checkout: CheckoutItemDetailedMap) : PerOfferResult;
}

export interface PerOfferResult extends FinalOffer {
  id : string;
}

export interface ProductOffer {
  productName: string;
  quantity: number;
  price: number;
}

export interface ProductOfferMap {
  [key: string] : ProductOffer;
}

export interface FinalOffer {
  totalPrice: number;
  extraOffer?: ProductOfferMap;
}

export interface FinalOfferMap {
  [key: string]: PerOfferResult;
}

export interface OfferMap {
  [key: string] : Offer;
}

export interface OfferByProduct {
  [key: string] : string[];
}

export class Offers {
  private offers: OfferMap;
  private offerByProduct: OfferByProduct;
  constructor() {
    this.offers = {};
    this.offerByProduct = {};
  }
  public getOffers(): OfferMap {
    return this.offers;
  }
  public getOfferByProduct(): OfferByProduct {
    return this.offerByProduct;
  }
  public addOffer(offer: Offer): Result {
    this.offers[offer.id] = offer;
    offer.productTags.forEach((productName) => {
      if (this.offerByProduct[productName] === undefined) {
        this.offerByProduct[productName] = [];
      }
      this.offerByProduct[productName].push(offer.id);
    });
    return 'success';
  }
  public applyOffers(checkout: CheckoutItemDetailedMap): FinalOfferMap {
    // checkout : { macbook : 5 }
    const finalOfferMap: FinalOfferMap = {};
    Object.keys(checkout).forEach((productName) => {
      if (this.offerByProduct[productName]) {
        const offersToBeApplied = this.offerByProduct[productName];
        offersToBeApplied.forEach((offerId) => {
          if (!this.offers[offerId] || finalOfferMap[offerId] !== undefined) {
            return;
          }
          finalOfferMap[offerId] = this.offers[offerId].offerFunction(checkout);
        });
      }
    });
    return finalOfferMap;
  }
}
