import 'expect';
import * as checkoutModule from '../checkout';
import { Offers } from '../offer';
import { Products } from '../product';
import { resolveOffer } from '../offer-selection';

jest.mock('../offer');
jest.mock('../product');
jest.mock('../offer-selection');


describe('test checkout', () => {
  it('should checkout a list of items', () => {
    const productService = new Products();
    productService.getProduct = jest.fn().mockReturnValue({
      name: 'lights',
      price: 10
    });
    const checkoutService = new checkoutModule.Checkout(new Products(), new Offers());
    checkoutService.checkout({
      lights : 2
    });
    expect(Offers.prototype.applyOffers).toHaveBeenCalled();
    expect(Products.prototype.getProduct).toHaveBeenCalled();
    expect(resolveOffer).toHaveBeenCalled();
  });
});
