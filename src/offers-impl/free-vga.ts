import { CheckoutItemDetailedMap, CheckoutItemDetailed } from '../checkout';
import { PerOfferResult } from '../offer';

export const tags: string[] = ['mbp'];

export function offerFunction(checkout: CheckoutItemDetailedMap): PerOfferResult {
  const totalPrice: number = Object['values'](checkout)
  .reduce((tp: number, item: CheckoutItemDetailed) => {
    return tp + (item.price * item.quantity);
  },      0);
  const finalRes: PerOfferResult = {
    id: 'free-vga',
    totalPrice
  };
  if (checkout.mbp.quantity >= 1) {
    const numVgaPriceToReduce = Math.max(checkout.vga.quantity, checkout.mbp.quantity) * checkout.vga.price;
    const numExtraVga = checkout.mbp.quantity - checkout.vga.quantity;
    finalRes.totalPrice = finalRes.totalPrice - numVgaPriceToReduce;
    if (numExtraVga > 0) {
      finalRes.extraOffer = {
        vga: {
          productName: 'vga',
          quantity: numExtraVga,
          price: 0
        }
      };
    }
  }
  return finalRes;
}
