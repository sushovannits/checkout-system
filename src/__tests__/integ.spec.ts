import 'expect';
import { Products } from '../product';
import { Checkout } from '../checkout';
import { Offers } from '../offer';
import * as atvOffer from '../offers-impl/atv-2-3';
import * as ipdOffer from '../offers-impl/ipd-4';
import * as freeVga from '../offers-impl/free-vga';

describe('main test', () => {
  it('test', () => {
    const productService = new Products();
    productService.addProduct({
      name: 'ipd',
      price: 549.99
    });
    productService.addProduct({
      name: 'mbp',
      price: 1399.99
    });
    productService.addProduct({
      name: 'atv',
      price: 109.50
    });
    productService.addProduct({
      name: 'vga',
      price: 30.00
    });

    const offerService = new Offers();
    offerService.addOffer({
      id: 'atv-3-2',
      productTags: atvOffer.tags,
      offerFunction: atvOffer.offerFunction
    });
    offerService.addOffer({
      id: 'ipd-4',
      productTags: ipdOffer.tags,
      offerFunction: ipdOffer.offerFunction
    });
    offerService.addOffer({
      id: 'freeVga',
      productTags: freeVga.tags,
      offerFunction: freeVga.offerFunction
    });
    const checkoutService = new Checkout(productService, offerService);
    expect(checkoutService.checkout({
      atv: 3,
      vga: 1
    })).toEqual({
      totalPrice: 249
    });
    expect(checkoutService.checkout({
      ipd: 5,
      atv: 2
    })).toEqual({
      totalPrice: 2718.95
    });
    expect(checkoutService.checkout({
      mbp: 1,
      vga: 1,
      ipd: 1
    })).toEqual({
      totalPrice: 1949.98
    });

    // Extra tests
    expect(checkoutService.checkout({
      atv: 2,
      vga: 1
    })).toEqual({
      totalPrice: 249,
      extraOffer: {
        atv: {
          productName: 'atv',
          quantity: 1,
          price: 0
        }
      }
    });
  });
});
