# Shopping RUs computer store

## Description
ShoppingRUs is starting a computer store. You have been engaged to build the checkout system. We will start with
the following products in our catalogue
| SKU | Name | Price |
|---------|----------------|-----------|
| ipd | Super iPad | $549.99 |
| mbp | MacBook Pro | $1399.99 |
| atv | Apple TV | $109.50 |
| vga | VGA adapter | $30.00 |
As we're launching our new computer store, we would like to have a few opening day specials.
* We're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will
pay the price of 2 only
* The brand new Super iPad will have a bulk discounted applied, where the price will drop to
$499.99 each, if someone buys more than 4
* We will bundle in a free VGA adapter free of charge with every MacBook Pro sold

```
NOTE: As our Sales manager is quite indecisive, we want the pricing rules to be as flexible as possible as they can change
in the future with little notice.
```

## Implementation Details
### Services:
* Product
* Offers
* Checkout
* Offer Resolution

### Considered Logic:
* A checkout service input looks as:
    ```
    {
        atv: 3,
        vga: 1
    }
    ```
    The `checkout` service queries the product service and creates a detailed map
    and passes it to `offer` service.
* The offer service handles addition of offers as well as application of the    offers as applicable. An offer looks like:
    ```
    {
        id: 'offerId',
        productTags: [ 'productA', 'productC' ],
        OfferFunction : function
    }
    ```
    The `productTags` is an optimization. Not all offers are tried. Only offers which are tagged for the products present in the `checkoutMap` are tried.
    Also the entire `checkoutMap` is sent to the `offerFunction` because there might be very complicated calculations involved.
    The offerService returns something like:
    ```
    {
        offerA : {
            totalPrice: X,
            extraOffer: {
                productFree: {
                    productName: 'productFree',
                    quantity: y,
                    price: Z
                }
            }
        }
    }
    ```
    So in the returned map keys are the names of the offers applied. Inside each value, the `totalPrice` is the new price after application of that offer. `extraOffer` is to handle cases when a offer is like: you can get productX for free (price will be 0) or you can buy productX for reduced price of Z because of offerA.
* Offer resolution service now blankly chooses the first offer. But herein we can
    implement business logic like choose the offer with least `totalPrice` or if `offerXYZ` has been applied choose that above everything else. Or may be, ask the customer which offer they want, etc.

### General

* Most of the places maps has been used instead of arrays for optimization.
* The `src/__tests__/integ.spec.ts` has the full test.
* The `src/offers/` contains the actual offer implementation.

## Usage
```
yarn install
yarn run clean
yarn run build
yarn run test
```
