import {IDealer} from '../../erp-pages/dealers/dealer/dealer.model';
import {Action, createReducer, on} from '@ngrx/store';
import {initialState, State} from '../global-store.definition';
import {
  payDealerButtonClicked, paymentDealerCategoryAcquired,
  paymentToDealerCompleted,
  paymentToDealerInitiated
} from '../actions/dealer-workflows-status.actions';
import {IPayment} from "../../erp-pages/payments/payment/payment.model";
import {IPaymentCategory} from "../../erp-pages/payments/payment-category/payment-category.model";

export const paymentToDealerWorkflowStateSelector = 'paymentToDealerWorkflows'

export interface DealerWorkflowState {
  selectedDealer: IDealer,
  dealerPayment: IPayment,
  paymentDealerCategory: IPaymentCategory | null,
  weArePayingADealer: boolean
}

const _dealerWorkflowStateReducer= createReducer(
  initialState,

  on(payDealerButtonClicked, (state, {selectedDealer}) => ({
     ...state,
    dealerWorkflowState: {
       ...state.dealerWorkflowState,
      selectedDealer,
      weArePayingADealer: true
    }
   })),

  on(paymentToDealerInitiated, (state, {dealerPayment}) => ({
     ...state,
    dealerWorkflowState: {
       ...state.dealerWorkflowState,
      dealerPayment,
      weArePayingADealer: true
    }
   })),

  on(paymentToDealerCompleted, (state) => ({
    ...state,
    dealerWorkflowState: {
      ...state.dealerWorkflowState,
      selectedDealer: {},
      weArePayingADealer: false
    }
  })),

  on(paymentDealerCategoryAcquired, (state, {paymentDealerCategory}) => ({
    ...state,
    dealerWorkflowState: {
      ...state.dealerWorkflowState,
      selectedDealer: {},
      paymentDealerCategory,
      weArePayingADealer: false
    }
  })),
);

export function dealerWorkflowStateReducer(state: State = initialState, action: Action): State {

  return _dealerWorkflowStateReducer(state, action);
}

