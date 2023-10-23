import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { ICardCategoryType } from 'app/entities/gdi/card-category-type/card-category-type.model';
import { ICardTypes } from 'app/entities/gdi/card-types/card-types.model';
import { ICardBrandType } from 'app/entities/gdi/card-brand-type/card-brand-type.model';
import { ICardClassType } from 'app/entities/gdi/card-class-type/card-class-type.model';
import { ICardCharges } from 'app/entities/gdi/card-charges/card-charges.model';

export interface ICardIssuerCharges {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  cardFeeChargeInLCY?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  cardCategory?: Pick<ICardCategoryType, 'id' | 'cardCategoryDescription'> | null;
  cardType?: Pick<ICardTypes, 'id' | 'cardType'> | null;
  cardBrand?: Pick<ICardBrandType, 'id' | 'cardBrandType'> | null;
  cardClass?: Pick<ICardClassType, 'id' | 'cardClassType'> | null;
  cardChargeType?: Pick<ICardCharges, 'id' | 'cardChargeTypeName'> | null;
}

export type NewCardIssuerCharges = Omit<ICardIssuerCharges, 'id'> & { id: null };
