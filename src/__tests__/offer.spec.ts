import 'expect';
import * as offerModule from '../offer';
import { CheckoutItemDetailedMap } from '../checkout';


describe('crud on offers', () => {

  it('should add an offer', () => {
    const offerService = new offerModule.Offers();
    const newOffer = {
      id : 'christmas-offer-1',
      productTags: ['lights', 'tree', 'treats'],
      offerFunction: (checkout: CheckoutItemDetailedMap) => {
        return {
          id : 'christman-offer-1',
          totalPrice: 10
        };
      }
    };
    const res = offerService.addOffer(newOffer);
    expect(res).toBe('success');
    const allOffers = offerService.getOffers();
    expect(allOffers).toHaveProperty('christmas-offer-1', newOffer);
  });

});

describe('offer application on a checkout', () => {

  it('should apply an offer', () => {
    const offerService = new offerModule.Offers();
    const newOffer1 = {
      id : 'christmas-offer-1',
      productTags: ['lights', 'tree', 'treats'],
      offerFunction: (checkout: CheckoutItemDetailedMap) => {
        // Not caring what is in checkout and returning a static yhing for first test
        return {
          id : 'christman-offer-1',
          totalPrice: 10
        };
      }
    };
    const newOffer2 = {
      id : 'christmas-offer-2',
      productTags: ['lights', 'tree', 'treats'],
      offerFunction: (checkout: CheckoutItemDetailedMap) => {
        // Not caring what is in checkout and returning a static yhing for first test
        return {
          id : 'christman-offer-2',
          totalPrice: 20
        };
      }
    };

    offerService.addOffer(newOffer1);
    offerService.addOffer(newOffer2);
    expect(Object.keys(offerService.getOfferByProduct())).toHaveLength(3);
    const checkout = {
      lights : {
        productName: 'light',
        price: 2,
        quantity: 4
      }
    };
    const finalRes = offerService.applyOffers(checkout);
    expect(finalRes).toEqual({
      'christmas-offer-1' : {
        id : 'christman-offer-1',
        totalPrice: 10
      },
      'christmas-offer-2' : {
        id : 'christman-offer-2',
        totalPrice: 20
      },

    });
  });

  it('should not apply an offer to a product when not tagged', () => {
    const offerService = new offerModule.Offers();
    const newOffer1 = {
      id : 'christmas-offer-1',
      productTags: ['treats'],
      offerFunction: (checkout: CheckoutItemDetailedMap) => {
        // Not caring what is in checkout and returning a static yhing for first test
        return {
          id : 'christman-offer-1',
          totalPrice: 10
        };
      }
    };

    offerService.addOffer(newOffer1);
    const checkout = {
      lights : {
        productName: 'light',
        price: 2,
        quantity: 4
      }
    };
    const finalRes = offerService.applyOffers(checkout);
    expect(finalRes).toEqual({});
  });
});
