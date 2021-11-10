import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';
import { IPaymentLabel } from '../../payment-label/payment-label.model';
import { IPaymentCategory } from '../payment-category/payment-category.model';

export interface IPayment {
  id?: number;
  paymentNumber?: string | null;
  paymentDate?: dayjs.Dayjs | null;
  invoicedAmount?: number | null;
  paymentAmount?: number | null;
  description?: string | null;
  settlementCurrency?: CurrencyTypes;
  dealerName?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory | null;
  placeholders?: IPlaceholder[] | null;
  paymentGroup?: IPayment | null;
}

export class Payment implements IPayment {
  constructor(
    public id?: number,
    public paymentNumber?: string | null,
    public paymentDate?: dayjs.Dayjs | null,
    public invoicedAmount?: number | null,
    public paymentAmount?: number | null,
    public description?: string | null,
    public settlementCurrency?: CurrencyTypes,
    public dealerName?: string | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public paymentCategory?: IPaymentCategory | null,
    public placeholders?: IPlaceholder[] | null,
    public paymentGroup?: IPayment | null
  ) {}
}

export function getPaymentIdentifier(payment: IPayment): number | undefined {
  return payment.id;
}
