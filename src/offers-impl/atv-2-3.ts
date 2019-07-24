import { CheckoutItemDetailedMap, CheckoutItemDetailed } from '../checkout';
import { PerOfferResult } from '../offer';

export const tags = ['atv'];

export function offerFunction(checkout: CheckoutItemDetailedMap): PerOfferResult {
  const totalPrice: number = Object['values'](checkout)
  .reduce((tp: number, item: CheckoutItemDetailed) => {
    return tp + (item.price * item.quantity);
  },      0);
  const finalRes: PerOfferResult = {
    id: 'atv-3-2',
    totalPrice
  };
  const eligibleFreeAtvs = Math.floor(checkout.atv.quantity / 3);
  const eligibleExtraAtvs = (checkout.atv.quantity % 3) - 1;
  if (checkout.atv) {
    if (eligibleFreeAtvs >= 1) {
      const priceOfAtv = checkout.atv.price;
      finalRes.totalPrice = finalRes.totalPrice - (priceOfAtv * eligibleFreeAtvs);
    }
    if (eligibleExtraAtvs >= 1) {
      finalRes.extraOffer = {
        atv: {
          productName: 'atv',
          quantity: eligibleExtraAtvs,
          price: 0
        }
      };
    }
  }
  return finalRes;
}
