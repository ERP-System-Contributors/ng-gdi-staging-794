import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { ICreditCardOwnership } from 'app/entities/gdi/credit-card-ownership/credit-card-ownership.model';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';

export interface ICreditCardFacility {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  totalNumberOfActiveCreditCards?: number | null;
  totalCreditCardLimitsInCCY?: number | null;
  totalCreditCardLimitsInLCY?: number | null;
  totalCreditCardAmountUtilisedInCCY?: number | null;
  totalCreditCardAmountUtilisedInLcy?: number | null;
  totalNPACreditCardAmountInFCY?: number | null;
  totalNPACreditCardAmountInLCY?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  customerCategory?: Pick<ICreditCardOwnership, 'id' | 'creditCardOwnershipCategoryType'> | null;
  currencyCode?: Pick<IIsoCurrencyCode, 'id' | 'alphabeticCode'> | null;
}

export type NewCreditCardFacility = Omit<ICreditCardFacility, 'id'> & { id: null };
