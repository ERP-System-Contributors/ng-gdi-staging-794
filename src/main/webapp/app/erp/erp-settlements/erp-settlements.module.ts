import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'settlement',
        data: { pageTitle: 'ERP-Payments | Settlements' },
        loadChildren: () => import('./settlement/settlement.module').then(m => m.SettlementModule),
      },
      {
        path: 'payment-category',
        data: { pageTitle: 'ERP-Payments | PaymentCategories' },
        loadChildren: () => import('./payments/payment-category/payment-category.module').then(m => m.ErpServicePaymentCategoryModule),
      },
      {
        path: 'settlement-currency',
        data: { pageTitle: 'ERP-Payments | SettlementCurrencies' },
        loadChildren: () => import('./settlement-currency/settlement-currency.module').then(m => m.SettlementCurrencyModule),
      },
      {
        path: 'purchase-order',
        data: { pageTitle: 'ERP-Payments | PurchaseOrders' },
        loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
      },
      {
        path: 'payment-invoice',
        data: { pageTitle: 'ERP-Payments | PaymentInvoices' },
        loadChildren: () => import('./payment-invoice/payment-invoice.module').then(m => m.PaymentInvoiceModule),
      },
    ]),
  ],
})
export class ErpSettlementsModule {}
