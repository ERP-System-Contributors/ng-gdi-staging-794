import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const gdiDataRoutes: Routes =[
  {
    path: 'account-attribute',
    data: { pageTitle: 'AccountAttributes' },
    loadChildren: () => import('./account-attribute/account-attribute.module').then(m => m.AccountAttributeModule),
  },
  {
    path: 'account-attribute-metadata',
    data: { pageTitle: 'AccountAttributeMetadata' },
    loadChildren: () =>
      import('./account-attribute-metadata/account-attribute-metadata.module').then(m => m.AccountAttributeMetadataModule),
  },
  {
    path: 'exchange-rate',
    data: { pageTitle: 'ExchangeRates' },
    loadChildren: () => import('./exchange-rate/exchange-rate.module').then(m => m.ExchangeRateModule),
  },
  {
    path: 'particulars-of-outlet',
    data: { pageTitle: 'ParticularsOfOutlets' },
    loadChildren: () => import('./particulars-of-outlet/particulars-of-outlet.module').then(m => m.ParticularsOfOutletModule),
  },
  {
    path: 'weekly-counterfeit-holding',
    data: { pageTitle: 'WeeklyCounterfeitHoldings' },
    loadChildren: () =>
      import('./weekly-counterfeit-holding/weekly-counterfeit-holding.module').then(m => m.WeeklyCounterfeitHoldingModule),
  },
  {
    path: 'weekly-cash-holding',
    data: { pageTitle: 'WeeklyCashHoldings' },
    loadChildren: () => import('./weekly-cash-holding/weekly-cash-holding.module').then(m => m.WeeklyCashHoldingModule),
  },
  {
    path: 'county-sub-county-code',
    data: { pageTitle: 'CountySubCountyCodes' },
    loadChildren: () =>
      import('./county-sub-county-code/county-sub-county-code.module').then(m => m.CountySubCountyCodeModule),
  },
  {
    path: 'related-party-relationship',
    data: { pageTitle: 'RelatedPartyRelationships' },
    loadChildren: () =>
      import('./related-party-relationship/related-party-relationship.module').then(m => m.RelatedPartyRelationshipModule),
  },
  {
    path: 'terminals-and-pos',
    data: { pageTitle: 'TerminalsAndPOS' },
    loadChildren: () => import('./terminals-and-pos/terminals-and-pos.module').then(m => m.TerminalsAndPOSModule),
  },
  {
    path: 'performance-of-foreign-subsidiaries',
    data: { pageTitle: 'PerformanceOfForeignSubsidiaries' },
    loadChildren: () =>
      import('./performance-of-foreign-subsidiaries/performance-of-foreign-subsidiaries.module').then(
        m => m.PerformanceOfForeignSubsidiariesModule
      ),
  },
  {
    path: 'account-balance',
    data: { pageTitle: 'AccountBalances' },
    loadChildren: () => import('./account-balance/account-balance.module').then(m => m.AccountBalanceModule),
  },
  {
    path: 'agent-banking-activity',
    data: { pageTitle: 'AgentBankingActivities' },
    loadChildren: () =>
      import('./agent-banking-activity/agent-banking-activity.module').then(m => m.AgentBankingActivityModule),
  },
  {
    path: 'card-acquiring-transaction',
    data: { pageTitle: 'CardAcquiringTransactions' },
    loadChildren: () =>
      import('./card-acquiring-transaction/card-acquiring-transaction.module').then(m => m.CardAcquiringTransactionModule),
  },
  {
    path: 'card-issuer-charges',
    data: { pageTitle: 'CardIssuerCharges' },
    loadChildren: () => import('./card-issuer-charges/card-issuer-charges.module').then(m => m.CardIssuerChargesModule),
  },
  {
    path: 'card-fraud-information',
    data: { pageTitle: 'CardFraudInformations' },
    loadChildren: () =>
      import('./card-fraud-information/card-fraud-information.module').then(m => m.CardFraudInformationModule),
  },
  {
    path: 'card-usage-information',
    data: { pageTitle: 'CardUsageInformations' },
    loadChildren: () =>
      import('./card-usage-information/card-usage-information.module').then(m => m.CardUsageInformationModule),
  },
  {
    path: 'collateral-information',
    data: { pageTitle: 'CollateralInformations' },
    loadChildren: () =>
      import('./collateral-information/collateral-information.module').then(m => m.CollateralInformationModule),
  },
  {
    path: 'credit-card-facility',
    data: { pageTitle: 'CreditCardFacilities' },
    loadChildren: () => import('./credit-card-facility/credit-card-facility.module').then(m => m.CreditCardFacilityModule),
  },
  {
    path: 'card-state',
    data: { pageTitle: 'CardStates' },
    loadChildren: () => import('./card-state/card-state.module').then(m => m.CardStateModule),
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(gdiDataRoutes)]
})
export class GdiDataRoutingModule {
}
