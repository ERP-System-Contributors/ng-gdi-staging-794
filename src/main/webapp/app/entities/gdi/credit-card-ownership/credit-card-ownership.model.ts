import { CreditCardOwnershipTypes } from 'app/entities/enumerations/credit-card-ownership-types.model';

export interface ICreditCardOwnership {
  id: number;
  creditCardOwnershipCategoryCode?: string | null;
  creditCardOwnershipCategoryType?: CreditCardOwnershipTypes | null;
  description?: string | null;
}

export type NewCreditCardOwnership = Omit<ICreditCardOwnership, 'id'> & { id: null };
