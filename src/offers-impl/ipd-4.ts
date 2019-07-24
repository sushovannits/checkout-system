import { CheckoutItemDetailedMap, CheckoutItemDetailed } from '../checkout';
import { PerOfferResult } from '../offer';

export const tags = ['ipd'];
export function offerFunction(checkout: CheckoutItemDetailedMap): PerOfferResult {
  const totalPrice: number = Object['values'](checkout)
  .reduce((tp: number, item: CheckoutItemDetailed) => {
    return tp + (item.price * item.quantity);
  },      0);
  const finalRes: PerOfferResult = {
    id: 'ipad-4',
    totalPrice
  };
  if (checkout.ipd.quantity >= 4) {
    finalRes.totalPrice = finalRes.totalPrice - (checkout.ipd.quantity * 50);
  }
  return finalRes;
}
