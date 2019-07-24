import { FinalOfferMap, FinalOffer } from './offer';

export function resolveOffer(offerMap: FinalOfferMap): FinalOffer {
  // Right now just selecting first offer now
  // But can implement business logic here to select among the offers
  const selectedOffer = Object.values(offerMap)[0];
  const resolvedOffer: FinalOffer = {
    totalPrice: selectedOffer.totalPrice
  };
  if (selectedOffer.extraOffer) {
    resolvedOffer.extraOffer = selectedOffer.extraOffer;
  }
  return resolvedOffer;
}
