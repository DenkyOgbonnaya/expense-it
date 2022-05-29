import {PAY_STACK_DEV_KEY, PAY_STACK_PROD_KEY} from '@env';

// console.log(PAY_STACK_DEV_KEY, 'PAY_STACK_DEV_KEY');

export const PAYSTACK_KEY = __DEV__
  ? PAY_STACK_DEV_KEY
  : PAY_STACK_PROD_KEY;
